interface VideoProps {
  src: string
  caption?: string
  poster?: string
}

/** Short looping gameplay / UI clip: autoplays muted, like a GIF. */
export function Video({ src, caption, poster }: VideoProps) {
  return (
    <figure className="my-8">
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: 'var(--project-accent-border)' }}
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="block w-full h-auto"
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
