import { call, put, takeEvery, select } from 'redux-saga/effects';

import { actions } from '../storeListings';

import { getListings } from '../../api/products';
import { getUserCredentails } from './sagaSelector';

function* fetchListings() {
  const { username, password } = yield select(getUserCredentails);
  const result = yield call(getListings, username, password);
  yield put({ type: actions.setListings, payload: result });
}

const SettingsSaga = function* Search() {
  yield takeEvery(actions.fetchListings, fetchListings);
};

export default SettingsSaga;
