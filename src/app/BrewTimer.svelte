<script>
  import { activeStep, brewingState } from './store';
  import { formatTime, formatAmount } from './utils';
</script>

<style type="text/postcss">
  .timer {
    display: flex;
    align-items: center;
    background: var(--primary);
    border-radius: var(--border-radius);
    padding: 0.7rem 0;
    position: relative;

    &__info {
      flex: 1;

      &--now {
        text-align: right;
        border-right: 1px solid var(--main);
      }
    }

    &__legend-container {
      position: absolute;
      right: 0.4rem;
      bottom: 1.1rem;
      display: flex;
      flex-direction: column;
    }

    &__legend {
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--main);
      text-align: right;

      &--min {
        margin-top: 1.7rem;
      }
    }
  }

  .timer-info {
    color: var(--main);
    font-weight: 500;
    padding: 0 1rem;

    &__legend {
      width: 100%;
      font-size: 1.6rem;
    }

    &__amount {
      font-family: var(--font-mono);
      font-size: 3.6rem;
    }

    &__time {
      font-family: var(--font-mono);
      font-size: 2.6rem;
    }
  }
</style>

{#if $activeStep != null}
  <div class="timer">
    <div class="timer__info timer__info--now timer-info">
      <legend class="timer-info__legend">now</legend>
      <h2 class="timer-info__amount">{formatAmount($brewingState.amount)}</h2>
      <h3 class="timer-info__time">{formatTime($brewingState.elapsedTime)}</h3>
    </div>
    <div class="timer__info timer-info">
      <legend class="timer-info__legend">step</legend>
      <h2 class="timer-info__amount">
        {formatAmount($activeStep.amountAfter)}
      </h2>
      <h3 class="timer-info__time">{formatTime($activeStep.durationAfter)}</h3>
    </div>
    <div class="timer__legend-container">
      <legend class="timer__legend">ml</legend>
      <legend class="timer__legend timer__legend--min">min</legend>
    </div>
  </div>
{/if}
