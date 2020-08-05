import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchFeatured: 'STORE/FETCH_FEATURED',
  setFeatured: 'STORE/SET_FEATURED',
  setFeaturedLoading: 'STORE/SET_FEATURED_LOADING',
};

export const fetchFeatured = createAction(actions.fetchFeatured);
export const setFeaturedLoading = createAction(actions.setFeaturedLoading);

const initialState = {
  data: [],
  loading: false,
};

export default handleActions({
  [actions.setFeatured]: (state, action) => ({
    loading: state.loading,
    data: action.payload,
  }),
  [actions.setFeaturedLoading]: (state, action) => ({
    loading: action.payload,
    data: state.data,
  }),
}, initialState);
