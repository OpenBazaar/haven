import { get, isEmpty } from 'lodash';

import { getBlockedNodes } from './profile';

export const getActivity = state => activityId => get(state.stream.feeds, activityId, {});
export const getFeedCount = (filter, sort) => state => (sort ?
  get(state.stream, `${filter}Feeds.${sort}.length`, 0)
  : get(state.stream, `${filter}Feeds.length`, 0));
export const getSort = filter => state => get(state.stream, `${filter}Sort`);

export const getNotificationCount = state => get(state.stream, 'notifications.length', 0);

export const getFirstNotificatyionId = state => get(state.stream, 'notifications[0].id', false);

export const getLastNotificatyionId = (state) => {
  const notifications = get(state.stream, 'notifications', []);
  return get(state.stream, `notifications[${notifications.length - 1}].id`, false);
};

export const getFeedList = (state) => {
  const { filter, sort } = state.stream;
  return filter !== 'local' ? get(state.stream, `${filter}Feeds.${sort}`, []) : get(state.stream, `${filter}Feeds`, []);
};

export const getFilteredList = state => (filter, sort, peerID) => {
  const blockedNodes = getBlockedNodes(state);

  const list = filter !== 'local' ?
    get(state.stream, `${filter}Feeds.${sort}`, [])
    : get(state.stream, `${filter}Feeds`, []);
  const blockNodeFiltered = list.filter((feed) => {
    const peerID = get(state.stream.feeds, `${feed}.actor.id`);
    return !blockedNodes.find(node => node === peerID);
  });
  if (!isEmpty(peerID)) {
    return blockNodeFiltered.filter(feed => get(state.stream.feeds, `${feed}.actor.id`) === peerID);
  }
  return blockNodeFiltered;
};

export const getFollowings = state => state.follow.followingsFromLocal || [];

export const getUserSort = state => state.stream.userSort;

export const getAllNotifications = state => state.stream.notifications;
