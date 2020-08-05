import { call, put, takeEvery, select } from 'redux-saga/effects';

import { actions as feedActions } from '../feed';
import { actions as streamActions } from '../stream';

import * as feedApi from '../../api/feed';

import { getUserPeerID } from './sagaSelector';
import { convertFromReference } from '../../utils/feed';

export function* postFeed(action) {
  const {
    status, images, success, failure,
  } = action.payload;
  try {
    const result = yield call(feedApi.postFeed, status, images);
    const postData = yield call(feedApi.fetchFeedItem, result.slug);
    const { post: content, ...other } = postData;
    const peerID = yield select(getUserPeerID);
    const { slug } = content;
    const reference = `${peerID}/${slug}`;
    const item = {
      type: 'POST',
      data: {
        ...content,
        ...other,
        reference,
        vendorID: { peerID },
      },
    };
    yield put({ type: feedActions.postFeedSucceed, payload: { reference, item } });
    yield put({ type: streamActions.createPost, payload: { reference, data: postData, success, failure } });
  } catch (err) {
    if (failure) {
      failure(err);
    }
    yield put({ type: feedActions.postFeedFailure, payload: err });
    console.log('PostFeed Saga Error: ', err);
  }
}

export function* deleteFeedItem(action) {
  const { peerID, slug, activityId, reactionId } = action.payload;
  const reference = `${peerID}--${slug}`;
  try {
    yield call(feedApi.deleteFeedItem, slug);
    yield put({ type: streamActions.deletePost, payload: { reference, activityId, reactionId } });
  } catch (err) {
    console.log('DeleteFeed Saga Error: ', err);
  }
}

export function* removeFeedItem(action) {
  const { peerID, slug, activityId, reactionId } = action.payload;
  const reference = `${peerID}--${slug}`;
  try {
    yield put({ type: streamActions.removePost, payload: { reference, activityId, reactionId } });
  } catch (err) {
    console.log('RemoveFeed Saga Error: ', err);
  }
}

export function* commentFeed(action) {
  const {
    uuid, comment, reference, activityId, onSuccess,
  } = action.payload;
  try {
    const response = yield call(feedApi.commentFeed, reference, comment);
    const { peerID: targetPeerID } = convertFromReference(reference);
    yield put({ type: feedActions.commentFeedSucceed, payload: { uuid, slug: response.slug } });
    yield put({
      type: streamActions.commentPost,
      payload: {
        targetPeerID,
        activityId,
        comment,
        onSuccess,
      },
    });
  } catch (err) {
    yield put({ type: feedActions.commentFeedFailure, payload: { uuid } });
  }
}

export function* repostFeed(action) {
  const { reference, comment, activityId, originalActivityId, success } = action.payload;
  const myPeerId = yield select(getUserPeerID);
  try {
    const { slug } = yield call(feedApi.repostFeed, reference, comment);
    const post = yield call(feedApi.fetchFeedItem, slug);
    yield put({
      type: streamActions.repostPost,
      payload: {
        peerID: myPeerId,
        originalActivityId,
        activityId,
        post,
        reference,
        success,
      },
    });
  } catch (err) {
    yield put({ type: feedActions.repostFeedFailure, payload: err });
    console.log('RepostFeed Saga Error:', err);
  }
}

export function* deleteRepost(action) {
  const { reference, activityId, reactionId, originalActivityId, success } = action.payload;
  const { slug } = convertFromReference(reference);
  try {
    yield call(feedApi.deleteFeedItem, slug);
  } catch (err) {}
  try {
    yield put({ type: streamActions.deleteRepost, payload: { activityId, reactionId, reference, originalActivityId, success } });
  } catch (err) {
    console.log('Delete Repost Saga Error:', err);
  }
}

export default function* Feed() {
  yield takeEvery(feedActions.commentFeed, commentFeed);
  yield takeEvery(feedActions.postFeed, postFeed);
  yield takeEvery(feedActions.repostFeed, repostFeed);
  yield takeEvery(feedActions.deleteFeedItem, deleteFeedItem);
  yield takeEvery(feedActions.removeFeedItem, removeFeedItem);
  yield takeEvery(feedActions.deleteRepost, deleteRepost);
}
