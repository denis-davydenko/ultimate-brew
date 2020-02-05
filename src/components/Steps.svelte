<script>
  import { STEPS, AMOUNT_PLACEHOLDER } from './consts';
  import { settings } from './settingsStore';

  let steps = STEPS;

  $: steps = STEPS.map(step => ({
    ...step,
    message: step.message.replace(
      AMOUNT_PLACEHOLDER,
      ((step.valuePercentOnStep / 100) * $settings.water).toFixed(1)
    )
  }));
</script>

<ul>
  {#each steps as step}
    <li>{step.message}</li>
  {/each}
</ul>
