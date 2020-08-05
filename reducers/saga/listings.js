import { call, put, takeEvery, select } from 'redux-saga/effects';

import { actions } from '../listings';
import { getListing, getListingFromHash } from '../../api/products';

import { getUserCredentails } from './sagaSelector';

function* fetchListing(action) {
  const { username, password } = yield select(getUserCredentails);
  const { slug, peerID, hash } = action.payload;

  try {
    let listing;
    if (hash) {
      listing = yield call(getListingFromHash, username, password, hash);
    } else {
      listing = yield call(getListing, username, password, slug, peerID);
    }
    yield put({ type: actions.addListing, payload: listing });
  } catch (err) {
    if (hash) {
      try {
        yield put({ type: actions.loadingFromGatewayNow });
        listing = yield call(getListing, username, password, slug, peerID);
        yield put({ type: actions.addListing, payload: listing });
      } catch (err) {
        yield put({ type: actions.addListing });
      }
    } else {
      yield put({ type: actions.addListing });
    }
    console.log('fetchListing Saga Error: ', err);
  }
}

const ListingSaga = function* ListingSaga() {
  yield takeEvery(actions.fetchListing, fetchListing);
};

export default ListingSaga;
