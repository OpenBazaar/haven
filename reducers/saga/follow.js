import { Alert } from 'react-native';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { isEmpty, get } from 'lodash';

import { followPeer, unfollowPeer, getFollowers, getFollowings, getFollowingsFromLocal } from '../../api/follow';
import { actions } from '../follow';
import { actions as queueActions } from '../followQueue';
import { actions as streamActions } from '../stream';
import { getUserPeerID } from './sagaSelector';

function* fetchFollowers() {
  try {
    const peerID = yield select(getUserPeerID);
    const result = yield call(getFollowers, peerID);
    const { profiles } = result || {};
    if (Array.isArray(profiles)) {
      yield put({ type: actions.setFollowers, payload: profiles });
    }
  } catch (err) {
    console.log('fetchFollowers Saga Error: ', err);
  }
}

function* fetchFollowings() {
  const peerID = yield select(getUserPeerID);
  try {
    const result = yield call(getFollowings, peerID);
    const { profiles } = result || {};
    if (Array.isArray(profiles)) {
      yield put({ type: actions.setFollowings, payload: profiles });
    }
  } catch (err) {
    console.log('fetchFollowers Saga Error: ', err);
  }
}

function* fetchFollowingsFromLocal() {
  try {
    const result = yield call(getFollowingsFromLocal);
    if (Array.isArray(result)) {
      yield put({ type: actions.setFollowingsFromLocal, payload: result });
    }
  } catch (err) {
    console.log('fetchFollowers Saga Error: ', err);
  }
}

function* follow(action) {
  const peerID = action.payload;

  try {
    if (!isEmpty(peerID)) {
      yield put({ type: queueActions.addToFollowQueue, payload: peerID });
      const result = yield call(followPeer, peerID);
      yield put({ type: queueActions.removeFromFollowQueue, payload: peerID });
      if (get(result, 'success', true)) {
        yield put({ type: streamActions.followUser, payload: peerID });
        yield put({ type: actions.addFollowing, payload: peerID });
      } else {
        Alert.alert(result.reason);
      }
    }
  } catch (err) {
    console.log('fetchFollowers Saga Error: ', err);
  }
}

function* unfollow(action) {
  const peerID = action.payload;

  try {
    if (!isEmpty(peerID)) {
      yield put({ type: queueActions.addToUnfollowQueue, payload: peerID });
      yield call(unfollowPeer, peerID);
      yield put({ type: streamActions.unfollowUser, payload: peerID });
      yield put({ type: queueActions.removeFromUnfollowQueue, payload: peerID });
      yield put({ type: actions.removeFollowing, payload: peerID });
    }
  } catch (err) {
    console.log('fetchFollowers Saga Error: ', err);
  }
}

const FollowSaga = function* Search() {
  yield takeEvery(actions.fetchFollowers, fetchFollowers);
  yield takeEvery(actions.fetchFollowings, fetchFollowings);
  yield takeEvery(actions.fetchFollowingsFromLocal, fetchFollowingsFromLocal);
  yield takeEvery(actions.followPeer, follow);
  yield takeEvery(actions.unfollowPeer, unfollow);
};

export default FollowSaga;
