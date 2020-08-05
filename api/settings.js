import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';
import { handleFetchErrors, makeFetch } from './common';

// Fetch Settings
export const getSettings = () => {
  const headers = {
    method: 'GET',
    headers: serverConfig.getAuthHeader(),
  };
  return fetch(
    `${gatewayAPI}/ob/settings`,
    headers,
  )
    .then(handleFetchErrors)
    .then((response) => {
      if (response.status === 404) {
        return null;
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      throw error;
    });
};

/* As far as I can tell, this is never actually used. - JJ
// Create Settings
export const setSettings = (settings, username, password) => {
  const headers = {
    method: 'POST',
    headers: {
      ...serverConfig.getAuthHeader(username, password),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  };
  return fetch(`${gatewayAPI}/ob/settings`, headers)
    .then(handleFetchErrors)
    .then(response => (response.json()));
};
 */

/* As far as I can tell, this is not actually used. - JJ
// Update Settings
export const updateSettings = (settings, username, password) => {
  const headers = {
    method: 'PUT',
    headers: {
      ...serverConfig.getAuthHeader(username, password),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  };
  return fetch(`${gatewayAPI}/ob/settings`, headers)
    .then(handleFetchErrors)
    .then(response => (response.json()));
};
 */

// Modify Settings
export const patchSettings = settings => makeFetch({
  url: `${gatewayAPI}/ob/settings`,
  method: 'PATCH',
  body: JSON.stringify(settings),
});
