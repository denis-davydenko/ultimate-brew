import { derived, writable } from 'svelte/store';
import { settings } from './settingsStore';
import { AMOUNT_PLACEHOLDER } from './../consts';

export const STEPS = [
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
];

function formatMessage(step, settings) {
  return step.message.replace(
    AMOUNT_PLACEHOLDER,
    ((step.valuePercentOnStep / 100) * settings.water).toFixed(1)
  );
}

export const steps = derived(settings, $settings => {
  return STEPS.reduce((acc, step, index) => {
    const prevStep =
      index > 0 ? acc[index - 1] : { amountAfter: 0, durationAfter: 0 };
    const amount = (step.valuePercentOnStep / 100) * $settings.water;

    acc.push({
      ...step,
      amount,
      durationAfter: step.duration + prevStep.durationAfter,
      amountAfter: amount + prevStep.amountAfter,
      message: formatMessage(step, $settings)
    });

    return acc;
  }, []);
});

export const activeStepIndex = writable(null);

export const activeStep = derived(
  [steps, activeStepIndex],
  ([$steps, $activeStepIndex]) => {
    if ($activeStepIndex === null) {
      return null;
    }

    return $steps[$activeStepIndex] || null;
  }
);
