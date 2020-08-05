import { createSelector } from 'reselect';
import * as _ from 'lodash';
import moment from 'moment';
import { getBlockedNodes } from '../reducers/saga/sagaSelector';

const chatsSelector = state => state.chat.chats.data;
const loadingSelector = state => state.chat.chats.loading;
const sentListSelector = state => state.chat.sentList;

const chatsListSelector = createSelector(
  chatsSelector,
  loadingSelector,
  sentListSelector,
  getBlockedNodes,
  (chats, loading, sentList, blockedNodes) => {
    const filteredList = sentList.filter(message => message.subject === '');
    const offlinePeerIds = _.difference(
      _.uniq(filteredList.map(message => message.peerID)),
      chats.map(chat => chat.peerId),
    );
    const offlineChats = offlinePeerIds.map((peerId) => {
      const messages = _.sortBy(
        filteredList.filter(message => message.peerID === peerId),
        message => moment(message.timestamp).valueOf(),
      );
      const lastMessage = messages[messages.length - 1];
      const {
        message, timestamp, loading, success,
      } = lastMessage;
      return {
        lastMessage: message, peerId, timestamp, loading, success, outgoing: true, unread: false,
      };
    });

    const newChats = _.sortBy(
      [...chats, ...offlineChats],
      chat => moment(chat.timestamp).valueOf(),
    );
    return {
      data: newChats.filter(chat => !blockedNodes.includes(chat.peerId)),
      loading,
    };
  },
);

export const chatsMap = state => ({
  chats: chatsListSelector(state),
});
