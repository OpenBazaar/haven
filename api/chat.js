import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

const base64 = require('base-64');

// Fetch chat conversations
export const fetchChats = (username, password) => {
  const apiURL = `${gatewayAPI}/ob/chatconversations`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'GET',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(apiURL, headers)
    .then(response => response.json())
    .catch((err) => {
      console.log(err);
      return [];
    });
};

// Fetch chat messages from a conversation
export const fetchChatDetail = (username, password, peerID, subject) => {
  let apiURL;
  const serverToken = serverConfig.getServerToken();
  if (peerID) {
    apiURL = `${gatewayAPI}/ob/chatmessages/${peerID}?subject=${subject}`;
  } else {
    apiURL = `${gatewayAPI}/ob/chatmessages?limit=&offsetId=&subject=${subject}`;
  }
  const headers = {
    method: 'GET',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(apiURL, headers).then(response => response.json());
};

// Send a chat message
export const sendChat = (username, password, peerIds, subject = '', message) => {
  let apiURL;
  let peerIdPayload;
  const serverToken = serverConfig.getServerToken();
  if (typeof peerIds === 'string') {
    apiURL = `${gatewayAPI}/ob/chat`;
    peerIdPayload = { peerId: peerIds };
  } else {
    apiURL = `${gatewayAPI}/ob/groupchat`;
    peerIdPayload = { peerIds };
  }

  const body = JSON.stringify({
    subject,
    message,
    ...peerIdPayload,
  });

  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
    body,
  };
  return fetch(apiURL, headers).then(response => response.json());
};

// Set Chat As Read
export const setChatAsRead = (username, password, peerID, subject) => {
  let apiURL;
  if (peerID) {
    apiURL = `${gatewayAPI}/ob/markchatasread/${peerID}?subject=${subject}`;
  } else {
    apiURL = `${gatewayAPI}/ob/markchatasread?subject=${subject}`;
  }
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(apiURL, headers).then(response => response.json());
};

export const deleteChatConversation = (username, password, peerID) => {
  const apiURL = `${gatewayAPI}/ob/chatconversation/${peerID}`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'DELETE',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(apiURL, headers).then(response => response.json());
};

