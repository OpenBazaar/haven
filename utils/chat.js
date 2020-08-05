import * as _ from 'lodash';
import moment from 'moment';

export const convertMsgToGiftChatItem = (profile, getPeerProfile) => (item) => {
  const { peerId } = item;
  const peerProfile = getPeerProfile(peerId);
  const sender = item.outgoing ? profile : peerProfile;
  const senderId = item.outgoing ? profile.peerID : peerProfile.peerID;
  const thumbnail = _.get(sender, 'avatarHashes.tiny');
  const loading = _.get(item, 'loading', false);
  const success = _.get(item, 'success', true);
  return {
    _id: _.hasIn(item, 'messageId') ? item.messageId : item.localId,
    text: item.message,
    createdAt: new Date(item.timestamp),
    loading,
    success,
    moderatorJoined: item.moderatorJoined,
    user: {
      _id: senderId,
      name: sender.name,
      avatar: thumbnail,
    },
  };
};

const removeDuplicates = (history) => {
  const result = [];
  result.push({ ...history[0] });
  for (let i = 1; i < history.length; i += 1) {
    const loading = history[i].loading && moment(new Date()).diff(moment(history[i].timestamp), 'seconds') <= 60;
    if (!_.isEmpty(history[i].message)) {
      if (!_.isEmpty(history[i].messageId)) {
        result.push({
          ...history[i],
          loading,
        });
      } else if (!_.isEmpty(history[i - 1].messageId)) {
        const diff = moment(history[i - 1].timestamp).diff(moment(history[i].timestamp), 'seconds');
        if (diff >= -60 || history[i - 1].message !== history[i].message) {
          result.push({
            ...history[i],
            loading,
          });
        }
      } else {
        result.push({
          ...history[i],
          loading,
        });
      }
    }
  }
  return result;
};

const removeDuplicatesBackwards = (history) => {
  const result = [];
  result.push({ ...history[0] });
  for (let i = 1; i < history.length; i += 1) {
    if (!_.isEmpty(history[i].messageId)) {
      result.push({ ...history[i] });
    } else if (!_.isEmpty(history[i - 1].messageId)) {
      const diff = moment(history[i - 1].timestamp).diff(moment(history[i].timestamp), 'seconds');
      if (diff >= 60 || history[i - 1].message !== history[i].message) {
        result.push({ ...history[i] });
      }
    } else {
      result.push({ ...history[i] });
    }
  }
  return result;
};

// This function is to merge current chat history with the message info list on local
// This is required because when message is failure due to offline-nodes, then need to save
// that data in local
export const mergeWithLocalHistory = (data, localHistory) => {
  const { chatDetails, peerID, subject } = data;
  const history = _.filter(
    localHistory,
    message => message.peerID === peerID && message.subject === subject,
  );
  if (_.isEmpty(history)) {
    return chatDetails;
  }
  let result = [...chatDetails, ...history];
  result = _.uniqBy(result, 'messageId');
  for (let i = 0; i < history.length; i += 1) {
    if (_.isEmpty(history[i].messageId)) {
      const idx = _.findIndex(result, msg => msg.localId === history[i].localId);
      if (idx === -1) {
        result.push({ ...history[i] });
      }
    }
  }
  result = _.sortBy(result, [msg => moment(msg.timestamp).valueOf()]);
  result = removeDuplicates(result);
  result = result.reverse();
  result = removeDuplicatesBackwards(result);
  return result;
};


export const isSameDay = (currentMessage = {}, diffMessage = {}) => {
  if (!diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
};

export const isSameUser = (currentMessage = {}, diffMessage = {}) => !!(diffMessage.user && currentMessage.user && _.get(diffMessage, 'user._id') === _.get(currentMessage, 'user._id'));
