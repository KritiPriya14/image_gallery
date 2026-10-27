import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'still-gallery-favorites'

function readSavedFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.some((photo) => photo.id === action.photo.id)
      return exists
        ? state.filter((photo) => photo.id !== action.photo.id)
        : [...state, action.photo]
    }
    default:
      return state
  }
}

/** Favorites are reducer-managed and persisted between page visits. */
export default function useFavorites() {
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, readSavedFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // The gallery remains usable if browser storage is unavailable.
    }
  }, [favorites])

  const toggleFavorite = (photo) => dispatch({ type: 'TOGGLE', photo })

  return { favorites, toggleFavorite }
}
