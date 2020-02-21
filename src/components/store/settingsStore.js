import { writable } from 'svelte/store';
import { RATIO, DEFAULT_SETTINGS, SETTINGS_KEY } from './../consts';

function getFromLocalStorage() {
  const settings = localStorage.getItem(SETTINGS_KEY);

  return settings && settings.length ? JSON.parse(settings) : DEFAULT_SETTINGS;
}

function saveToLocalStorage(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function createSettings() {
  const { subscribe, update } = writable(getFromLocalStorage());

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

settings.subscribe(saveToLocalStorage);
