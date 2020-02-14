<script>
  import { onDestroy } from 'svelte';
  import { BrewingState } from './consts';
  import { brewingState, activeStepIndex, steps, activeStep } from './store';
  import { formatTime } from './utils';

  let lastTime = window.performance.now();
  let frame;
  let elapsedForStep = 0;
  let amountOnStep = 0;
  let time = '';
  let amount = 0;

  function timerTick(time) {
    if ($activeStep.duration - elapsedForStep <= 0) {
      cancelAnimationFrame(frame);
      nextStep();
      return;
    }

    elapsedForStep += time - lastTime;
    amountOnStep = ($activeStep.amount / $activeStep.duration) * elapsedForStep;
    lastTime = time;

    frame = requestAnimationFrame(timerTick);
  }

  function nextStep() {
    if ($activeStepIndex !== $steps.length - 1) {
      activeStepIndex.set($activeStepIndex + 1);
    } else {
      activeStepIndex.set(null);
      brewingState.cancel();
      return;
    }

    lastTime = window.performance.now();
    elapsedForStep = 0;

    frame = requestAnimationFrame(timerTick);
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
    }

    lastTime = window.performance.now();
    frame = requestAnimationFrame(timerTick);
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

  $: time = $activeStep
    ? formatTime(
        elapsedForStep + $activeStep.durationAfter - $activeStep.duration
      )
    : formatTime(0);

  $: amount = $activeStep
    ? (amountOnStep + $activeStep.amountAfter - $activeStep.amount).toFixed(1)
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
  <h1>{amount}/{$activeStep.amountAfter.toFixed(1)}</h1>
  <h2>
    <time>{time}</time>
  </h2>
{/if}
