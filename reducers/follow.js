import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchFollowers: 'FOLLOW/FETCH_FOLLOWERS',
  setFollowers: 'FOLLOW/SET_FOLLOWERS',
  fetchFollowings: 'FOLLOW/FETCH_FOLLOWINGS',
  fetchFollowingsFromLocal: 'FOLLOW/FETCH_FOLLOWINGS_FROM_LOCAL',
  setFollowings: 'FOLLOW/SET_FOLLOWINGS',
  setFollowingsFromLocal: 'FOLLOW/SET_FOLLOWINGS_FROM_LOCAL',
  followPeer: 'FOLLOW/FOLLOW_PEER',
  unfollowPeer: 'FOLLOW/UNFOLLOW_PEER',
  addFollowing: 'FOLLOW/ADD_FOLLOWER',
  removeFollowing: 'FOLLOW/REMOVE_FOLLOWER',
};

export const fetchFollowers = createAction(actions.fetchFollowers);
export const fetchFollowings = createAction(actions.fetchFollowings);
export const fetchFollowingsFromLocal = createAction(actions.fetchFollowingsFromLocal);
export const followPeer = createAction(actions.followPeer);
export const unfollowPeer = createAction(actions.unfollowPeer);

const initialState = {
  followers: [],
  followings: [],
  followingsFromLocal: [],
};

export default handleActions(
  {
    [actions.setFollowers]: (state, action) => ({
      ...state,
      followers: action.payload,
    }),
    [actions.setFollowings]: (state, action) => ({
      ...state,
      followings: action.payload,
    }),
    [actions.setFollowingsFromLocal]: (state, action) => ({
      ...state,
      followingsFromLocal: action.payload,
    }),
    [actions.addFollowing]: (state, action) => ({
      ...state,
      followings: [...state.followings, { peerID: action.payload }],
      followingsFromLocal: [...state.followingsFromLocal, action.payload],
    }),
    [actions.removeFollowing]: (state, action) => ({
      ...state,
      followingsFromLocal: state.followingsFromLocal.filter(following => following !== action.payload),
    }),
  },
  initialState,
);
