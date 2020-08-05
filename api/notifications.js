import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

const base64 = require('base-64');

// Fetch notifications
export const fetchNotifications = (username, password, limit, offsetId) => {
  const apiURL = `${gatewayAPI}/ob/notifications?limit=${limit}&offsetId=${offsetId}`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'GET',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};

// Mark a notification as 'read'
export const markAsRead = (username, password, notifId) => {
  const apiURL = `${gatewayAPI}/ob/marknotificationasread/${notifId}`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};

// Mark all notifications as 'read'
export const markAsReadAll = (username, password) => {
  const apiURL = `${gatewayAPI}/ob/marknotificationsasread`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};

// Delete a notification
export const deleteNotification = (username, password, notifId) => {
  const apiURL = `${gatewayAPI}/ob/notifications/notifId`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'DELETE',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};
