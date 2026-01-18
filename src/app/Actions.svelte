<script>
  import { appState, AppState } from './store';
</script>

{#if $appState === AppState.idle}
  <button class="button" onclick={appState.brew}>Brew!</button>
{/if}
{#if $appState === AppState.brewing}
  <button class="button" onclick={appState.stop}>Cancel</button>
{/if}
