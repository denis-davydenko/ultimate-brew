import { AMOUNT_PLACEHOLDER } from './consts';

export const RECIPES = [
  {
    id: 1,
    name: 'The Ultimate V60',
    ratio: 1 / 16.666667,
    steps: [
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water and wait to bloom`,
        description: null,
        duration: 5,
        valuePercentOnStep: 12
      },
      {
        message: 'Swirl for 5 seconds',
        description:
          'Swirl the brewer until the ground look well mixed with the water.',
        duration: 5,
        valuePercentOnStep: 0
      },
      {
        message: 'Wait for 35 sec',
        description: null,
        duration: 35,
        valuePercentOnStep: 0
      },
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
        description: null,
        duration: 30,
        valuePercentOnStep: 48
      },
      {
        message: 'Wait for 5 seconds',
        description: null,
        duration: 5,
        valuePercentOnStep: 0
      },
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
        description: null,
        duration: 30,
        valuePercentOnStep: 40
      },
      {
        message: 'Stir for 5 seconds',
        description: null,
        duration: 5,
        valuePercentOnStep: 0
      },
      {
        message: 'Wait until it is ready',
        description: null,
        duration: 15,
        valuePercentOnStep: 0
      }
    ]
  },
  {
    id: 2,
    name: '4:6 by Tetsu Kasuya',
    ratio: 1 / 15,
    steps: [
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water and wait to bloom`,
        description: null,
        duration: 5,
        valuePercentOnStep: 20
      },
      {
        message: `Wait for 40 seconds to bloom`,
        description: null,
        duration: 40,
        valuePercentOnStep: 0
      },
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
        description: null,
        duration: 5,
        valuePercentOnStep: 20
      },
      {
        message: `Wait for 40 seconds`,
        description: null,
        duration: 40,
        valuePercentOnStep: 0
      },
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
        description: null,
        duration: 5,
        valuePercentOnStep: 20
      },
      {
        message: `Wait for 40 seconds`,
        description: null,
        duration: 40,
        valuePercentOnStep: 0
      },
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
        description: null,
        duration: 5,
        valuePercentOnStep: 20
      },
      {
        message: `Wait for 40 seconds`,
        description: null,
        duration: 40,
        valuePercentOnStep: 0
      },
      {
        message: `Pour ${AMOUNT_PLACEHOLDER}g of water`,
        description: null,
        duration: 5,
        valuePercentOnStep: 20
      },
      {
        message: 'Wait until it is ready',
        description: null,
        duration: 15,
        valuePercentOnStep: 0
      }
    ]
  }
];
