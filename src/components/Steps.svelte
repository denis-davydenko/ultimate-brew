<script>
  import { STEPS, AMOUNT_PLACEHOLDER } from './consts';
  import { settings, activeStepIndex } from './store';

  function formatMessage(step) {
    return step.message.replace(
      AMOUNT_PLACEHOLDER,
      ((step.valuePercentOnStep / 100) * $settings.water).toFixed(1)
    );
  }
</script>

<style>
  ul {
    width: 350px;
    padding-left: 0;
    list-style: none;
    text-align: center;
  }

  .active {
    font-size: 1.25rem;
    color: blue;
  }
</style>

<ul>
  {#each STEPS as step, i}
    <li class:active={i === $activeStepIndex}>{formatMessage(step)}</li>
  {/each}
</ul>
