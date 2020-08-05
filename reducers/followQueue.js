import { handleActions } from 'redux-actions';

export const actions = {
  addToFollowQueue: 'FOLLOW/ADD_TO_FOLLOW_QUEUE',
  removeFromFollowQueue: 'FOLLOW/REMOVE_FROM_FOLLOW_QUEUE',
  addToUnfollowQueue: 'FOLLOW/ADD_TO_UNFOLLOW_QUEUE',
  removeFromUnfollowQueue: 'FOLLOW/REMOVE_FROM_UNFOLLOW_QUEUE',
};

const initialState = {
  followQueue: [],
  unfollowQueue: [],
};

export default handleActions(
  {
    [actions.addToFollowQueue]: (state, action) => ({
      ...state,
      followQueue: [...state.followQueue, action.payload],
    }),
    [actions.removeFromFollowQueue]: (state, action) => ({
      ...state,
      followQueue: state.followQueue.filter(item => item !== action.payload),
    }),
    [actions.addToUnfollowQueue]: (state, action) => ({
      ...state,
      unfollowQueue: [...state.unfollowQueue, action.payload],
    }),
    [actions.removeFromUnfollowQueue]: (state, action) => ({
      ...state,
      unfollowQueue: state.unfollowQueue.filter(item => item !== action.payload),
    }),
  },
  initialState,
);
