<script>
  import Settings from './Settings.svelte';
  import Steps from './Steps.svelte';
  import BrewTimer from './BrewTimer.svelte';
  import Actions from './Actions.svelte';
  import { appState, AppState } from './store';
</script>

<style type="text/postcss">
  .app {
    max-width: var(--max-width);
    max-height: var(--max-height);
    height: calc(var(--max-width) / var(--display-ratio));
    margin: 0 auto;
    padding: 2rem 1rem;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    grid-gap: 2rem;

    &__header {
      text-align: center;
    }

    &__steps {
      overflow-y: scroll;
    }

    &__actions {
      text-align: center;
    }
  }

  .steps {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    align-items: center;
  }
</style>

<div class="app">
  <header class="app__header">
    <h1>Ultimate Brew</h1>
  </header>
  <div>
    {#if $appState === AppState.idle}
      <Settings />
    {/if}
    {#if $appState === AppState.brewing}
      <BrewTimer />
    {/if}
  </div>

  <div class="app__steps steps">
    <div>
      <Steps />
    </div>
  </div>

  <div class="app__actions">
    <Actions />
  </div>
</div>
