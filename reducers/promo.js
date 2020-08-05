import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchPromo: 'PRODUCT/FETCH_PROMO',
  setPromo: 'PRODUCT/SET_PROMO',
  setPromoLoading: 'PRODUCT/SET_PROMO_LOADING',
};

export const fetchPromo = createAction(actions.fetchPromo);
export const setPromoLoading = createAction(actions.setPromoLoading);

const initialState = {
  data: [],
  loading: false,
};

export default handleActions({
  [actions.fetchPromo]: state => ({
    data: [],
    loading: true,
  }),
  [actions.setPromo]: (state, action) => ({
    loading: false,
    data: action.payload,
  }),
  [actions.setPromoLoading]: (state, action) => ({
    loading: action.payload,
    data: state.data,
  }),
}, initialState);
