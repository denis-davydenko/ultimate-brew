<script>
  import { appState, AppState } from './store';
</script>

{#if $appState === AppState.idle}
  <button class="button" on:click={appState.brew}>Brew!</button>
{/if}
{#if $appState === AppState.brewing}
  <button class="button" on:click={appState.stop}>Cancel</button>
{/if}
