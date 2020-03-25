<script>
  import { activeStep, brewingState } from './store';
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

<h1>{$brewingState.amount.toFixed(1)}/{$activeStep.amountAfter.toFixed(1)}</h1>
<h2>
  <time>{formatTime($brewingState.elapsedTime)}</time>
</h2>
