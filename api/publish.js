
import { gatewayAPI, searchAPI } from './const';
import { serverConfig } from '../utils/server';

const base64 = require('base-64');

export const publish = (username, password) => {
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
      'Content-Type': 'application/json',
    },
  };
  return fetch(
    `${gatewayAPI}/ob/publish`,
    headers,
  ).then(response => (response.json()))
    .catch(err => (err));
};

export const ingestPeer = (peerID, body) => {
  const headers = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${searchAPI}/ipns/${peerID}`, headers)
    .then(response => (response.json()))
    .catch(err => (err));
};

export const resolveIpns = (peerID, username, password) => {
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'GET',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${gatewayAPI}/ob/resolveipns`, headers)
    .then(response => (response.json()))
    .catch(err => err);
};
