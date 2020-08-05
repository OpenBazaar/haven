import { Platform } from 'react-native';

export const PREVIEWING_CATEGORIES = Platform.select({
  ios: [
    { title: 'Electronics', shortName: 'electronics', categoryName: 'Consumer Electronics' },
    { title: "Women's Clothing", shortName: 'wclothing', categoryName: "Women's Clothing" },
    { title: "Men's Clothing", shortName: 'mclothing', categoryName: "Men's Clothing" },
    { title: 'Toys and Games', shortName: 'toy', categoryName: 'Toys & Hobbies' },
    { title: 'Jewelry', shortName: 'jewelry', categoryName: 'Jewelry & Accessories' },
    { title: 'Tools', shortName: 'tools', categoryName: 'Tools' },
  ],
  android: [
    { title: 'Electronics', shortName: 'electronics', categoryName: 'Consumer Electronics' },
    { title: 'Gift Cards', shortName: 'giftcards', categoryName: 'Gift Cards' },
    { title: "Women's Clothing", shortName: 'wclothing', categoryName: "Women's Clothing" },
    { title: "Men's Clothing", shortName: 'mclothing', categoryName: "Men's Clothing" },
    { title: 'Toys and Games', shortName: 'toy', categoryName: 'Toys & Hobbies' },
    { title: 'Jewelry', shortName: 'jewelry', categoryName: 'Jewelry & Accessories' },
    { title: 'Tools', shortName: 'tools', categoryName: 'Tools' },
  ],
});

export const filteroutCryptoFromListings = (json) => {
  const items = json;
  return items.filter(item => item.contractType !== 'CRYPTOCURRENCY');
};

export const filteroutCryptoFromSearch = (json) => {
  const { results, ...others } = json;
  const { results: items, ...restOfResults } = results;
  return {
    ...others,
    results: {
      ...restOfResults,
      results: items.filter(item => item.data.contractType !== 'CRYPTOCURRENCY'),
    },
  };
};

export const shuffle = (array) => {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};
