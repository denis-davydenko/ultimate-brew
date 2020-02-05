<script>
  import Settings from './Settings.svelte';
  import Steps from './Steps.svelte';
</script>

<style>
  header {
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  main {
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
  }

  .settings {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .brew-btn {
    margin-top: 2rem;
  }

  @media (min-width: 640px) {
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
  <div class="settings">
    <Settings />
  </div>
  <Steps />
  <button class="brew-btn">Brew! ☕</button>
</main>
