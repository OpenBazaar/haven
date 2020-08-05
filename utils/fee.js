export const DEFAULT_FEE_LEVELS = [
  {
    label: 'Super Economic',
    value: 'superEconomic',
    description: 'Cheapest, Slowest',
    fee: 0,
  },
  {
    label: 'Economic',
    value: 'economic',
    description: 'Cheap, Slow',
    fee: 0,
  },
  {
    label: 'Normal',
    value: 'normal',
    description: 'Average fee and wait time',
    fee: 0,
  },
  {
    label: 'Priority',
    value: 'priority',
    description: 'Most Expensive, Fastest',
    fee: 0,
  },
];

export const getFeeLevelDescription = (level) => {
  switch (level) {
    case 'superEconomic':
      return 'Cheapest, Slowest';
    case 'priority':
      return 'Most Expensive, Fastest';
    case 'economic':
      return 'Cheap, Slow';
    case 'normal':
    default:
      return 'Average fee and wait time';
  }
};
