<script>
  import { tweened } from 'svelte/motion';
  import { activeStep, steps } from './store';
  import { ONE_SEC } from './consts';

  let progress = tweened(0, { duration: 0 });
  $: {
    if ($activeStep != null) {
      progress
        .set(0, { duration: 0 })
        .then(() =>
          progress.set(100, { duration: $activeStep.duration * ONE_SEC })
        );
    } else {
      progress.set(0, { duration: 0 });
    }
  }

  let activeStepStyle = '',
    activeStepTextStyle = '';
  $: {
    if ($progress != null) {
      activeStepStyle = `background-image: linear-gradient(90deg, var(--accent) ${$progress}%, transparent ${$progress}%)`;
      activeStepTextStyle = `background-image: linear-gradient(90deg, var(--main) ${$progress}%, var(--accent) ${$progress}%)`;
    } else {
      activeStepStyle = activeStepTextStyle = '';
    }
  }

  let activeStepElement;
  $: {
    if (activeStepElement) {
      activeStepElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<style type="text/postcss">
  .steps {
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
  }

  .step {
    background: transparent;
    border: 1px solid transparent;
    background-image: linear-gradient(90deg, var(--accent) 0%, transparent 0%);

    &__text {
      display: block;
      padding: 0.4rem 0.8rem;
      text-align: center;
      width: 100%;
      background: var(--accent);
      color: transparent;
      background-clip: text;
      background-image: linear-gradient(
        90deg,
        var(--main) 0%,
        var(--accent) 0%
      );
    }

    &--active {
      border: 1px solid var(--accent);
      border-radius: var(--border-radius);

      .step__text {
        font-weight: 500;
      }
    }
  }
</style>

<ul class="steps">
  {#each $steps as step}
    {#if step === $activeStep}
      <li
        bind:this={activeStepElement}
        class="step step--active"
        style={activeStepStyle}
      >
        <span class="step__text" style={activeStepTextStyle}>
          {step.message}
        </span>
      </li>
    {:else}
      <li class="step">
        <span class="step__text">{step.message}</span>
      </li>
    {/if}
  {/each}
</ul>
