import { derived, writable } from 'svelte/store';
import { settings } from './settingsStore';
import { selectedRecipe } from './recipeStore';
import { AMOUNT_PLACEHOLDER } from '../consts';
import { playSound } from '../utils';

function formatMessage(step, settings) {
  return step.message.replace(
    AMOUNT_PLACEHOLDER,
    ((step.valuePercentOnStep / 100) * settings.water).toFixed(1)
  );
}

export const steps = derived(
  [settings, selectedRecipe],
  ([$settings, $selectedRecipe]) => {
    if (!$selectedRecipe) {
      return [];
    }

    return $selectedRecipe.steps.reduce((acc, step, index) => {
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
  }
);

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

activeStepIndex.subscribe(async index => {
  if (index == null) {
    return;
  }

  await playSound();
});
