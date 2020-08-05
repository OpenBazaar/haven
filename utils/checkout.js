import React from 'react';
import { isEmpty } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import { brandColor, warningColor } from '../components/commonColors';

export const generateCheckoutObject = (
  productType,
  shippingAddress,
  listingHash,
  quantity,
  options,
  shippingOption,
  moderator,
  paymentCoin,
  checkoutNote,
  coupon = null,
) => {
  const item = {
    listingHash,
    bigQuantity: quantity.toString(),
    options,
    memo: checkoutNote,
  };

  const coupons = isEmpty(coupon) ? undefined : [coupon.couponCode];

  if (productType === 'PHYSICAL_GOOD') {
    const {
      city, state, country, postalCode, addressNotes, name,
    } = shippingAddress;
    const address = {
      address: `${shippingAddress.addressLineOne} ${shippingAddress.addressLineTwo}`,
      city,
      state,
      shipTo: name,
      countryCode: country,
      postalCode,
      addressNotes,
    };

    const { name: shippingOptionName, service } = shippingOption;

    return {
      ...address,
      items: [
        {
          ...item,
          ...(isEmpty(shippingOption) ? {} : {
            shipping: { name: shippingOptionName, service },
          }),
        },
      ],
      moderator: moderator || '',
      paymentCoin,
    };
  }
  return {
    items: [
      {
        ...item,
        coupons,
      },
    ],
    moderator: moderator || '',
    paymentCoin,
  };
};

export const parseVariantInfo = (variantInfo, options) => {
  if (isEmpty(variantInfo)) {
    return [];
  }
  const { variantCombo } = variantInfo;
  if (isEmpty(variantCombo)) {
    return [];
  }
  const retVal = variantCombo.map((val, idx) => ({
    name: options[idx].name,
    value: options[idx].variants[val].name,
  }));
  return retVal;
};

export const EditIcon = <Ionicons name="md-create" size={22} color={brandColor} />;
export const AlertIcon = <Feather name="alert-circle" size={22} color={warningColor} />;
export const InfoIcon = <Feather name="info" size={22} color={brandColor} />;
