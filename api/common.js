import { serverConfig } from '../utils/server';
import store from '../store';

export function handleFetchErrors(response) {
  // Errors before logging into the server will be ignored, since those don't represent bugs.
  const loggedIn = store.getState().appstate.onboardingStatus === 'loggedIn';
  if (!response.ok && loggedIn) {
    const errMsg = response.statusText || response.reason || '';
    throw Error(`Error calling ${response.url}. Status ${response.status}. ${errMsg}`);
  }
  return response;
}

export function makeFetch(opts) {
  const { url, method = 'GET', body = '', auth = true } = opts;
  const serverAuthHeader = auth ? serverConfig.getAuthHeader() : {};
  const init = {
    method,
    headers: {
      ...serverAuthHeader,
      'Content-Type': 'application/json',
    },
    body,
  };

  return fetch(url, init)
    .then(handleFetchErrors)
    .then(response => (response.json()))
    .catch((error) => {
      throw error;
    });
}


export const makeRequest = (apiURL, isLocal = true) => {
  const authHeader = serverConfig.getAuthHeader();
  const headers = {
    method: 'GET',
    headers: isLocal ? authHeader : {},
  };
  return fetch(
    apiURL,
    headers,
  )
    .then(handleFetchErrors)
    .then(response => (response.json()))
    .catch((err) => {
      console.log(`Error with ${apiURL} is ${err}`);
      return {};
    });
};
