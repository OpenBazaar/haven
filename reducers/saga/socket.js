/* eslint-disable require-yield */
import { fork, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { websocketHost } from '../../api/const';
import { incomingSocketMessage } from '../../reducers/socket';
import { serverConfig } from '../../utils/server';

function connect() {
  const socketUrl = `ws://${websocketHost}/ws`;
  return new Promise((resolve) => {
    setTimeout(() => {
      const ws = new global.WebSocket(socketUrl, '', { headers: serverConfig.getAuthHeader() });
      ws.onopen = () => {
        resolve(ws);
      };
    }, 2000);
  });
}

function* subscribe(socket) {
  return eventChannel((emitter) => {
    const onMessage = (e) => {
      let parsed = null;

      try {
        parsed = JSON.parse(e.data);
      } catch (e) {
        console.warn(`Unable to process an incoming socket message: ${e.stack}`);
      }

      return emitter(incomingSocketMessage({ data: parsed }));
    };

    socket.addEventListener('message', onMessage);

    return () => socket.removeEventListener('message', onMessage);
  });
}

function* read(socket) {
  try {
    const channel = yield call(subscribe, socket);
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (err) {
    console.error(err);
  }
}

export default function* eventSaga() {
  const socket = yield call(connect);
  yield fork(read, socket);
}
