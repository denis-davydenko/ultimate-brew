<script>
  import { settings, brewingState, selectedRecipeId } from './store';
  import { BrewingState } from './consts';
  import { RECIPES } from './recipes';
</script>

<style type="text/postcss">
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    &__inputs {
      display: flex;
      margin-left: auto;
    }

    &__input {
      margin-left: 0.5rem;
      width: 80px;
    }

    &__selector {
      width: 216px;
    }

    &__btn {
      margin-left: 0.5rem;
      width: 60px;
    }
  }
</style>

{#if $brewingState === BrewingState.idle}
  <div class="settings">
    <div class="settings__row">
      <label for="recipe">Recipe</label>
      <div class="settings__inputs">
        <select class="settings__selector" bind:value={$selectedRecipeId}>
          {#each RECIPES as recipe}
            <option value={recipe.id}>{recipe.name}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="settings__row">
      <label for="coffee">Coffee, gr</label>
      <div class="settings__inputs">
        <input
          id="coffee"
          class="settings__input"
          min={0}
          max={100}
          type="number"
          value={$settings.coffee}
          on:input={e => settings.updateCoffee(e.target.value)}
        />
        <button
          class="settings__btn"
          on:click={() => settings.updateCoffee(15)}
        >
          15
        </button>
        <button
          class="settings__btn"
          on:click={() => settings.updateCoffee(30)}
        >
          30
        </button>
      </div>
    </div>
    <div class="settings__row">
      <label for="water">Water, ml</label>
      <div class="settings__inputs">
        <input
          id="water"
          class="settings__input"
          min={0}
          max={1000}
          type="number"
          value={$settings.water}
          on:input={e => settings.updateWater(e.target.value)}
        />
        <button
          class="settings__btn"
          on:click={() => settings.updateWater(250)}
        >
          250
        </button>
        <button
          class="settings__btn"
          on:click={() => settings.updateWater(500)}
        >
          500
        </button>
      </div>
    </div>
  </div>
{/if}
