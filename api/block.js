import { gatewayAPI } from './const';
import { makeFetch } from './common';

// Block a store
export const blockNode = (username, password, peerID) => makeFetch({
  url: `${gatewayAPI}/ob/blocknode/${peerID}`,
  method: 'POST',
});

// Unblock a store
export const unblockNode = (username, password, peerID) => makeFetch({
  url: `${gatewayAPI}/ob/blocknode/${peerID}`,
  method: 'DELETE',
});
