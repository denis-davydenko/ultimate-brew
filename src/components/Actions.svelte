<script>
  import { brewingState } from './store';
  import { BrewingState } from './consts';
</script>

<div>
  {#if $brewingState === BrewingState.idle}
    <button on:click={brewingState.start}>Brew! ☕</button>
  {/if}
  {#if $brewingState === BrewingState.brewing}
    <button on:click={brewingState.cancel}>Cancel</button>
  {/if}
</div>
