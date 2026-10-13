import Image from 'next/image'

interface FigureProps {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** Nearest-neighbour scaling for pixel-art captures (also skips resampling). */
  pixelated?: boolean
}

export function Figure({ src, alt, width, height, caption, pixelated }: FigureProps) {
  return (
    <figure className="my-8">
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: 'var(--project-accent-border)' }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 896px) 100vw, 896px"
          unoptimized={pixelated}
          className="block w-full h-auto"
          style={pixelated ? { imageRendering: 'pixelated' } : undefined}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-[var(--color-muted-foreground)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
