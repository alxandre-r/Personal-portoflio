import Image from 'next/image'

interface Sprite {
  src: string
  width: number
  height: number
  label: string
}

interface SpriteShelfProps {
  sprites: Sprite[]
  /** Integer upscale so pixels stay square. */
  scale?: number
  caption?: string
}

/** Pixel-art sprites shown at an integer scale, bottoms aligned like on the map. */
export function SpriteShelf({ sprites, scale = 3, caption }: SpriteShelfProps) {
  return (
    <figure className="my-8">
      <div
        className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6 rounded-xl border px-6 py-8"
        style={{ borderColor: 'var(--project-accent-border)', background: '#14161c' }}
      >
        {sprites.map((s) => (
          <div key={s.src} className="flex flex-col items-center gap-3">
            <Image
              src={s.src}
              alt={s.label}
              width={s.width * scale}
              height={s.height * scale}
              unoptimized
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-xs text-zinc-400">{s.label}</span>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-[var(--color-muted-foreground)]">{caption}</figcaption>
      )}
    </figure>
  )
}
