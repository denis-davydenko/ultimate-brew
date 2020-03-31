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
    display: flex;
    flex-direction: column;

    &__header {
      text-align: center;
      margin-bottom: 2rem;
    }

    &__steps {
      flex: 1;
      margin-top: 2rem;
      overflow-y: scroll;
    }

    &__actions {
      margin-top: 2rem;
      text-align: center;
    }
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

  <div class="app__steps">
    <Steps />
  </div>

  <div class="app__actions">
    <Actions />
  </div>
</div>
