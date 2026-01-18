import { derived } from 'svelte/store';
import { appState, AppState } from './appStateStore';
import { activeStepIndex, steps } from './stepsStore';
import { createTimer } from '../utils';

export const brewingState = derived(
  [appState, steps],
  ([$appState, $steps], set) => {
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
        appState.stop();
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
      timer.cancel();
    }

    switch ($appState) {
      case AppState.brewing: {
        brew();
        break;
      }
      case AppState.idle: {
        reset();
        break;
      }
    }

    return () => {
      reset();
    };
  }
);
