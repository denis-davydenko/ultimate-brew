<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Settings from './Settings.svelte';
  import Steps from './Steps.svelte';
  import BrewTimer from './BrewTimer.svelte';
  import Actions from './Actions.svelte';
  import { appState, AppState } from './store';
  import { requestWakeLock, releaseWakeLock } from './utils';

  onMount(() => {
    const unsubscribe = appState.subscribe(async state => {
      try {
        if (state === AppState.brewing) {
          await requestWakeLock();
        } else if (state === AppState.idle) {
          await releaseWakeLock();
        }
      } catch (error) {
        console.error('Wake lock operation failed:', error);
      }
    });

    const handleVisibilityChange = async () => {
      if (
        document.visibilityState === 'visible' &&
        $appState === AppState.brewing
      ) {
        await requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
</script>

<style>
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
  }

  .app__header {
    grid-area: header;
    text-align: center;
  }

  .app__main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .app__main > div {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .app__steps {
    max-height: 100%;
    grid-area: steps;
    align-self: center;
    overflow-y: auto;
  }

  .app__actions {
    grid-area: actions;
    text-align: center;
  }

  @media screen and (orientation: landscape) {
    .app {
      grid-template-rows: 1fr auto;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'main steps' 'actions actions';
      grid-column-gap: 1rem;
    }

    .app__header {
      display: none;
    }
  }

  @media screen and (height >= 400px) and (orientation: landscape) {
    .app {
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 'header header' 'main steps' 'actions actions';
      grid-column-gap: 1rem;
    }

    .app__header {
      display: initial;
    }
  }
</style>

<div class="app">
  <header class="app__header">
    <h1>Ultimate Brew</h1>
  </header>
  <div class="app__main">
    {#if $appState === AppState.idle}
      <div in:fade={{ duration: 400 }} out:fade={{ duration: 300 }}>
        <Settings />
      </div>
    {/if}
    {#if $appState === AppState.brewing}
      <div in:fade={{ duration: 400 }} out:fade={{ duration: 300 }}>
        <BrewTimer />
      </div>
    {/if}
  </div>

  <div class="app__steps">
    <Steps />
  </div>

  <div class="app__actions">
    <Actions />
  </div>
</div>
