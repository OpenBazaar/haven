import { handleActions, createAction } from 'redux-actions';

import defaultRates from '../config/exchangeRates.json';

export const actions = {
  fetchExchangeRate: 'EXCHANGE_RATE/FETCH',
  setExchangeRate: 'EXCHANGE_RATE/SET',
};

export const fetchExchangeRate = createAction(actions.fetchExchangeRate);

const initialState = {
  rates: defaultRates,
};

export default handleActions({
  [actions.setExchangeRate]: (state, { payload }) => ({
    rates: payload,
  }),
}, initialState);
