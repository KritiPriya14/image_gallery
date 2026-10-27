import { Heart } from 'lucide-react'

export default function PhotoCard({ photo, isFavorite, onToggleFavorite, index }) {
  return (
    <article
      className="photo-card group animate-rise overflow-hidden rounded-[1.35rem] bg-white"
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
    >
      <div className="relative aspect-[4/4.65] overflow-hidden bg-stone-200">
        <img
          src={`https://picsum.photos/id/${photo.id}/700/820`}
          alt={`Photograph by ${photo.author}`}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 opacity-60 transition-opacity group-hover:opacity-100" />
        <button
          type="button"
          onClick={() => onToggleFavorite(photo)}
          aria-label={isFavorite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          aria-pressed={isFavorite}
          className={`absolute right-3.5 top-3.5 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition duration-200 ${
            isFavorite
              ? 'border-white bg-white text-accent shadow-lg'
              : 'border-white/50 bg-black/15 text-white hover:scale-105 hover:bg-white hover:text-accent'
          }`}
        >
          <Heart size={19} strokeWidth={1.8} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <span className="absolute bottom-3.5 left-4 rounded-full border border-white/35 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          Frame {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.19em] text-stone-400">Photographer</p>
          <h2 className="mt-1 truncate text-sm font-medium tracking-[-0.02em] text-ink">{photo.author}</h2>
        </div>

      </div>
    </article>
  )
}
