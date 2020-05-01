<script>
  import { settings, selectedRecipeId } from './store';
  import { RECIPES } from './recipes';
</script>

<style type="text/postcss">
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__row {
      width: 100%;
      margin-bottom: 0.8rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .settings-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__label {
      text-align: left;
      flex: 1;
    }

    &__inputs {
      display: flex;
      flex-direction: row;
      flex: 2;
      margin-left: -0.8rem;
    }

    &__input {
      flex: 1;
      margin-left: 0.8rem;
    }
  }
</style>

<div class="settings">
  <div class="settings__row settings-row">
    <label class="settings-row__label" for="recipe">Recipe</label>
    <div class="settings-row__inputs">
      <select class="select settings-row__input" bind:value={$selectedRecipeId}>
        {#each RECIPES as recipe}
          <option value={recipe.id}>{recipe.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="settings__row settings-row">
    <label class="settings-row__label" for="coffee">Coffee, g</label>
    <div class="settings-row__inputs">
      <input
        id="coffee"
        class="input settings-row__input"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        value={$settings.coffee}
        on:input={e => settings.updateCoffee(e.target.value)}
      />
      <button
        class="button button--no-horizontal-padding settings-row__input"
        on:click={() => settings.updateCoffee(15)}
      >
        15
      </button>
      <button
        class="button button--no-horizontal-padding settings-row__input"
        on:click={() => settings.updateCoffee(30)}
      >
        30
      </button>
    </div>
  </div>

  <div class="settings__row settings-row">
    <label class="settings-row__label" for="water">Water, ml</label>
    <div class="settings-row__inputs">
      <input
        id="water"
        class="input settings-row__input"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        value={$settings.water}
        on:input={e => settings.updateWater(e.target.value)}
      />
      <button
        class="button settings-row__input button--no-horizontal-padding"
        on:click={() => settings.updateWater(250)}
      >
        250
      </button>
      <button
        class="button settings-row__input button--no-horizontal-padding"
        on:click={() => settings.updateWater(500)}
      >
        500
      </button>
    </div>
  </div>
</div>
