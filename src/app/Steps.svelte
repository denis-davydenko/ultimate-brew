<script>
  import { activeStep, steps } from './store';
</script>

<style type="text/postcss">
  .steps {
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
  }

  .step {
    padding: 0.4rem 0.8rem;
    text-align: center;

    &--active {
      border: 1px solid var(--primary);
      border-radius: var(--border-radius);
      font-weight: 500;
    }
  }
</style>

<ul class="steps">
  {#each $steps as step}
    <li class="step" class:step--active={step === $activeStep}>
      {step.message}
    </li>
  {/each}
</ul>
