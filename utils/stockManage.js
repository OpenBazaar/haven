import * as _ from 'lodash';
import BigNumber from 'bignumber.js';

export const parseShippingService = (shippingOption, index) => {
  if (_.isEmpty(shippingOption.services)) {
    return {
      name: shippingOption.name,
      service: '',
      label: shippingOption.name,
    };
  } else {
    const service = shippingOption.services[index];
    return {
      name: shippingOption.name,
      service: service.name,
      estimatedDelivery: service.estimatedDelivery,
      price: service.price,
      additionalItemPrice: service.additionalItemPrice,
      bigPrice: service.bigPrice,
      bigAdditionalItemPrice: service.bigAdditionalItemPrice,
    };
  }
};

export const parseShippingOption = shippingOption => (
  shippingOption.services.map((service, index) => parseShippingService(shippingOption, index))
);

export const parseShippingOptions = (shippingOptions) => {
  const options = shippingOptions.map(val => parseShippingOption(val));
  return [].concat.apply([], options);
};

export const getListingActualPrice = (props, donotConvertCurrency = false) => {
  const { variantInfo, listing, convertCurrency } = props;
  const { bigPrice: listingPrice, priceCurrency = {} } = listing.listing.item;
  const { code: currency } = priceCurrency;
  let actualPrice = BigNumber(listingPrice);
  const bigSurcharge = _.get(variantInfo, 'bigSurcharge', '0');

  if (bigSurcharge) {
    actualPrice = actualPrice.plus(bigSurcharge);
  }

  if (donotConvertCurrency) {
    return BigNumber(actualPrice);
  }

  return convertCurrency(actualPrice, currency);
};

export function initShippingOptionWithMinShippingPrice() {
  const { setShippingOption, clearShippingOption } = this.props;

  const { shippingOptions } = this.state;

  if (!shippingOptions) {
    clearShippingOption();
    return;
  }

  const parsedShippingOptions = parseShippingOptions(shippingOptions);

  if (parsedShippingOptions.length === 0 || parsedShippingOptions[0].price == null) {
    clearShippingOption();
    return;
  }

  const minShippingPrice = Math.min(...parsedShippingOptions.map(op => op.price));
  const minPriceShipping = parsedShippingOptions.find(op => op.price === minShippingPrice);
  setShippingOption(minPriceShipping);
}
