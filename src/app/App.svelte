<script>
  import Settings from './Settings.svelte';
  import Steps from './Steps.svelte';
  import BrewTimer from './BrewTimer.svelte';
  import Actions from './Actions.svelte';
  import { appState, AppState } from './store';
</script>

<style type="text/postcss">
  header {
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  main {
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (width >= 640px) {
    main {
      max-width: 500px;
    }
  }
</style>

<header>
  <h1>Ultimate Brew</h1>
</header>
<main>
  <section>
    {#if $appState === AppState.idle}
      <Settings />
    {/if}
    {#if $appState === AppState.brewing}
      <BrewTimer />
    {/if}
  </section>
  <section>
    <Steps />
  </section>
  <section>
    <Actions />
  </section>
</main>
