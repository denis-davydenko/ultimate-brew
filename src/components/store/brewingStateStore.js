import { writable } from 'svelte/store';
import { BrewingState } from './../consts';

function createBrewingState() {
  const { subscribe, set } = writable(BrewingState.idle);

  return {
    subscribe,
    start: () => set(BrewingState.brewing),
    cancel: () => set(BrewingState.idle),
    pause: () => set(BrewingState.paused)
  };
}

export const brewingState = createBrewingState();
