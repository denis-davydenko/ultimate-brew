<script>
  import { brewingState } from './store';
  import { BrewingState } from './consts';
</script>

<div>
  {#if $brewingState === BrewingState.idle}
    <button on:click={brewingState.start}>Brew! ☕</button>
  {/if}
  {#if $brewingState === BrewingState.brewing}
    <button on:click={brewingState.pause}>Pause</button>
    <button on:click={brewingState.cancel}>Cancel</button>
  {/if}
  {#if $brewingState === BrewingState.paused}
    <button on:click={brewingState.start}>Continue</button>
  {/if}
</div>
