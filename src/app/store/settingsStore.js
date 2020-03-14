import { writable } from 'svelte/store';
import { RATIO, DEFAULT_SETTINGS, SETTINGS_KEY } from '../consts';
import { selectedRecipe } from './recipeStore';
import { getFromStorage, saveToStorage } from '../utils';

function createSettings() {
  const defaultSettings = getFromStorage(SETTINGS_KEY) || DEFAULT_SETTINGS;
  const { subscribe, update } = writable(defaultSettings);

  let ratio = RATIO;
  let currentCoffee = defaultSettings.coffee;

  function updateCoffee(coffee) {
    const water = coffee && coffee >= 0 ? (+coffee / ratio).toFixed(1) : 0;
    currentCoffee = coffee;

    update(() => ({
      water,
      coffee
    }));
  }

  function updateWater(water) {
    const coffee = water && water >= 0 ? (+water * ratio).toFixed(1) : 0;
    currentCoffee = coffee;

    update(() => ({
      water,
      coffee
    }));
  }

  selectedRecipe.subscribe(recipe => {
    if (!recipe) {
      return;
    }

    ratio = recipe.ratio;
    updateCoffee(currentCoffee);
  });

  return {
    subscribe,
    updateCoffee,
    updateWater
  };
}

export const settings = createSettings();

settings.subscribe(value => saveToStorage(SETTINGS_KEY, value));
