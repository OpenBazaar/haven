import { Platform } from 'react-native';
import { isEmpty } from 'lodash';

import {
  searchAPI,
  gatewayAPI,
  obEthGatewayAPI,
  featuredListingAPI,
  bestsellersListingAPI,
  gamingListingAPI,
  munchiesListingAPI,
  devicesListingAPI,
  trendListingAPI,
} from './const';
import { serverConfig } from '../utils/server';
import { filteroutCryptoFromSearch } from '../utils/listings';

const base64 = require('base-64');

const handleErrorWithEmptyArray = (err) => {
  console.warn(err);
  return [];
};

// Fetch the latest listings from OB1 search
export const fetchTrendingListing = () => {
  const apiURL = `${searchAPI}/listings/fresh/3`;
  return fetch(apiURL)
    .then(response => response.json());
};

// Fetch the top rated listings from OB1 search
export const fetchFeaturedListing = () => {
  const apiURL = `${searchAPI}/listings/hot/24/6`;
  return fetch(apiURL)
    .then(response => response.json());
};

export const fetchBestsellersListing = () => fetch(bestsellersListingAPI)
  .then(response => response.json());

export const fetchGamingListing = () => fetch(gamingListingAPI)
  .then(response => response.json());

export const fetchMunchiesListing = () => fetch(munchiesListingAPI)
  .then(response => response.json());

export const fetchDevicesListing = () => fetch(devicesListingAPI)
  .then(response => response.json());

// Fetch an index of listings from a store
export const getListings = (username, password, peerID = '', countToPull = 10000) => {
  let apiURL = '';
  if (isEmpty(peerID)) {
    apiURL = `${gatewayAPI}/ob/listings`;
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
      .catch(handleErrorWithEmptyArray);
  } else {
    apiURL = `${searchAPI}/listings/search?q=*&peerID=${peerID}&nsfw=false&network=mainnet&ps=${countToPull}`;
    if (Platform.OS === 'ios') {
      apiURL = `${apiURL}&mobile`;
    }
    const headers = { method: 'GET' };
    return fetch(apiURL, headers)
      .then(response => response.json())
      .then(filteroutCryptoFromSearch)
      .then(items => items.results.results.map(item => item.data))
      .catch(handleErrorWithEmptyArray);
  }
};

// Fetch an individual listing
export const getListing = (username, password, slug, peerID = '') => {
  let apiURL = '';
  const timestamp = Date.now();
  if (isEmpty(peerID)) {
    apiURL = `${gatewayAPI}/ob/listing/${slug}?`;
  } else {
    apiURL = `${obEthGatewayAPI}/ob/listing/${peerID}/${slug}?usecache=true&${timestamp}`;
  }
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'GET',
    headers: isEmpty(peerID) ? {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    } : {},
  };
  return fetch(apiURL, headers).then(response => response.json());
};

export const getListingFromHash = (username, password, hash) => {
  const apiURL = `${gatewayAPI}/ob/listing/ipfs/${hash}`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'GET',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    },
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => { reject('timeout'); }, 3000);
    fetch(apiURL, headers)
      .then(response => response.json())
      .then((data) => { resolve({ ...data, hash }); })
      .catch((err) => { reject(err); });
  });
};

// Fetch the ratings of a listing
export const getRatings = (username, password, slug, peerID) => {
  let apiURL = '';
  let headers = {};
  const timestamp = Date.now();
  if (!isEmpty(peerID) && !isEmpty(slug)) {
    apiURL = `${obEthGatewayAPI}/ob/ratings/${peerID}/${slug}?usecache=true&${timestamp}`;
  } else if (!isEmpty(peerID)) {
    apiURL = `${obEthGatewayAPI}/ob/ratings/${peerID}?usecache=true&${timestamp}`;
  } else if (!isEmpty(slug)) {
    apiURL = `${gatewayAPI}/ob/ratings/${slug}`;
    const serverToken = serverConfig.getServerToken();
    headers = {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    };
  } else {
    apiURL = `${gatewayAPI}/ob/ratings`;
    const serverToken = serverConfig.getServerToken();
    headers = {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
    };
  }

  const requestHeader = {
    method: 'GET',
    headers,
  };
  return fetch(apiURL, requestHeader).then(response => response.json());
};

// Fetch a specific rating
export const getRating = (username, password, nodeId) => {
  const timestamp = Date.now();
  const apiURL = `${obEthGatewayAPI}/ob/rating/${nodeId}?usecache=true&${timestamp}`;
  const headers = {
    method: 'GET',
  };
  return fetch(apiURL, headers).then(response => response.json());
};

// Create a listing
export const createListing = (username, password, productDetails) => {
  const apiURL = `${gatewayAPI}/ob/listing`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'POST',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productDetails),
  };
  return fetch(apiURL, headers).then(response => response.json());
};

// Update a listing
export const updateListing = (username, password, productDetails) => {
  const apiURL = `${gatewayAPI}/ob/listing`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'PUT',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productDetails),
  };
  return fetch(apiURL, headers).then(response => response.json());
};

// Delete a listing
export const deleteListing = (username, password, slug) => {
  const apiURL = `${gatewayAPI}/ob/listing/${slug}`;
  const serverToken = serverConfig.getServerToken();
  const headers = {
    method: 'DELETE',
    headers: {
      authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      cookie: `OpenBazaar_Auth_Cookie=${serverToken}`,
      'Content-Type': 'application/json',
    },
  };
  return fetch(apiURL, headers).then(response => response.json());
};

export const reportListing = (peerID, slug, reason) => {
  const apiURL = `${searchAPI}/reports`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ peerID, slug, reason, report_type: 'listing' }),
  };
  return fetch(apiURL, headers).then(response => response.json());
};
