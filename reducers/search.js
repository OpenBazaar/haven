import { createAction, handleActions } from 'redux-actions';

import { actions as AppStateActions } from './appstate';

export const actions = {
  resetSearch: 'SEARCH/RESET',
  doSearch: 'SEARCH/DO_SEARCH',
  doSearchUser: 'SEARCH/DO_SEARCH_USER',
  appendSearch: 'SEARCH/APPEND_SEARCH',
  appendUserSearch: 'SEARCH/APPEND_USER_SEARCH',
  setSearchResult: 'SEARCH/SET_RESULT',
  setUserSearchResult: 'SEARCH/SET_USER_RESULT',
  setKeyword: 'SEARCH/SET_KEYWORD',
  updateFilter: 'SEARCH/UPDATE_FILTER',
  clearFilter: 'SEARCH/CLEAR_FILTER',
};

export const doSearch = createAction(actions.doSearch);
export const doSearchUser = createAction(actions.doSearchUser);
export const appendSearch = createAction(actions.appendSearch);
export const appendUserSearch = createAction(actions.appendUserSearch);
export const setKeyword = createAction(actions.setKeyword);
export const setSearchResult = createAction(actions.setSearchResult);
export const setUserSearchResult = createAction(actions.setUserSearchResult);
export const resetSearch = createAction(actions.resetSearch);
export const updateFilter = createAction(actions.updateFilter);
export const clearFilter = createAction(actions.clearFilter);

const initialState = {
  search_result: [],
  user_search_result: [],
  more_page: true,
  user_more_page: true,
  cur_page: 0,
  user_cur_page: 0,
  total: 0,
  total_user: 0,
  search_fetched: true,
  loading: false,
  loading_user: false,
  filter: {
    shipping: 'any',
    rating: 0,
    type: 'any',
    sortBy: 'relevance',
    nsfw: false,
    conditions: 'any',
    acceptedCurrencies: 'any',
  },
  didSearch: false,
};

export default handleActions(
  {
    [actions.doSearch]: state => ({
      ...state,
      search_result: [],
      more_page: true,
      cur_page: 0,
      total: 0,
      search_fetched: false,
      loading: true,
      didSearch: true,
    }),
    [actions.doSearchUser]: state => ({
      ...state,
      user_search_result: [],
      user_more_page: true,
      user_cur_page: 0,
      total_user: 0,
      user_search_fetched: false,
      loading_user: true,
      didSearch: true,
    }),
    [actions.setSearchResult]: (state, { payload: { morePages, results, total } }) => {
      const search_result = state.search_result.concat(results);
      return {
        ...state,
        search_result,
        more_page: morePages,
        total: total || state.total,
        search_fetched: true,
        cur_page: state.cur_page + 1,
        loading: false,
      };
    },
    [actions.setUserSearchResult]: (state, action) => {
      const user_search_result = state.user_search_result.concat(action.payload.results);
      return {
        ...state,
        user_search_result,
        user_more_page: action.payload.morePages,
        total_user: action.payload.total,
        user_search_fetched: true,
        user_cur_page: state.user_cur_page + 1,
        loading_user: false,
      };
    },
    [actions.updateFilter]: (state, action) => ({ ...state, filter: action.payload }),
    [actions.clearFilter]: state => ({ ...state, filter: initialState.filter, didSearch: false }),
    [AppStateActions.setKeyword]: state => ({
      ...state,
      filter: {
        shipping: 'any',
        rating: 0,
        type: 'any',
        sortBy: 'relevance',
        nsfw: false,
        conditions: 'any',
        acceptedCurrencies: 'any',
      },
    }),
    [AppStateActions.setCategory]: state => ({
      ...state,
      filter: {
        shipping: 'any',
        rating: 0,
        type: 'any',
        sortBy: 'relevance',
        nsfw: false,
        conditions: 'any',
        acceptedCurrencies: 'any',
      },
    }),
  },
  initialState,
);
