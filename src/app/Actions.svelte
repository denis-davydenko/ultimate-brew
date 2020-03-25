<script>
  import { appState, AppState } from './store';
</script>

<div>
  {#if $appState === AppState.idle}
    <button on:click={appState.brew}>Brew! ☕</button>
  {/if}
  {#if $appState === AppState.brewing}
    <button on:click={appState.stop}>Cancel</button>
  {/if}
</div>
