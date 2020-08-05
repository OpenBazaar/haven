import { call, put, takeEvery } from 'redux-saga/effects';
import { isEmpty } from 'lodash';

import { actions } from '../exchangeRate';

import { getExchangeRate } from '../../api/wallet';

function* fetchRates(action) {
  const coin = action.payload || 'BTC';
  try {
    const rates = yield call(getExchangeRate, coin);
    if (rates[coin]) {
      yield put({ type: actions.setExchangeRate, payload: rates });
    }
  } catch (err) {
    console.log('Exchange Rate failed');
  }
}

const exchangeRate = function* ExchagneRate() {
  yield takeEvery(actions.fetchExchangeRate, fetchRates);
};

export default exchangeRate;
