import { take } from 'lodash';

import { promoAPI } from './const';

import { shuffle } from '../utils/listings';

export const fetchFeatured = () =>
  fetch(`${promoAPI}`)
    .then(response => (response.json()))
    .then(data => take(shuffle(data.filter(({ peerid }) => peerid !== '').map(({ peerid }) => peerid)), 4),
    );
