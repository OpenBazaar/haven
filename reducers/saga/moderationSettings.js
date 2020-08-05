import { call, put, takeEvery, select } from 'redux-saga/effects';
import { hasIn } from 'lodash';

import { actions } from '../moderationSettings';
import { setModerator, getModerator, updateModerator, unsetModerator } from '../../api/moderators';
import { getUserCredentails } from './sagaSelector';

function* fetchSettings(action) {
  const { username, password } = yield select(getUserCredentails);
  const result = yield call(getModerator, username, password);
  yield put({ type: actions.setModerationSettings, payload: result });
}

function* updateSettings(action) {
  const { username, password } = yield select(getUserCredentails);
  const result = yield call(updateModerator, username, password, action.payload);
  if (result.success == false) {
    const result = yield call(setModerator, username, password, action.payload);
  }
}

function* unsetSettings(action) {
  const { username, password } = yield select(getUserCredentails);
  yield call(unsetModerator, username, password);
}

const moderationSettings = function* Search() {
  yield takeEvery(actions.fetchModerationSettings, fetchSettings);
  yield takeEvery(actions.updateModerationSettings, updateSettings);
  yield takeEvery(actions.unsetModerationSettings, unsetSettings);
};

export default moderationSettings;
