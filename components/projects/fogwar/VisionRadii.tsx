interface VisionRadiiProps {
  labels: {
    townHall: string
    villager: string
    torch: string
    watchtower: string
    tiles: string
  }
}

const TILE = 11 // px per tile in the drawing
const CX = 130
const CY = 130
const FADE = 1.5 * TILE // matches FogSystem's 1.5-tile smoothstep edge

/**
 * Vision radii of FogWar's light sources drawn to scale on the tile grid,
 * with the fog fading in past the widest one.
 */
export function VisionRadii({ labels }: VisionRadiiProps) {
  const sources = [
    { label: labels.watchtower, radius: 10, dash: undefined },
    { label: labels.townHall, radius: 8, dash: '6 4' },
    { label: labels.torch, radius: 6, dash: '2 3' },
    { label: labels.villager, radius: 5, dash: undefined },
  ]
  const outer = 10 * TILE
  const fogR = outer + FADE

  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 460 260"
        className="mx-auto w-full max-w-xl h-auto text-[var(--color-foreground)]"
        role="img"
        aria-label={sources.map((s) => `${s.label}: ${s.radius} ${labels.tiles}`).join(', ')}
      >
        <defs>
          <radialGradient id="fogwar-vision-fog" cx={CX} cy={CY} r={fogR} gradientUnits="userSpaceOnUse">
            <stop offset={(outer - FADE) / fogR} stopColor="#0b1120" stopOpacity="0" />
            <stop offset="1" stopColor="#0b1120" stopOpacity="0.8" />
          </radialGradient>
          <clipPath id="fogwar-vision-clip">
            <rect x="0" y="0" width="260" height="260" rx="10" />
          </clipPath>
        </defs>

        <g clipPath="url(#fogwar-vision-clip)">
          {/* tile grid */}
          <rect x="0" y="0" width="260" height="260" style={{ fill: 'var(--project-accent-soft)' }} />
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i} style={{ stroke: 'currentColor', strokeOpacity: 0.08 }}>
              <line x1={CX - TILE / 2 - 12 * TILE + i * TILE} y1="0" x2={CX - TILE / 2 - 12 * TILE + i * TILE} y2="260" />
              <line x1="0" y1={CY - TILE / 2 - 12 * TILE + i * TILE} x2="260" y2={CY - TILE / 2 - 12 * TILE + i * TILE} />
            </g>
          ))}
          {/* fog beyond the widest radius */}
          <rect x="0" y="0" width="260" height="260" fill="url(#fogwar-vision-fog)" />
          {sources.map((s) => (
            <circle
              key={s.label}
              cx={CX}
              cy={CY}
              r={s.radius * TILE}
              strokeDasharray={s.dash}
              style={{ fill: 'none', stroke: 'var(--project-accent)', strokeWidth: 2 }}
            />
          ))}
          <rect x={CX - TILE / 2} y={CY - TILE / 2} width={TILE} height={TILE} style={{ fill: 'var(--project-accent)' }} />
        </g>

        {/* legend */}
        {sources.map((s, i) => (
          <g key={s.label} transform={`translate(285 ${70 + i * 36})`}>
            <line
              x1="0"
              y1="0"
              x2="28"
              y2="0"
              strokeDasharray={s.dash}
              style={{ stroke: 'var(--project-accent)', strokeWidth: 2 }}
            />
            <text x="38" y="-3" fontSize="13" style={{ fill: 'currentColor' }}>
              {s.label}
            </text>
            <text x="38" y="13" fontSize="12" style={{ fill: 'currentColor', fillOpacity: 0.6 }}>
              {s.radius} {labels.tiles}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}
