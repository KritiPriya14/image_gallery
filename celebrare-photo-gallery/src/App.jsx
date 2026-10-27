import { useCallback, useMemo, useState } from 'react'
import { Aperture, Search, X, Camera } from 'lucide-react'
import useFetchPhotos from './hooks/useFetchPhotos'
import useFavorites from './hooks/useFavorites'
import PhotoCard from './components/PhotoCard'

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const { favorites, toggleFavorite } = useFavorites()
  const [searchTerm, setSearchTerm] = useState('')

  // useCallback keeps the input handler stable between renders.
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  // useMemo recalculates the visible list only when its dependencies change.
  const filteredPhotos = useMemo(() => {
    const source = photos
    const normalizedQuery = searchTerm.trim().toLowerCase()
    if (!normalizedQuery) return source
    return source.filter((photo) => photo.author.toLowerCase().includes(normalizedQuery))
  }, [photos, searchTerm])

  const favoriteIds = useMemo(() => new Set(favorites.map((photo) => photo.id)), [favorites])

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#" className="flex items-center gap-2.5" aria-label="Still home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper">
            <Aperture size={19} strokeWidth={1.6} />
          </span>
          <span className="text-lg font-semibold tracking-[-0.06em]">still<span className="text-accent">.</span></span>
        </a>
        <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3.5 py-2 text-[11px] font-medium tracking-wide text-stone-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          A little inspiration, daily
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-10 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
              <span className="h-px w-7 bg-accent" /> The visual collection
            </p>
            <h1 className="max-w-3xl font-display text-[3.25rem] leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[5.7rem]">
              A world worth <span className="italic text-stone-400">looking at.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted sm:text-base">
              A considered collection of moments, places, and perspectives. Find a frame that speaks to you.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3.5 shadow-sm transition focus-within:border-stone-400 focus-within:shadow-card">
              <Search size={18} className="shrink-0 text-stone-400" />
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="search"
                placeholder="Search photographer..."
                aria-label="Search photos by photographer name"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} aria-label="Clear search" className="text-stone-400 hover:text-ink">
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="flex w-full max-w-md items-center justify-end">
              <span className="text-[11px] text-stone-400">{loading ? 'Gathering frames…' : `${filteredPhotos.length} ${filteredPhotos.length === 1 ? 'frame' : 'frames'}`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-center justify-between border-t border-stone-200 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
            The gallery <span className="ml-2 font-normal tracking-normal text-stone-400">/ 30 photographs</span>
          </p>
          <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-stone-400 sm:flex">
            <Camera size={14} /> Curated by curiosity
          </div>
        </div>

        {loading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-stone-500" role="status" aria-live="polite">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-accent" />
            <p className="text-sm">Finding beautiful frames…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50/70 px-6 text-center">
            <p className="font-medium text-red-800">Something interrupted the gallery.</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-red-700">{error}</p>
            <p className="mt-3 text-xs text-red-600">Refresh the page to try loading the collection again.</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                isFavorite={favoriteIds.has(photo.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 px-6 text-center">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-stone-400">
              <Search size={20} />
            </span>
            <h2 className="font-display text-2xl tracking-tight">No frames found.</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">
              Try another photographer name or clear your search.
            </p>
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="mt-5 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-700">
                Clear search
              </button>
            )}
          </div>
        )}
      </section>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-[10px] uppercase tracking-[0.16em] text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>still. — a photo gallery</span>
          <span>Made with curiosity · Images via Picsum Photos</span>
        </div>
      </footer>
    </main>
  )
}
