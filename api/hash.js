import { gatewayAPI } from './const';
import { makeFetch } from './common';

// Block a store
export const getHashCode = content => makeFetch({
  url: `${gatewayAPI}/ob/hashmessage/`,
  method: 'POST',
  body: JSON.stringify({ content }),
});
