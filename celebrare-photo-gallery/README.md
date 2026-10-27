# Still. — Photo Gallery

A responsive React photo gallery built for the Celebrare Frontend React Internship pre-screening assignment.

## Features

- Fetches 30 photos from the Picsum Photos API on page load.
- Loading and error states for the remote request.
- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop.
- Real-time client-side search by photographer/author name (no request on search).
- Favourite toggling managed with `useReducer`.
- Favourites persist across refreshes through `localStorage`.
- `useFetchPhotos` custom hook returns `photos`, `loading`, and `error`.
- `useCallback` stabilizes the search input handler.
- `useMemo` computes the filtered photo list and favourite ID lookup.
- Tailwind CSS for styling; no component UI libraries.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

1. Extract the ZIP.
2. Open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

Create a production build with:

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## Project structure

```text
src/
├── components/
│   └── PhotoCard.jsx       # Photo card, author, and favourite heart
├── hooks/
│   ├── useFetchPhotos.js   # API request, loading, and error state
│   └── useFavorites.js     # useReducer state and localStorage persistence
├── App.jsx                 # Gallery layout, search, view selection, memoized filter
├── index.css               # Tailwind directives and small global styles
└── main.jsx                # React entry point
```

## Implementation notes

### `useFetchPhotos`

Requests `https://picsum.photos/v2/list?limit=30` once when the component mounts. It returns:

- `photos`: the array returned by the API.
- `loading`: `true` while the request is in progress.
- `error`: an explanatory message when the request fails.

An `AbortController` cancels the request if the component unmounts. HTTP errors and unexpected response shapes are handled.

### Favourites with `useReducer`

The reducer handles the `TOGGLE` action. If the photo is already saved, it removes it; otherwise it adds it. The initial reducer state is read from localStorage, and an effect saves updates. This keeps favourites after a page refresh.

### `useCallback`

`handleSearchChange` is wrapped in `useCallback` so its function identity stays stable across renders. It is a small example of a stable event handler; in this app the benefit is modest because the input is not passed through a memoized child.

### `useMemo`

`filteredPhotos` recalculates only when the active view, favourites, fetched photos, or search term changes. This keeps the filtering logic declarative and avoids recalculating the visible list on unrelated renders. `favoriteIds` is also memoized for quick heart-state checks.

## Manual test checklist

- [ ] Initial load shows a spinner.
- [ ] Successful load displays up to 30 photos and author names.
- [ ] If the API is unreachable, a clear error state appears.
- [ ] Typing an author name filters the visible photos immediately.
- [ ] Search does not trigger another API request.
- [ ] Heart buttons add and remove favourites.
- [ ] Refreshing the page preserves favourites.
- [ ] - [ ] Layout is 1 column on mobile, 2 on tablet, and 4 on desktop.
- [ ] `npm run build` completes successfully.

## Five-minute recording outline

1. **App demo:** show loading, search, favourite toggling, then refresh to prove persistence.
2. **Custom hook:** open `src/hooks/useFetchPhotos.js`; explain the returned values and error handling.
3. **Reducer:** open `src/hooks/useFavorites.js`; explain the `TOGGLE` action and why reducer logic is separated from the UI.
4. **Performance hooks:** in `src/App.jsx`, explain the stable search handler (`useCallback`) and derived filtered list (`useMemo`).
5. **Challenge:** explain localStorage initialization and keeping the reducer as the single source of truth for favourite updates.

## Assignment scope

This implementation stays within the requested gallery, search, favourites, custom hook, and React hooks requirements. No authentication, backend, or unrelated product features are included.
