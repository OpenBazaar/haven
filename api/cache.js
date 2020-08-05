
import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

export const purgeCache = () => {
  const apiURL = `${gatewayAPI}/ob/purgecache`;
  const headers = {
    method: 'POST',
    headers: serverConfig.getAuthHeader(),
  };
  return fetch(apiURL, headers).then(response => response.json());
};
