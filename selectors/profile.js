import { get } from 'lodash';

export const getUserPeerID = state => get(state, 'profile.data.peerID');
export const getBlockedNodes = state => state.settings.blockedNodes || [];
