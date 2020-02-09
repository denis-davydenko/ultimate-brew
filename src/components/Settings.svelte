<script>
  import { settings, brewingState } from './store';
  import { BrewingState } from './consts';
</script>

<style type="scss">
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .settings__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .settings__row:last-of-type {
    margin-bottom: 0;
  }

  .settings__inputs {
    display: flex;
    margin-left: auto;
  }

  .settings__input {
    margin-left: 0.5rem;
    width: 80px;
  }

  .settings__btn {
    margin-left: 0.5rem;
    width: 60px;
  }
</style>

{#if $brewingState === BrewingState.idle}
  <div class="settings">
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
