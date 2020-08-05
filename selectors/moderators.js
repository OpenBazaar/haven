import { createSelector } from 'reselect';

export const moderatorsSelector = state => state.moderators;

export const filterModerators = createSelector(
  moderatorsSelector,
  moderators => filteringModerators =>
    filteringModerators.filter(moderator => moderators.find(peerID => moderator === peerID)),
);
