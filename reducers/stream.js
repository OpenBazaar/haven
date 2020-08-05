import { Platform } from 'react-native';
import { createAction, handleActions } from 'redux-actions';
import { isEmpty, hasIn, get } from 'lodash';

export const STREAM_DEFAULT_FILTER = Platform.OS === 'ios' ? 'user' : 'global';

const mergeArray = (a, b) => {
  if (!b) {
    return a;
  }

  const filtered = a.filter(aId => isEmpty(b.find(bId => bId === aId)));
  return [...filtered, ...b];
};

export const actions = {
  streamInitFinished: 'STREAM/INIT_FINISHED',
  fetchStream: 'STREAM/FETCH_STREAM',
  refreshStream: 'STREAM/REFRESH_STREAM',
  prependStream: 'STREAM/PREPEND_STREAM',
  appendStream: 'STREAM/APPEND_STREAM',
  fetchLocalStream: 'STREAM/FETCH_LOCALSTREAM',

  fetchFeedItems: 'STREAM/FETCH_FEED_ITEMS',
  setFeedItems: 'STREAM/SET_FEED_ITEMS',

  updateUser: 'STREAM/UPDATE_USER',
  followUser: 'STREAM/FOLLOW_USER',
  unfollowUser: 'STREAM/UNFOLLOW_USER',

  createPost: 'STREAM/CREATE_POST',
  likePost: 'STREAM/LIKE_POST',
  unlikePost: 'STREAM/UNLIKE_POST',
  commentPost: 'STREAM/COMMENT_POST',
  deleteComment: 'STREAM/DELETE_COMMENT',
  repostPost: 'STREAM/REPOST_POST',
  deleteRepost: 'STREAM/DELETE_REPOST',

  updatePost: 'STREAM/UPDATE_POST',
  deletePost: 'STREAM/DELETE_POST',
  removePost: 'STREAM/REMOVE_POST',

  addToRecent: 'STREAM/ADD_TO_RECENT',

  resetFeedList: 'STREAM/RESET_FEED_LIST',

  updateReaction: 'STREAM/UPDATE_REACTION',

  updateReceived: 'STREAM/UPDATE_RECEIVED',
  deleteWebsocketUpdate: 'STREAM/DELETE_WEBSOCKET_UPDATE',
  addWebsocketUpdate: 'STREAM/ADD_WEBSOCKET_UPDATE',
  notificationUpdateReceived: 'STREAM/NOTIFICATION_UPDATE_RECEVIED',

  sendSocialNotification: 'STREAM/SEND_SOCIAL_NOTIFICATION',
  sendNotification: 'STREAM/SEND_NOTIFICATION',

  fetchSocialNotifications: 'STREAM/FETCH_SOCIAL_NOTIFICATION',
  appendSocialNotification: 'STREAM/APPEND_SOCIAL_NOTIFICATION',
  prependSocialNotication: 'STREAM/PREPEND_SOCIAL_NOTIFICATION',

  markAllAsSeen: 'STREAM/MARK_ALL_AS_READ',

  updateSort: 'STREAM/UPDATE_SORT',

  addNotificationUpdate: 'STREAM/ADD_NOTIFICATION_UPDATE',

  finishedFetchRequest: 'STREAM/FINISHED_FETCH_REQUEST',
};

const initialState = {
  userFeeds: { recent: [], trending: [], allFetched: false },
  globalFeeds: { recent: [], trending: [], allFetched: false },
  hashtagFeeds: { recent: [], trending: [], allFetched: false },
  hashtag: '',
  localFeeds: [],
  followers: [],
  followings: [],
  notifications: [],
  feeds: {},
  currentStatus: '',
  filter: STREAM_DEFAULT_FILTER,
  globalSort: 'recent',
  userSort: 'recent',
  localSort: 'recent',
  hashtagSort: 'recent',
  localAllFetched: false,
};

export default handleActions(
  {
    [actions.fetchStream]: (state, { type: currentStatus, payload: { filter, hashtag } }) => ({
      ...state,
      filter,
      hashtag,
      currentStatus,
      hashtagFeeds: hashtag !== state.hashtag ? { recent: [], trending: [], allFetched: false } : state.hashtagFeeds,
    }),
    [actions.refreshStream]: (state, { type: currentStatus, payload: { filter } }) => ({ ...state, filter, currentStatus }),
    [actions.appendStream]: (state, { type: currentStatus, payload: { filter, sort, feed, feedList, allFetched } }) => {
      const { globalFeeds, userFeeds, localFeeds, hashtagFeeds, feeds } = state;
      const baseState = { ...state, currentStatus, feeds: { ...feeds, ...feed } };
      switch (filter) {
        case 'user':
          return { ...baseState, userFeeds: { ...userFeeds, [sort]: mergeArray(userFeeds[sort], feedList), allFetched } };
        case 'local':
          return { ...baseState, localFeeds: mergeArray(localFeeds, feedList), localAllFetched: allFetched };
        case 'hashtag':
          return {
            ...baseState,
            hashtagFeeds: { ...hashtagFeeds, [sort]: mergeArray(hashtagFeeds[sort] || [], feedList), allFetched },
          };
        case 'global':
        default:
          return { ...baseState, globalFeeds: { ...globalFeeds, [sort]: mergeArray(globalFeeds[sort], feedList), allFetched } };
      }
    },
    [actions.prependStream]: (state, { type: currentStatus, payload: { filter, sort, feed, feedList } }) => {
      const { globalFeeds, userFeeds, localFeeds, hashtagFeeds, feeds } = state;
      const baseState = { ...state, currentStatus, feeds: { ...feeds, ...feed } };
      switch (filter) {
        case 'user':
          return { ...baseState, userFeeds: { ...userFeeds, [sort]: mergeArray(feedList, userFeeds[sort]) } };
        case 'local':
          return { ...baseState, localFeeds: mergeArray(feedList, localFeeds) };
        case 'hashtag':
          return {
            ...baseState,
            hashtagFeeds: { ...hashtagFeeds, [sort]: mergeArray(feedList, hashtagFeeds[sort] || []) },
          };
        case 'global':
        default:
          return { ...baseState, globalFeeds: { ...globalFeeds, [sort]: mergeArray(feedList, globalFeeds[sort]) } };
      }
    },
    [actions.setFeedItems]: (state, { type, payload: feeds }) => {
      const { feeds: originalFeeds } = state;
      return ({ ...state, feeds: { ...originalFeeds, ...feeds } });
    },
    [actions.setStreamItem]: (state, { payload: feed }) => ({ ...state, feeds: { ...state.feeds, feed } }),
    [actions.addToRecent]: (state, { payload }) => ({
      ...state,
      globalFeeds: {
        ...state.globalFeeds,
        recent: mergeArray(payload, state.globalFeeds.recent),
      },
      userFeeds: { ...state.userFeeds, recent: mergeArray(payload, state.userFeeds.recent) },
    }),
    [actions.resetFeedList]: (state, { payload: filter }) => ({ ...state, [`${filter}Feeds`]: filter === 'local' ? [] : { recent: [], trending: [] } }),
    [actions.deletePost]: (state, { payload: { activityId } }) => ({
      ...state,
      userFeeds: {
        ...state.userFeeds,
        recent: state.userFeeds.recent.filter(id => id !== activityId),
        trending: state.userFeeds.trending.filter(id => id !== activityId),
      },
      hashtagFeeds: {
        ...state.hashtagFeeds,
        recent: state.hashtagFeeds.recent.filter(id => id !== activityId),
        trending: state.hashtagFeeds.trending.filter(id => id !== activityId),
      },
      localFeeds: state.localFeeds.filter(id => id !== activityId),
      globalFeeds: {
        ...state.globalFeeds,
        recent: state.globalFeeds.recent.filter(id => id !== activityId),
        trending: state.globalFeeds.trending.filter(id => id !== activityId),
      },
    }),
    [actions.removePost]: (state, { payload: { activityId } }) => ({
      ...state,
      userFeeds: {
        ...state.userFeeds,
        recent: state.userFeeds.recent.filter(id => id !== activityId),
        trending: state.userFeeds.trending.filter(id => id !== activityId),
      },
      hashtagFeeds: {
        ...state.hashtagFeeds,
        recent: state.hashtagFeeds.recent.filter(id => id !== activityId),
        trending: state.hashtagFeeds.trending.filter(id => id !== activityId),
      },
      localFeeds: state.localFeeds.filter(id => id !== activityId),
      globalFeeds: {
        ...state.globalFeeds,
        recent: state.globalFeeds.recent.filter(id => id !== activityId),
        trending: state.globalFeeds.trending.filter(id => id !== activityId),
      },
    }),
    [actions.deleteComment]: (state, { payload: { activityId, reactionId } }) => {
      const { feeds } = state;
      const activity = get(feeds, activityId);
      if (activity) {
        const newActivity = { ...activity };
        const comments = get(newActivity, 'latest_reactions.comment', []);
        const ownComments = get(newActivity, 'own_reactions.comment', []);
        newActivity.latest_reactions = {
          ...newActivity.latest_reactions,
          comment: comments.filter(comment => comment.id !== reactionId),
        };
        newActivity.own_reactions = {
          ...newActivity.own_reactions,
          comment: ownComments.filter(comment => comment.id !== reactionId),
        };
        const commentCount = get(newActivity, 'reaction_counts.comment', 0);
        newActivity.reaction_counts = {
          ...newActivity.reaction_counts,
          comment: Math.max(0, commentCount - 1),
        };
        return {
          ...state,
          feeds: {
            ...feeds,
            [activityId]: newActivity,
          },
        };
      }
      return state;
    },
    [actions.deleteRepost]: (state, { payload: { activityId } }) => ({
      ...state,
      userFeeds: {
        ...state.userFeeds,
        recent: state.userFeeds.recent.filter(id => id !== activityId),
        trending: state.userFeeds.trending.filter(id => id !== activityId),
      },
      hashtagFeeds: {
        ...state.hashtagFeeds,
        recent: state.hashtagFeeds.recent.filter(id => id !== activityId),
        trending: state.hashtagFeeds.trending.filter(id => id !== activityId),
      },
      localFeeds: state.localFeeds.filter(id => id !== activityId),
      globalFeeds: {
        ...state.globalFeeds,
        recent: state.globalFeeds.recent.filter(id => id !== activityId),
        trending: state.globalFeeds.trending.filter(id => id !== activityId),
      },
    }),
    [actions.updateReaction]: (state, { payload: { type, activityId, reaction, reactionId } }) => {
      let activity = { ...state.feeds[activityId] };
      const { reaction_counts = {}, own_reactions = {} } = activity;
      const { like = [] } = own_reactions;
      const { like: like_count = 0 } = reaction_counts;
      switch (type) {
        case 'like':
          activity = {
            ...activity,
            reaction_counts: {
              ...reaction_counts,
              like: like_count + 1,
            },
            own_reactions: {
              ...own_reactions,
              like: [...like, reaction],
            },
          };
          break;
        case 'unlike':
          activity = {
            ...activity,
            reaction_counts: {
              ...reaction_counts,
              like: like_count - 1,
            },
            own_reactions: {
              ...own_reactions,
              like: like.filter(({ id }) => id !== reactionId),
            },
          };
          break;
        default:
          break;
      }
      return {
        ...state,
        feeds: {
          ...state.feeds,
          [activityId]: activity,
        },
      };
    },
    [actions.deleteWebsocketUpdate]: (state, action) => {
      const { feeds, globalFeeds, userFeeds } = state;
      const { payload: deleted } = action;
      const newFeeds = { ...feeds };
      let recentList = [...globalFeeds.recent];
      let userList = [...userFeeds.recent];
      for (let i = 0; i < deleted.length; i += 1) {
        newFeeds[deleted[i]] = undefined;
        recentList = recentList.filter(id => id !== deleted[i]);
        userList = userList.filter(id => id !== deleted[i]);
      }
      return {
        ...state,
        globalFeeds: { ...globalFeeds, recent: recentList },
        userFeeds: { ...userFeeds, recent: userList },
      };
    },
    [actions.addWebsocketUpdate]: (state, action) => {
      const { userFeeds } = state;
      const { userFeeds: comingUserFeeds } = action.payload;
      return {
        ...state,
        userFeeds: { ...userFeeds, recent: mergeArray(comingUserFeeds, userFeeds.recent) },
      };
    },
    [actions.fetchSocialNotifications]: (state, { type: currentStatus }) => ({ ...state, currentStatus }),
    [actions.appendSocialNotification]: (state, { payload: { notifications }, type: currentStatus }) => {
      const newNotifications = [...state.notifications];
      const filteredNotifications = notifications.filter((notif) => {
        let notification = newNotifications.find(n => notif.group.includes(n.group));
        if (notification) {
          if (!hasIn(newNotifications, 'id')) {
            notification = {
              ...notif,
              is_seen: notification.is_seen,
              is_read: notification.is_read,
            };
          }
          return false;
        }
        return true;
      });
      return ({
        ...state,
        notifications: [...filteredNotifications, ...newNotifications],
        currentStatus,
      });
    },
    [actions.prependSocialNotication]: (state, { type: currentStatus, payload: { notifications } }) => {
      const newNotifications = [...state.notifications];
      const filteredNotifications = notifications.filter((notif) => {
        let notification = newNotifications.find(n => notif.group.includes(n.group));
        if (notification) {
          if (!hasIn(newNotifications, 'id')) {
            notification = {
              ...notif,
              is_seen: notification.is_seen,
              is_read: notification.is_read,
            };
          }
          return false;
        }
        return true;
      });
      return ({
        ...state,
        notifications: [...newNotifications, ...filteredNotifications],
        currentStatus,
      });
    },
    [actions.updateSort]: (state, { payload: { filter, sort } }) => {
      const baseState = {
        ...state,
        [`${filter}Sort`]: sort,
      };
      switch (filter) {
        case 'local':
          return { ...baseState, localAllFetched: false };
        default:
          return { ...baseState, [`${filter}Feeds`]: { ...state[`${filter}Feeds`], allFetched: false } };
      }
    },
    [actions.addNotificationUpdate]: (state, { payload }) => {
      const { notifications } = state;
      const newNotifications = payload.filter(notif => isEmpty(notifications.find(orgNotif => orgNotif.group === notif.group)));
      return {
        ...state,
        notifications: [...newNotifications, ...notifications],
      };
    },
    [actions.markAllAsSeen]: (state) => {
      const { notifications } = state;
      return {
        ...state,
        notifications: notifications.map(notification => ({
          ...notification,
          is_seen: true,
        })),
      };
    },
    [actions.finishedFetchRequest]: (state, { type: currentStatus }) => ({ ...state, currentStatus }),
  },
  initialState,
);

export const streamInitFinished = createAction(actions.streamInitFinished);

export const fetchStream = createAction(actions.fetchStream);
export const refreshStream = createAction(actions.refreshStream);
export const appendStream = createAction(actions.appendStream);
export const prependStream = createAction(actions.prependStream);

export const fetchFeedItems = createAction(actions.fetchFeedItems);
export const setFeedItems = createAction(actions.setFeedItems);

export const followUser = createAction(actions.followUser);
export const unfollowUser = createAction(actions.unfollowUser);

export const createPost = createAction(actions.createPost);
export const likePost = createAction(actions.likePost);
export const unlikePost = createAction(actions.unlikePost);
export const commentPost = createAction(actions.commentPost);
export const deleteComment = createAction(actions.deleteComment);
export const repostPost = createAction(actions.repostPost);
export const deleteRepost = createAction(actions.deleteRepost);

export const resetFeedList = createAction(actions.resetFeedList);

export const sendNotification = createAction(actions.sendNotification);

export const fetchSocialNotifications = createAction(actions.fetchSocialNotifications);

export const updateSort = createAction(actions.updateSort);

export const markAllAsSeen = createAction(actions.markAllAsSeen);
