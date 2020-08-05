import { call, put, takeEvery, select } from 'redux-saga/effects';

import { actions } from '../ratings';

import { getRatings } from '../../api/products';

import { getUserCredentails } from './sagaSelector';

export function* getRatingsAction(action) {
  const { username, password } = yield select(getUserCredentails);
  const { peerID, slug } = action.payload;
  try {
    const result = yield call(getRatings, username, password, slug, peerID);
    if (result.success !== false) {
      const { ratings = [], average = 0, count = 0 } = result;
      yield put({
        type: actions.setRatings,
        payload: {
          reference: `${peerID}/${slug}`,
          ratings: ratings.reverse(),
          avgRating: average,
          count,
        },
      });
    } else {
      yield put({ type: actions.fetchRatingsFailure });
    }
  } catch (err) {
    yield put({ type: actions.fetchRatingsFailure });
  }
}

export default function* RatingsSaga() {
  yield takeEvery(actions.fetchRatings, getRatingsAction);
}
