import { promoAPI } from './const';

export const fetchPromo = () =>
  fetch(`${promoAPI}`)
    .then(response => (response.json()));
