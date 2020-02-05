import { writable } from 'svelte/store';
import { RATIO, DEFAULT_SETTINGS } from './consts';

function createSettings() {
  const { subscribe, update } = writable(DEFAULT_SETTINGS);

  return {
    subscribe,
    updateCoffee: coffee => {
      const water = coffee ? (coffee / RATIO).toFixed(1) : 0;

      update(() => ({
        water,
        coffee
      }));
    },
    updateWater: water => {
      const coffee = water ? (water * RATIO).toFixed(1) : 0;

      update(() => ({
        water,
        coffee
      }));
    }
  };
}

export const settings = createSettings();
