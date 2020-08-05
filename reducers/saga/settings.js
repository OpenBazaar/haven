import { call, put, takeEvery, select } from 'redux-saga/effects';

import { actions as profilesActions } from '../profiles';
import { actions } from '../settings';

import { getSettings, patchSettings } from '../../api/settings';
import * as profilesApi from '../../api/profiles';
import { getUserCredentails } from './sagaSelector';
import { blockNode, unblockNode } from '../../api/block';

function* fetchStoreSettings() {
  try {
    const result = yield call(getSettings);
    const { blockedNodes = [] } = result;
    if (blockedNodes.length > 0) {
      const profiles = yield call(profilesApi.getProfiles, blockedNodes);
      if (Array.isArray(profiles)) {
        yield put({
          type: profilesActions.setProfiles,
          payload: profiles.map(profile => ({ peerID: profile.peerID, ...profile.profile })),
        });
      }
    }
    yield put({ type: actions.setSettings, payload: result });
  } catch (err) {
    // console.log(`Error in fetchStoreSettings saga: ${err}`);
  }
}

export function* patchSettingsRequest(action) {
  const { username, password } = yield select(getUserCredentails);
  try {
    yield call(patchSettings, action.payload, username, password);
    yield put({ type: actions.patchSettingsSuccess, payload: action.payload });
  } catch (error) {
    yield put({ type: actions.setSettingsFailure, error: error.message });
  }
}

function* block(action) {
  const { username, password } = yield select(getUserCredentails);
  try {
    yield call(blockNode, username, password, action.payload);
    yield put({ type: actions.addBlockedNode, payload: action.payload });
  } catch (error) {
    yield put({ type: actions.setSettingsFailure, error: error.message });
  }
}

function* unblock(action) {
  const { username, password } = yield select(getUserCredentails);
  try {
    yield call(unblockNode, username, password, action.payload);
    yield put({ type: actions.removeUnblockedNode, payload: action.payload });
  } catch (error) {
    yield put({ type: actions.setSettingsFailure, error: error.message });
  }
}

const SettingsSaga = function* Search() {
  yield takeEvery(actions.fetchSettings, fetchStoreSettings);
  yield takeEvery(actions.patchSettingsRequest, patchSettingsRequest);
  yield takeEvery(actions.blockNode, block);
  yield takeEvery(actions.unblockNode, unblock);
};

export default SettingsSaga;
