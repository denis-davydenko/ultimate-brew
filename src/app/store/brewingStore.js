import { writable, derived } from 'svelte/store';
import { BrewingState } from '../consts';
import { activeStepIndex, steps } from './stepsStore';
import { createTimer } from '../utils';

function createBrewingState() {
  const { subscribe, set } = writable(BrewingState.idle);

  return {
    subscribe,
    start: () => set(BrewingState.brewing),
    cancel: () => set(BrewingState.idle)
  };
}

export const brewingState = createBrewingState();

export const timerState = derived(
  [brewingState, steps],
  ([$brewingState, $steps], set) => {
    const timer = createTimer(0, emit, nextStep);
    let currentStep = null;

    function nextStep() {
      if (currentStep !== $steps[$steps.length - 1]) {
        activeStepIndex.update(index => {
          const newIndex = index + 1;
          currentStep = $steps[newIndex];

          return newIndex;
        });
      } else {
        activeStepIndex.set(null);
        currentStep = null;
        brewingState.cancel();
        return;
      }

      timer.reset(currentStep.duration);
      timer.start();
    }

    function emit(elapsedTimeForStep) {
      if (!currentStep) {
        set({
          elapsedTime: 0,
          elsapsedTimeForStep: 0,
          amount: 0,
          amountForStep: 0
        });
        return;
      }

      const elapsedTime =
        elapsedTimeForStep + currentStep.durationAfter - currentStep.duration;
      const amountForStep =
        (currentStep.amount / currentStep.duration) * elapsedTimeForStep;
      const amount =
        amountForStep + currentStep.amountAfter - currentStep.amount;

      set({
        elapsedTime,
        elapsedTimeForStep: elapsedTimeForStep,
        amount,
        amountForStep
      });
    }

    function brew() {
      activeStepIndex.set(0);
      currentStep = $steps[0];
      timer.reset(currentStep.duration);
      timer.start();
    }

    function reset() {
      activeStepIndex.set(null);
      currentStep = null;
      timer.reset(0);
    }

    switch ($brewingState) {
      case BrewingState.brewing: {
        brew();
        break;
      }
      case BrewingState.idle: {
        reset();
        break;
      }
    }

    return () => {
      reset();
    };
  }
);
