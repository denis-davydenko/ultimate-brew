<script>
  import { BrewingState } from './consts';
  import { brewingState, activeStep, timerState } from './store';
  import { formatTime } from './utils';
</script>

<style>
  h1,
  h2 {
    text-align: center;
    margin-top: 0;
    font-family: var(--font-mono);
    color: var(--red-color);
  }
</style>

{#if $brewingState !== BrewingState.idle}
  <h1>{$timerState.amount.toFixed(1)}/{$activeStep.amountAfter.toFixed(1)}</h1>
  <h2>
    <time>{formatTime($timerState.elapsedTime)}</time>
  </h2>
{/if}
