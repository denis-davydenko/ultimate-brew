import { writable } from 'svelte/store';
import { RATIO, DEFAULT_SETTINGS } from './../consts';

function createSettings() {
  const { subscribe, update } = writable(DEFAULT_SETTINGS);

  return {
    subscribe,
    updateCoffee: coffee => {
      const water = coffee && coffee >= 0 ? (+coffee / RATIO).toFixed(1) : 0;

      update(() => ({
        water,
        coffee
      }));
    },
    updateWater: water => {
      const coffee = water && water >= 0 ? (+water * RATIO).toFixed(1) : 0;

      update(() => ({
        water,
        coffee
      }));
    }
  };
}

export const settings = createSettings();
