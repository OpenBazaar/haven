
import { gatewayAPI } from './const';
import { serverConfig } from '../utils/server';

export const signMessage = (content) => {
  const apiURL = `${gatewayAPI}/ob/signmessage`;
  const headers = {
    method: 'POST',
    headers: serverConfig.getAuthHeader(),
    body: JSON.stringify({ content }),
  };
  return fetch(apiURL, headers).then(response => response.json());
};
