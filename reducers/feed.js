import { createAction, handleActions } from 'redux-actions';

export const actions = {
  likeFeed: 'FEED/LIKE',
  unlikeFeed: 'FEED/UNLIKE',
  commentFeed: 'FEED/COMMENT',
  commentFeedSucceed: 'FEED/COMMENT_SUCCEED',
  commentFeedFailure: 'FEED/COMMENT_FAILURE',
  repostFeed: 'FEED/REPOST',
  repostFeedSucceed: 'FEED/REPOST_SUCCEED',
  repostFeedFailure: 'FEED/REPOST_FAILURE',
  postFeed: 'FEED/POST_FEED',
  postFeedSucceed: 'FEED/POST_FEED_SUCCEED',
  postFeedFailure: 'FEED/POST_FEED_FAILURE',
  postListingSucceed: 'FEED/POST_LISTING_SUCCEED',
  postListingFailure: 'FEED/POST_LISTING_FAILURE',
  deleteRepost: 'FEED/DELETE_REPOST',
  changeFilter: 'FEED/CHANGE_FILTER',
  deleteFeedItem: 'FEED/DELETE_FEED_ITEM',
  removeFeedItem: 'FEED/REMOVE_FEED_ITEM',
};

const initialState = { currentStatus: '' };

export default handleActions(
  {
    [actions.likeFeed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.unlikeFeed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.repostFeed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.repostFeedSucceed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.repostFeedFailure]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.deleteRepost]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.commentFeed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.commentFeedSucceed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.commentFeedFailure]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.postFeed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.postFeedSucceed]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),

    [actions.postFeedFailure]: (state, action) => ({
      ...state,
      currentStatus: action.type,
    }),
  },
  initialState,
);

export const commentFeed = createAction(actions.commentFeed);
export const repostFeed = createAction(actions.repostFeed);
export const deleteRepost = createAction(actions.deleteRepost);
export const likeFeed = createAction(actions.likeFeed);
export const unlikeFeed = createAction(actions.unlikeFeed);
export const postFeed = createAction(actions.postFeed);
export const deleteFeedItem = createAction(actions.deleteFeedItem);
export const removeFeedItem = createAction(actions.removeFeedItem);
