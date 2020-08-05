import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

const base64 = require('base-64');

// Estimate the cost of a listing
export const getEstimation = (username, password, checkoutData) => {
  const apiURL = `${gatewayAPI}/ob/estimatetotal`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
    body: JSON.stringify(checkoutData),
  };
  return fetch(apiURL, headers)
    .then(response => response.json())
    .catch(err => ({ success: false, err }));
};

// Checkout Breakdown
export const getCheckoutBreakdown = (username, password, checkoutData) => {
  const apiURL = `${gatewayAPI}/ob/checkoutbreakdown`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
    body: JSON.stringify(checkoutData),
  };
  return fetch(apiURL, headers)
    .then(response => response.json())
    .catch(err => ({ success: false, err }));
};

// Create a purchase order
export const purchaseItem = (username, password, checkoutData) => {
  const apiURL = `${gatewayAPI}/ob/purchase`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
    body: JSON.stringify(checkoutData),
  };
  return fetch(apiURL, headers).then(response => response.json());
};
