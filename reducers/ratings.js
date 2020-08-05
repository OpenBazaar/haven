import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchRatings: 'RATINGS/FETCH',
  setRatings: 'RATINGS/FETCH_SUCCESS',
  fetchRatingsFailure: 'RATINGS/FETCH_FAILURE',
};

export const fetchRatings = createAction(actions.fetchRatings);

const initialState = { data: {}, status: '' };

export default handleActions(
  {
    [actions.fetchRatings]: (state, { type }) => ({ ...state, status: type }),
    [actions.setRatings]: (state, { payload, type }) => {
      const { reference, ...ratingsData } = payload;
      const data = { ...state.data };
      data[reference] = ratingsData;
      return ({ ...state, data, type });
    },
    [actions.fetchRatingsFailure]: (state, { type }) => ({ ...state, status: type }),
  },
  initialState,
);
