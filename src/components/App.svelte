<script>
  import Settings from './Settings.svelte';
  import Steps from './Steps.svelte';
  import BrewTimer from './BrewTimer.svelte';
  import Actions from './Actions.svelte';
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
  <h1>The Ultimate V60</h1>
  <p>
    <a href="https://www.youtube.com/watch?v=AI4ynXzkSQo">By James Hoffmann</a>
  </p>
</header>
<main>
  <section>
    <BrewTimer />
    <Settings />
  </section>
  <section>
    <Steps />
  </section>
  <section>
    <Actions />
  </section>
</main>
