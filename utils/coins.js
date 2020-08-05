import * as _ from 'lodash';

const BchIcon = require('../assets/icons/crypto/BCH.png');
const BtcIcon = require('../assets/icons/crypto/BTC.png');
const LtcIcon = require('../assets/icons/crypto/LTC.png');
const ZecIcon = require('../assets/icons/crypto/ZEC.png');
const EthIcon = require('../assets/icons/crypto/ETH.png');

export const COINS = {
  BTC: {
    label: 'Bitcoin',
    qrLabel: 'bitcoin',
    icon: BtcIcon,
    disabled: false,
  },
  BCH: {
    label: 'Bitcoin Cash',
    qrLabel: 'bitcoincash',
    icon: BchIcon,
    disabled: false,
  },
  LTC: {
    label: 'Litecoin',
    qrLabel: 'litecoin',
    icon: LtcIcon,
    disabled: false,
  },
  ZEC: {
    label: 'Zcash',
    qrLabel: 'zcash',
    icon: ZecIcon,
    disabled: false,
  },
  ETH: {
    label: 'Ethereum',
    qrLabel: 'ethereum',
    icon: EthIcon,
    disabled: false,
  },
};

export const ACCEPTED_COINS = [
  {
    label: 'Any coin',
    value: 'any',
  },
  {
    label: 'Bitcoin',
    value: 'BTC',
    icon: BtcIcon,
  },
  {
    label: 'Bitcoin Cash',
    value: 'BCH',
    icon: BchIcon,
  },
  {
    label: 'Litecoin',
    value: 'LTC',
    icon: LtcIcon,
  },
  {
    label: 'Zcash',
    value: 'ZEC',
    icon: ZecIcon,
  },
  {
    label: 'Ethereum',
    value: 'ETH',
    icon: EthIcon,
  },
];

export const getRenderingCoins = (acceptedCurrencies) => {
  if (_.isEmpty(acceptedCurrencies)) {
    return Object.keys(COINS).map(key => ({
      value: key,
      ...COINS[key],
    }));
  }

  return Object.keys(COINS).map(key => ({
    value: key,
    ...COINS[key],
    disabled: !acceptedCurrencies.includes(key),
  }));
};

export const transactionLinkDict = id => ({
  BTC: `https://btc.blockbook.api.openbazaar.org/tx/${id}`,
  BCH: `https://bch.blockbook.api.openbazaar.org/tx/${id}`,
  LTC: `https://ltc.blockbook.api.openbazaar.org/tx/${id}`,
  ZEC: `https://zec.blockbook.api.openbazaar.org/tx/${id}`,
  ETH: `https://etherscan.io/tx/${id}`,
});

export const TIP_ADDRESSES = {
  LTC: 'MTTEVR5pdAHJNmmFNzVjaQhGB9qLkHLk7m',
  BTC: '3JuykfZRbCepzkVLLseSaiufDJ5AC8ae8R',
  ZEC: 't1UEN9mf9hMccwTznqBoJFh2FERgyuMJ2oA',
  BCH: 'qq9favzja34zywrp222cwrx4fny9fe64pyaxl5dvar',
  ETH: '0x71A6e8B0580104dacA0633a9BA6F90181C6F40a5',
};
