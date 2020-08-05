import Mock from 'react-native-fetch-mock';

import { gatewayAPI } from '../const';
import WALLET_BALANCE_MOCK from './wallet_balance.json';
import WALLET_ESTIMATE_FEE_MOCK from './wallet_estimatefee_coin.json';
import WALLET_FEES_MOCK from './wallet_fees.json';
import WALLET_SPEND_MOCK from './wallet_spend.json';
import WALLET_TRANSACTIONS_FAIL_MOCK from './wallet_transactions_coin_fail.json';
import WALLET_TRANSACTIONS_MOCK from './wallet_transactions_coin.json';
import LISTING_CREATE_MOCK from './create_listing.json';

export const MOCK_FOR_ETH = false;
export const MOCK_WALLET_TRANSACTION_FAIL = false;

const mockSpec = {
  [`${gatewayAPI}/wallet/balance`]: () => WALLET_BALANCE_MOCK,
  [`${gatewayAPI}/wallet/fees`]: () => WALLET_FEES_MOCK,
  [`${gatewayAPI}/wallet/estimatefee/ETH`]: () => WALLET_ESTIMATE_FEE_MOCK,
  [`POST ${gatewayAPI}/wallet/spend`]: () => WALLET_SPEND_MOCK,
  [`${gatewayAPI}/wallet/transactions/eth`]: () => (
    MOCK_WALLET_TRANSACTION_FAIL ? WALLET_TRANSACTIONS_FAIL_MOCK : WALLET_TRANSACTIONS_MOCK
  ),
  [`POST ${gatewayAPI}/ob/listing`]: () => LISTING_CREATE_MOCK,
};

if (MOCK_FOR_ETH) {
  global.fetch = new Mock(mockSpec, {
    fetch: global.fetch,
  }).fetch;
}
