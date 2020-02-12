<script>
  import { activeStep, steps } from './store';
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
  {#each $steps as step}
    <li class:active={step === $activeStep}>{step.message}</li>
  {/each}
</ul>
