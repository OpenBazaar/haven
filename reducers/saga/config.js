import { call, put, takeEvery } from 'redux-saga/effects';

import { actions } from '../config';

import { getConfig } from '../../api/onboarding';

export function* getConfiguration() {
  try {
    const config = yield call(getConfig);
    yield put({
      type: actions.setConfiguration,
      payload: config,
    });
  } catch (err) {
    console.log('Get Configuration Failed:', err);
  }
}

export default function* Chat() {
  yield takeEvery(actions.getConfiguration, getConfiguration);
}
