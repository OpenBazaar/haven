import { createAction } from 'redux-actions';

export const actions = {
  incomingSocketMessage: 'SOCKET/INCOMING_SOCKET_MESSAGE',
};

export const incomingSocketMessage = createAction(actions.incomingSocketMessage);
