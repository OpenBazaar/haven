import { createAction, handleActions } from 'redux-actions';
import { get, set, findIndex, filter } from 'lodash';
import moment from 'moment';

import { mergeWithLocalHistory } from '../utils/chat';

export const actions = {
  fetchChats: 'CHAT/FETCH_CHATS',
  fetchChatDetail: 'CHAT/FETCH_CHAT_DETAIL',
  setChatDetailLoading: 'CHAT/SET_CHAT_DETAIL_LOADING',
  setChats: 'CHAT/SET_CHATS',
  setChatsLoading: 'CHAT/SET_CHATS_LOADING',
  setChatDetail: 'CHAT/SET_CHAT_DETAIL',
  sendChat: 'CHAT/SEND_CHAT',
  setChatAsRead: 'CHAT/SET_AS_READ',
  updateLocalInfo: 'CHAT/UPDATE_LOCAL_INFO',
  updateChats: 'CHAT/UPDATE_CHATS',
  deleteChatConversation: 'CHAT/DELETE_CHAT_CONVERSATION',
};

export const fetchChats = createAction(actions.fetchChats);
export const fetchChatDetail = createAction(actions.fetchChatDetail);
export const setChatsLoading = createAction(actions.setChatsLoading);
export const setChatDetailLoading = createAction(actions.setChatDetailLoading);
export const sendChat = createAction(actions.sendChat);
export const setChatAsRead = createAction(actions.setChatAsRead);
export const updateChats = createAction(actions.updateChats);
export const deleteChatConversation = createAction(actions.deleteChatConversation);

const initialState = {
  chats: { data: [], loading: false },
  sentList: [],
  chatDetail: [],
  currentChatInfo: {},
  detailLoading: false,
};

export default handleActions(
  {
    [actions.fetchChatDetail]: (state, action) => ({
      ...state,
      currentChatInfo: action.payload,
    }),
    [actions.setChats]: (state, action) => ({
      ...state,
      chats: {
        loading: state.chats.loading,
        data: action.payload,
      },
    }),
    [actions.setChatsLoading]: (state, action) => ({
      ...state,
      chats: {
        loading: action.payload,
        data: state.chats.data,
      },
    }),
    [actions.setChatDetailLoading]: (state, action) => ({
      ...state,
      detailLoading: action.payload,
    }),
    [actions.setChatDetail]: (state, action) => ({
      ...state,
      chatDetail: mergeWithLocalHistory(action.payload, state.sentList),
      loading: false,
    }),
    [actions.sendChat]: (state, action) => {
      const {
        peerID,
        message,
        localId,
      } = action.payload;
      const subject = get(action.payload, 'subject', '');
      const { sentList } = state;
      const otherSentList = filter(sentList, msg => msg.localId !== localId);
      const newSentList = [...otherSentList, {
        peerID,
        subject,
        message,
        localId,
        timestamp: moment().format(),
        loading: true,
        success: false,
        outgoing: true,
      }];
      const chatDetailPayload = {
        chatDetails: state.chatDetail,
        peerID,
        subject,
      };
      return message === '' ? state : ({
        ...state,
        sentList: newSentList,
        chatDetail: mergeWithLocalHistory(chatDetailPayload, newSentList),
      });
    },
    [actions.updateLocalInfo]: (state, action) => {
      const sentList = state.sentList.map(msg => ({ ...msg }));
      const { localId, success, result } = action.payload;
      const idx = findIndex(sentList, msg => msg.localId === localId);
      if (success) {
        const { messageId } = result;
        set(sentList, `[${idx}].success`, true);
        set(sentList, `[${idx}].messageId`, messageId);
      } else {
        set(sentList, `[${idx}].success`, false);
      }
      set(sentList, `[${idx}].loading`, false);
      const currentSubject = get(state, 'chatDetail[0].subject', '');
      const currentPeerID = get(state, 'chatDetail[0].peerID');
      const subject = get(sentList, `[${idx}].subject`);
      const peerID = get(sentList, `[${idx}].peerID`);
      return ({
        ...state,
        sentList,
        chatDetail: subject === currentSubject && peerID === currentPeerID ?
          mergeWithLocalHistory({ chatDetails: state.chatDetail, peerID, subject }, sentList)
          : state.chatDetail,
      });
    },
    [actions.deleteChatConversation]: (state, action) => {
      const peerID = action.payload;
      const sentList = state.sentList.filter(msg => msg.peerID !== peerID);
      return ({ ...state, sentList });
    },
  },
  initialState,
);
