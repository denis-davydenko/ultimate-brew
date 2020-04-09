<script>
  import Settings from './Settings.svelte';
  import Steps from './Steps.svelte';
  import BrewTimer from './BrewTimer.svelte';
  import Actions from './Actions.svelte';
  import { appState, AppState } from './store';
</script>

<style type="text/postcss">
  .app {
    max-width: calc(var(--max-width) - 2rem);
    max-height: calc(var(--max-height) - 4rem);
    height: calc(var(--max-width) / var(--display-ratio) - 4rem);
    width: calc(var(--max-width) - 2rem);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 13rem 1fr auto;
    grid-template-areas: 'header' 'main' 'steps' 'actions';
    grid-row-gap: 2rem;
    grid-column-gap: 1rem;

    @media screen and (orientation: landscape) {
      grid-template-rows: 1fr auto;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'main steps' 'actions actions';
      grid-column-gap: 1rem;

      &__header {
        display: none;
      }
    }

    @media screen and (height >= 400px) and (orientation: landscape) {
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'header header' 'main steps' 'actions actions';
      grid-column-gap: 1rem;

      &__header {
        display: initial;
      }
    }

    &__header {
      grid-area: header;
      text-align: center;
    }

    &__main {
      grid-area: main;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__steps {
      max-height: 100%;
      grid-area: steps;
      align-self: center;
      overflow-y: scroll;
    }

    &__actions {
      grid-area: actions;
      text-align: center;
    }
  }
</style>

<div class="app">
  <header class="app__header">
    <h1>Ultimate Brew</h1>
  </header>
  <div class="app__main">
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
