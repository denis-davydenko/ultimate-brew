export const DEFAULT_SETTINGS = { coffee: 18, water: 305 };

export const RATIO = 1 / 17;

export const ONE_SEC = 1000;

export const AMOUNT_PLACEHOLDER = '{amount}';

export const STEPS = [
  {
    message: `Pour ${AMOUNT_PLACEHOLDER}g of water and wait to bloom`,
    description: null,
    duration: 5 * ONE_SEC,
    valuePercentOnStep: 12
  },
  {
    message: 'Prepare the following',
    description:
      'Swirl the brewer until the ground look well mixed with the water.',
    duration: 5 * ONE_SEC,
    valuePercentOnStep: null
  },
  {
    message: 'Wait for 35 sec',
    description: null,
    duration: 35 * ONE_SEC,
    valuePercentOnStep: null
  },
  {
    message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
    description: null,
    duration: 30 * ONE_SEC,
    valuePercentOnStep: 48
  },
  {
    message: 'Wait for 5 seconds',
    description: null,
    duration: 5 * ONE_SEC,
    valuePercentOnStep: null
  },
  {
    message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
    description: null,
    duration: 30 * ONE_SEC,
    valuePercentOnStep: 40
  },
  {
    message: 'Stir for 5 seconds',
    description: null,
    duration: 5 * ONE_SEC,
    valuePercentOnStep: null
  },
  {
    message: 'Wait until it is ready',
    description: null,
    duration: 15 * ONE_SEC,
    valuePercentOnStep: null
  }
];
