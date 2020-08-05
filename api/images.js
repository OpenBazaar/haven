import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

const base64 = require('base-64');

// Upload an image
export const uploadImage = (username, password, image) => {
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([image]),
  };
  return fetch(
    `${gatewayAPI}/ob/images`,
    headers,
  ).then(response => (response.json()))
    .catch((err) => {
      console.log(err);
      return [];
    });
};
