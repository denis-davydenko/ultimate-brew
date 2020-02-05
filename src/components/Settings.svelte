<script>
  import { settings } from './settingsStore';
</script>

<style type="scss">
  .settings {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .input {
    width: 100px;
    margin-right: 1rem;
  }
</style>

<section class="settings">
  <label for="coffee" class="input">
    Coffee (gr)
    <input
      id="coffee"
      min={0}
      max={100}
      type="number"
      value={$settings.coffee}
      on:input={e => settings.updateCoffee(e.target.value)}
    />
  </label>
  <label for="water" class="input">
    Water (ml)
    <input
      min={0}
      max={1000}
      type="number"
      value={$settings.water}
      on:input={e => settings.updateWater(e.target.value)}
    />
  </label>

</section>
