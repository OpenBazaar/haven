import { filter, isEmpty, hasIn, get } from 'lodash';
import uuidv4 from 'uuid/v4';

import { getPriceInMinimumUnit, getDecimalPoints, isCrypto, getBigCurrencyInfo } from './currency';
import { getNumericPart } from './string';
import localCurrencies from '../config/localCurrencies.json';

export const parseSearchFilter = (searchFilter) => {
  const {
    shipping, acceptedCurrencies, rating, nsfw, type, conditions, sortBy,
  } = searchFilter;
  return {
    a0_shipping: shipping,
    acceptedCurrencies,
    b1_rating: rating,
    nsfw,
    type,
    z0_condition: conditions,
    sortBy,
  };
};

export const parseCoupon = (value) => {
  if (!value) {
    return value;
  }

  const newVal = { ...value };
  if (value.percentDiscount) {
    const numericPart = getNumericPart(value.percentDiscount);
    newVal.percentDiscount = parseFloat(numericPart);
  } else if (value.priceDiscount) {
    const numericPart = getNumericPart(value.priceDiscount);
    newVal.priceDiscount = parseFloat(numericPart);
  } else if (value.bigPriceDiscount) {
    const numericPart = getNumericPart(value.bigPriceDiscount);
    newVal.priceDiscount = parseFloat(numericPart);
  }
  return newVal;
};

export const bundleCoupon = (value) => {
  const newVal = { ...value };
  if (hasIn(value, 'priceDiscount')) {
    newVal.bigPriceDiscount = value.priceDiscount.toString();
    delete newVal.priceDiscount;
  }
  return newVal;
};

export const restructureListingInfo = (
  listingInfo,
  acceptedCurrencies,
  moderators = [],
  isCreating = true,
) => {
  const slug = isCreating ? uuidv4() : listingInfo.slug;
  const { type = {}, currency, shippingOptions, termsAndConditions, refundPolicy } = listingInfo || {};
  const contractType = (type.value || type).toUpperCase();
  const metadata = {
    contractType,
    format: 'FIXED_PRICE',
    expiry: '2037-12-31T05:00:00.000Z',
    escrowTimeoutHours: 1080,
    acceptedCurrencies,
  };
  const options = listingInfo.options.map((val) => {
    const { name, description, variants } = val;
    const parsedVariants = variants.map(val => ({ name: val }));
    return {
      name,
      description,
      variants: parsedVariants,
    };
  });
  const images = filter(listingInfo.images, o => !isEmpty(o)).map(val => ({
    filename: val.filename,
    ...val.hashes,
  }));
  const item = {
    priceCurrency: getBigCurrencyInfo(currency, true),
    title: listingInfo.title,
    description: listingInfo.description,
    bigPrice: getPriceInMinimumUnit(listingInfo.price, currency).toString(),
    tags: listingInfo.tags,
    images,
    categories: listingInfo.categories,
    options,
    condition: hasIn(listingInfo.condition, 'label')
      ? listingInfo.condition.label
      : listingInfo.condition,
    skus: listingInfo.inventory.map(({ quantity, surcharge, ...val }) => ({
      ...val,
      bigSurcharge: getPriceInMinimumUnit(surcharge, currency),
      bigQuantity: quantity.toString(),
    })),
    nsfw: listingInfo.nsfw,
  };
  const reShippingOptions = shippingOptions.map((val) => {
    const {
      name, type, regions, services,
    } = val;
    const newRegions = regions.map((region) => {
      if (hasIn(region, 'value')) {
        if (region.value === 'any') {
          return 'ALL';
        }
        return region.value.toUpperCase();
      }
      return region.toUpperCase();
    });
    return {
      name,
      type,
      regions: newRegions,
      services: services.map((val) => {
        const { price, additionalItemPrice, ...restVal } = val;
        return {
          ...restVal,
          bigPrice: getPriceInMinimumUnit(price, currency).toString(),
          bigAdditionalItemPrice: getPriceInMinimumUnit(additionalItemPrice, currency).toString(),
        };
      }),
    };
  });
  const taxes = [];
  const { coupons = [] } = listingInfo;

  return {
    slug: isCreating ? '' : slug,
    metadata,
    item,
    shippingOptions: contractType === 'PHYSICAL_GOOD' ? reShippingOptions : undefined,
    termsAndConditions,
    refundPolicy,
    taxes,
    coupons: coupons.map(bundleCoupon),
    moderators,
  };
};
