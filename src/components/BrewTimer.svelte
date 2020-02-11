<script>
  import { onMount, onDestroy } from 'svelte';
  import { STEPS, BrewingState } from './consts';
  import { brewingState, activeStepIndex, settings } from './store';
  import { formatTime } from './utils';

  let lastTime = window.performance.now();
  let frame;
  let steps = [];
  let activeStep = null;
  let elapsedForStep = 0;
  let amountOnStep = 0;
  let time = '';
  let amount = 0;

  onMount(() => {
    steps = STEPS.reduce((acc, step, index) => {
      const prevStep =
        index > 0 ? acc[index - 1] : { amountAfter: 0, durationAfter: 0 };
      const amount = (step.valuePercentOnStep / 100) * $settings.water;

      acc.push({
        duration: step.duration,
        durationAfter: step.duration + prevStep.durationAfter,
        amount,
        amountAfter: amount + prevStep.amountAfter
      });

      return acc;
    }, []);
  });

  function timerTick() {
    frame = requestAnimationFrame(timerTick);

    if (activeStep.duration - elapsedForStep <= 0) {
      cancelAnimationFrame(frame);
      nextStep();
    }

    const time = window.performance.now();

    elapsedForStep += Math.min(
      time - lastTime,
      activeStep.duration - elapsedForStep
    );
    lastTime = time;

    amountOnStep = (activeStep.amount / activeStep.duration) * elapsedForStep;
  }

  function nextStep() {
    if ($activeStepIndex !== steps.length - 1) {
      activeStepIndex.set($activeStepIndex + 1);
    } else {
      activeStepIndex.set(null);
      return;
    }

    activeStep = steps[$activeStepIndex];

    lastTime = window.performance.now();
    elapsedForStep = 0;

    timerTick();
  }

  function reset() {
    elapsedForStep = 0;
    activeStepIndex.set(null);
    cancelAnimationFrame(frame);
  }

  function pause() {
    cancelAnimationFrame(frame);
  }

  function brew() {
    if (!$activeStepIndex) {
      activeStepIndex.set(0);
      activeStep = steps[$activeStepIndex];
    }

    lastTime = window.performance.now();
    timerTick();
  }

  onDestroy(() => {
    reset();
  });

  $: {
    switch ($brewingState) {
      case BrewingState.brewing: {
        brew();
        break;
      }
      case BrewingState.idle: {
        reset();
        break;
      }
      case BrewingState.paused: {
        pause();
        break;
      }
    }
  }

  $: time = activeStep
    ? formatTime(
        elapsedForStep + activeStep.durationAfter - activeStep.duration
      )
    : formatTime(0);

  $: amount = activeStep
    ? (amountOnStep + activeStep.amountAfter - activeStep.amount).toFixed(1)
    : 0;
</script>

<style>
  h1,
  h2 {
    text-align: center;
    margin-top: 0;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    color: var(--red-color);
  }
</style>

{#if $brewingState !== BrewingState.idle}
  <h1>{amount} ml</h1>
  <h2>
    <time>{time}</time>
  </h2>
{/if}
