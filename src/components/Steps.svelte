<script>
  import { STEPS, AMOUNT_PLACEHOLDER } from './consts';
  import { settings, activeStepIndex } from './store';

  let steps = [];

  function formatMessage(step, settings) {
    return step.message.replace(
      AMOUNT_PLACEHOLDER,
      ((step.valuePercentOnStep / 100) * settings.water).toFixed(1)
    );
  }

  $: steps = STEPS.map(s => formatMessage(s, $settings));
</script>

<style>
  ul {
    width: 350px;
    padding-left: 0;
    list-style: none;
    text-align: center;
  }

  .active {
    font-weight: bold;
    color: var(--red-color);
  }
</style>

<ul>
  {#each steps as step, i}
    <li class:active={i === $activeStepIndex}>{step}</li>
  {/each}
</ul>
