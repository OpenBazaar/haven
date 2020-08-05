import { call, put, takeEvery, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../promo';

import { fetchPromo } from '../../api/promo';

export function* getPromo() {
  try {
    const result = yield call(fetchPromo);
    yield put({ type: actions.setPromo, payload: result });
  } catch (err) {
    console.log('Promo Saga Error: ', err);
  }
  yield put({ type: actions.setPromoLoading, payload: false });
}

const PromoSaga = function* Promo() {
  yield takeEvery(actions.fetchPromo, getPromo);
};

export default PromoSaga;
