import { writable } from 'svelte/store';

export const AppState = { idle: 'idle', brewing: 'brewing' };

function createAppState() {
  const { subscribe, set } = writable(AppState.idle);

  return {
    subscribe,
    brew: () => set(AppState.brewing),
    stop: () => set(AppState.idle)
  };
}

export const appState = createAppState();
