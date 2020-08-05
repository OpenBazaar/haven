import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchSettings: 'SETTINGS/FETCH',
  setSettings: 'SETTINGS/SET',
  patchSettingsRequest: 'SETTINGS/REQUEST',
  patchSettingsSuccess: 'SETTINGS/SUCCESS',
  setSettingsFailure: 'SETTINGS/SET_FAILURE',
  clearSettingsError: 'SETTINGS/CLEAR_ERROR',
  addShippingAddress: 'SETTINGS/ADD_SHIPPING_ADDRESS',
  blockNode: 'SETTINGS/BLOCK_NODE',
  unblockNode: 'SETTINGS/UNBLOCK_NODE',
  addBlockedNode: 'SETTINGS/ADD_BLOCKED_NODE',
  removeUnblockedNode: 'SETTINGS/REMOVE_UNBLOCKED_NODE',
};

export const fetchSettings = createAction(actions.fetchSettings);
export const setSettings = createAction(actions.setSettings);
export const patchSettingsRequest = createAction(actions.patchSettingsRequest);
export const patchSettingsSuccess = createAction(actions.patchSettingsSuccess);
export const setSettingsFailure = createAction(actions.setSettingsFailure);
export const clearSettingsError = createAction(actions.clearSettingsError);
export const addShippingAddress = createAction(actions.addShippingAddress);
export const blockNode = createAction(actions.blockNode);
export const unblockNode = createAction(actions.unblockNode);

const initialState = {
  blockedNodes: [],
  country: 'UNITED_STATES',
  localCurrency: 'USD',
  mispaymentBuffer: 1,
  paymentDataInQR: true,
  refundPolicy: '',
  shippingAddresses: [
    {
      name: 'Worldwide',
      type: 'FIXED_PRICE',
      regions: ['ALL'],
      services: [
        {
          name: 'Standard',
          price: 0,
          estimatedDelivery: '3 days',
          additionalItemPrice: 0,
        },
      ],
    },
  ],
  showNotifications: true,
  showNsfw: true,
  smtpSettings: {},
  storeModerators: [],
  termsAndConditions: '',
  version: '',
  settingsError: null,
};

export default handleActions(
  {
    [actions.setSettings]: (state, action) => ({ blockedNodes: [], ...action.payload }),
    [actions.patchSettingsRequest]: state => ({ ...state, settingsError: null }),
    [actions.patchSettingsSuccess]: (state, action) => ({ ...state, ...action.payload }),
    [actions.setSettingsFailure]: (state, action) => ({ ...state, settingsError: action.error }),
    [actions.clearSettingsError]: state => ({ ...state, settingsError: null }),
    [actions.addShippingAddress]: (state, action) => ({
      ...state,
      shippingAddresses: [action.payload, ...state.shippingAddresses],
    }),
    [actions.addBlockedNode]: (state, action) => ({
      ...state,
      blockedNodes: [...new Set([...state.blockedNodes, action.payload])],
    }),
    [actions.removeUnblockedNode]: (state, action) => ({
      ...state,
      blockedNodes: state.blockedNodes.filter(node => node !== action.payload),
    }),
  },
  initialState,
);
