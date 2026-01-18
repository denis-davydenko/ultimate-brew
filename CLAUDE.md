# Ultimate Brew - Project Context

## Quick Reference
- **What**: PWA for timing V60 coffee brewing with step-by-step recipes
- **Stack**: Svelte 5, Vite 5, Howler.js, Workbox PWA
- **Node**: 22.x
- **Version**: 2.0.0

## Project Structure
```
src/
├── app/
│   ├── App.svelte         # Root component
│   ├── recipes.js         # Recipe definitions
│   ├── consts.js          # Constants (keys, defaults, placeholders)
│   ├── store/             # Svelte stores (state management)
│   └── utils/             # Helpers (audio, timer, storage, wakeLock)
├── css/                   # PostCSS styles
├── sw.js                  # Service worker source
└── assets/                # Icons, fonts
```

## Commands
- `yarn dev` - Dev server (SW enabled)
- `yarn build` - Production build
- `yarn preview` - Preview production build
- `yarn lint` - ESLint check

---

## State Management

### Store Architecture
```
┌─────────────────┐     ┌──────────────────┐
│  recipeStore    │────▶│    stepsStore    │
│ (selectedRecipe)│     │ (derived steps)  │
└─────────────────┘     └──────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────┐
│ settingsStore   │────▶│  brewingState    │
│ (coffee, water) │     │ (timer, amounts) │
└─────────────────┘     └──────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │   appState       │
                        │ (idle/brewing)   │
                        └──────────────────┘
```

### Store Details

| Store | Type | Purpose | Persisted |
|-------|------|---------|-----------|
| `recipeStore` | writable + derived | Selected recipe ID → full recipe object | localStorage |
| `settingsStore` | writable (custom) | Coffee/water amounts, auto-calculates via ratio | localStorage |
| `stepsStore` | derived | Computes step amounts from recipe + settings | No |
| `brewingState` | derived | Timer state, elapsed time, current amounts | No |
| `appState` | writable (custom) | App mode: `idle` or `brewing` | No |

### Key Pattern: Derived Steps
Steps are **computed** from `selectedRecipe` + `settings`. Each step's `valuePercentOnStep` is multiplied by total water to get actual amounts. Never mutate steps directly - update recipe or settings instead.

```js
// stepsStore.js - water amount calculation
const amount = (step.valuePercentOnStep / 100) * $settings.water;
```

### Step Index Triggers Audio
When `activeStepIndex` changes, it automatically calls `playSound()` to notify user of step transitions.

---

## Audio System (Howler.js)

### Why Howler
Browser audio APIs are inconsistent across devices. Howler handles:
- iOS Safari autoplay restrictions
- Audio context suspension/resumption
- Format fallbacks (webm → mp3)

### Audio Flow (`src/app/utils/audio.js`)
1. **Lazy init**: Sound not loaded until first `playSound()` call
2. **Context check**: Before playing, checks if `Howler.ctx` is suspended/interrupted
3. **Resume if needed**: Calls `Howler.ctx.resume()` then plays
4. **Visibility handling**: Stops sound when tab hidden

### Audio Files
- Located in `/public/` as `bing.webm` and `bing.mp3`
- Webm preferred, mp3 as fallback

### Key Code Pattern
```js
const isHowlerPaused = Howler.ctx &&
  (Howler.ctx.state === 'suspended' || Howler.ctx.state === 'interrupted');
if (isHowlerPaused) {
  Howler.ctx.resume().then(() => play());
}
```

---

## PWA / Service Worker

### Configuration (`vite.config.js`)
- **Strategy**: `injectManifest` (custom SW at `src/sw.js`)
- **Register**: `autoUpdate` with script injection
- **Dev mode**: SW enabled (`devOptions.enabled: true`)

### Caching Strategy
| Resource | Handler |
|----------|---------|
| Static assets (html, js, css, images, audio) | Precache |
| Google Fonts | CacheFirst (1 year) |
| Navigation | Falls back to `/index.html` |

### Gotchas
- **Dev testing**: SW works in dev, but for clean testing use `yarn build && yarn preview` in incognito
- **Cache cleanup**: `cleanupOutdatedCaches: true` removes old caches on update
- **API exclusion**: `/api` routes use network-first (see `navigateFallbackDenylist`)

### Wake Lock (`src/app/utils/wakeLock.js`)
Separate from SW - prevents screen from sleeping during active brew:
```js
wakeLock = await navigator.wakeLock.request('screen');
```
Request on brew start, release on brew end/stop.

---

## Coffee Brewing Domain

### Recipe Structure (`src/app/recipes.js`)
```js
{
  id: 1,
  name: 'The Ultimate V60',
  ratio: 1 / 16.666667,        // Coffee-to-water ratio
  steps: [
    {
      message: 'Pour ${amount}g...',  // ${amount} replaced with calculated value
      description: null,               // Optional extra info
      duration: 5,                     // Seconds for this step
      valuePercentOnStep: 12           // % of total water for this step
    }
  ]
}
```

### Step Types (by `valuePercentOnStep`)
- **Pour step**: `valuePercentOnStep > 0` - user pours water
- **Wait step**: `valuePercentOnStep = 0` - pause, swirl, or wait

### Scaling Logic
Water amounts are percentages. When user sets 300ml total water and step has `valuePercentOnStep: 20`, that step = 60ml.

---

## Development Workflow

### Code Quality
- **Lint**: ESLint 9 + eslint-plugin-svelte
- **Format**: Prettier with svelte plugin
- **Hooks**: Husky + lint-staged runs on commit

### Adding a Recipe
1. Open `src/app/recipes.js`
2. Add new object to `RECIPES` array with unique `id`
3. Define `ratio` as `1 / X` (e.g., `1 / 15` for 1:15)
4. Add steps - ensure `valuePercentOnStep` values sum to 100

### Testing Changes
No test suite - verify manually:
1. `yarn dev` - check UI interactions
2. Run through a full brew cycle
3. `yarn build && yarn preview` - verify PWA behavior in incognito
4. Check DevTools → Application → Service Workers

### Svelte 5 Notes
Recently migrated from Svelte 4. Uses traditional stores (not runes) for state management.
