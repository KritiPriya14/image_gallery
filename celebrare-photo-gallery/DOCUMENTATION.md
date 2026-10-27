# Technical Documentation

## Data flow

1. `App` calls `useFetchPhotos()`.
2. The custom hook fetches the 30-item Picsum list and reports loading/error state.
3. `App` calls `useFavorites()`, which initializes reducer state from localStorage.
4. The search input updates `searchTerm` through a `useCallback` handler.
5. `useMemo` derives the currently visible photos from the selected view and search query.
6. `PhotoCard` renders each image and dispatches a `TOGGLE` action when its heart is pressed.
7. The favourites hook persists each new reducer state to localStorage.

## State ownership

| State | Owner | Reason |
|---|---|---|
| Photos, loading, error | `useFetchPhotos` | API/data concerns stay outside the UI |
| Favourites | `useReducer` in `useFavorites` | Toggle logic is centralized and predictable |
| Search term | `App` | Used by the gallery filter |
| Active view | `App` | Controls whether all photos or favourites are shown |

## API

`GET https://picsum.photos/v2/list?limit=30`

The API returns photo metadata including `id` and `author`. The app uses the photo ID to construct a consistent image URL. Internet access is required for the initial metadata request and image loading.

## Accessibility details

- Search input has an accessible label.
- Heart buttons have descriptive accessible names and `aria-pressed`.
- Loading uses `role="status"` and `aria-live`.
- Decorative icons are paired with text or accessible labels.
- External photo links open in a new tab with `rel="noreferrer"`.

## Known considerations

- The UI uses a Google Font import with system-font fallbacks; if fonts are blocked, the app remains usable.
- localStorage can be unavailable in restricted browser contexts; persistence failures are safely ignored.
- The API and image URLs require internet access.
