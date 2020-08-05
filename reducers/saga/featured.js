import { call, put, takeEvery } from 'redux-saga/effects';

import { actions } from '../featured';
import { actions as profileActions } from '../profile';

import { fetchFeatured } from '../../api/featured';

export function* getFeatured() {
  try {
    const result = yield call(fetchFeatured);
    yield put({ type: actions.setFeatured, payload: result });
    for (let i = 0; i < result.length; i += 1) {
      yield put({
        type: profileActions.fetchProfile,
        payload: {
          peerID: result[i],
          getLoaded: true,
        },
      });
    }
  } catch (err) {
    console.log('Featured Saga Error: ', err);
  }
  yield put({ type: actions.setFeaturedLoading, payload: false });
}

const FeaturedSaga = function* Featured() {
  yield takeEvery(actions.fetchFeatured, getFeatured);
};

export default FeaturedSaga;
