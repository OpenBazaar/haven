import { isEmpty } from 'lodash';

export const getPageNum = state => state.search.cur_page || 0;
export const getUserPageNum = state => state.search.user_cur_page || 0;
export const hasMore = state => state.search.more_page;
export const hasMoreUser = state => state.search.user_more_page;
export const getSearchFilter = state => state.search.filter;
export const getKeyword = state => state.appstate.keyword;
export const getCategory = state => state.appstate.category;
export const getUserCredentails = state => ({
  username: state.appstate.username,
  password: state.appstate.password,
});
export const getUserPeerID = state => state.profile.data.peerID || '';
export const getProfileFetchMode = state => ({
  usecache: state.appstate.usecache,
  async: state.appstate.async,
});
export const getNewListingInfo = state => ({
  ...state.createListing,
  currency: state.settings.localCurrency || 'USD',
});
export const getLocalCurrency = state => state.settings.localCurrency || 'USD';
export const getStoreModerators = state => state.settings.storeModerators || [];
export const getProfiles = ({ profiles }) => ({ profiles: profiles || [] });
export const getProfileFailedQueue = ({ profileFailedQueue }) => profileFailedQueue || [];
export const getProfileQueue = ({ profileQueue }) => profileQueue || [];
export const getWalletList = state => state.profile.data.currencies || [];
export const getConfiguration = state => state.config.config || {};
export const getMyProfile = ({ profile }) => profile.data;
export const getNotificationSettings = ({ appstate }) => appstate.notifications;

export const getBlockedNodes = state => state.settings.blockedNodes || [];

export const getAppInstalled = state => state.appstate.appInstalled || new Date();
export const getLastReviewPrompt = state => state.appstate.lastReviewPrompt;
export const getModerators = state => state.moderators;

export const getIsFirstStreamInit = state => !state.appstate.streamBuildMigrated;
export const getIsFirstETHInit = state => !state.appstate.ETHBuildMigrated;

export const getOrderPollForSessionExecuted = state => state.orders.pollForSessionExecuted;
export const getOrderPolls = state => state.orders.polls;
