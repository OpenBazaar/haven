import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

const base64 = require('base-64');

export const getConfig = () => {
  const apiURL = `${gatewayAPI}/ob/config`;
  const headers = {
    method: 'GET',
    headers: serverConfig.getAuthHeader(),
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};

export const createProfile = (name) => {
  const body = {
    handle: '',
    name,
    location: '',
    about: '',
    shortDescription: '',
    contactInfo: {
      website: '',
      email: '',
      phoneNumber: '',
    },
    nsfw: false,
    vendor: true,
    moderator: false,
    colors: {
      primary: '#000000',
      secondary: '#FFD700',
      text: '#ffffff',
      highlight: '#123ABC',
      highlightText: '#DEAD00',
    },
  };

  const apiURL = `${gatewayAPI}/ob/profile`;
  const headers = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: serverConfig.getAuthHeader(),
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};

export const createSettings = (
  country, localCurrency, storeModerators = [],
) => {
  const body = {
    paymentDataInQR: true,
    showNotifications: true,
    showNsfw: true,
    shippingAddresses: [],
    localCurrency,
    country,
    language: 'English',
    termsAndConditions: '',
    refundPolicy: '',
    blockedNodes: [],
    storeModerators,
    notifications: {
      promotions: true,
      announcements: true,
      giveaways: true,
      chat: true,
      orders: true,
      likes: true,
      comments: true,
    },
  };

  const apiURL = `${gatewayAPI}/ob/settings`;
  const headers = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: serverConfig.getAuthHeader(),
  };
  return fetch(
    apiURL,
    headers,
  ).then(response => (response.json()));
};
