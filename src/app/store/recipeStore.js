import { writable, derived } from 'svelte/store';
import { RECIPES } from '../recipes';
import { RECIPE_KEY } from '../consts';
import { getFromStorage, saveToStorage } from '../storage';

const recipeId = getFromStorage(RECIPE_KEY) || RECIPES[0].id;

const selectedRecipeId = writable(recipeId);

selectedRecipeId.subscribe(selected => saveToStorage(RECIPE_KEY, selected));

const selectedRecipe = derived([selectedRecipeId], ([$selectedRecipeId]) => {
  return RECIPES.find(r => r.id === $selectedRecipeId) || null;
});

export { selectedRecipeId, selectedRecipe };
