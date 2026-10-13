interface VisionSourceRow {
  label: string
  day: number
  night: number
  /** Short note under the label, e.g. "manned only". */
  note?: string
}

interface VisionRadiiProps {
  sources: VisionSourceRow[]
  labels: {
    day: string
    night: string
    tiles: string
  }
}

const MAX = 8 // widest radius, in cells
const LABEL_W = 150
const BAR_W = 280
const ROW_H = 52

/** Day vs night vision radius of each FogWar light source, as paired bars. */
export function VisionRadii({ sources, labels }: VisionRadiiProps) {
  const unit = BAR_W / MAX
  const height = sources.length * ROW_H + 40

  return (
    <figure className="my-8">
      <svg
        viewBox={`0 0 ${LABEL_W + BAR_W + 50} ${height}`}
        className="mx-auto w-full max-w-xl h-auto text-[var(--color-foreground)]"
        role="img"
        aria-label={sources
          .map((s) => `${s.label}: ${labels.day} ${s.day}, ${labels.night} ${s.night} ${labels.tiles}`)
          .join('; ')}
      >
        {/* legend */}
        <g transform={`translate(${LABEL_W} 10)`}>
          <rect width="12" height="12" rx="2" style={{ fill: 'var(--project-accent)' }} />
          <text x="18" y="10" fontSize="12" style={{ fill: 'currentColor' }}>
            {labels.day}
          </text>
          <rect x="90" width="12" height="12" rx="2" style={{ fill: '#334155' }} />
          <text x="108" y="10" fontSize="12" style={{ fill: 'currentColor' }}>
            {labels.night}
          </text>
        </g>

        {sources.map((s, i) => {
          const y = 40 + i * ROW_H
          return (
            <g key={s.label} transform={`translate(0 ${y})`}>
              <text x="0" y="14" fontSize="13" fontWeight={600} style={{ fill: 'currentColor' }}>
                {s.label}
              </text>
              {s.note && (
                <text x="0" y="30" fontSize="11" style={{ fill: 'currentColor', fillOpacity: 0.6 }}>
                  {s.note}
                </text>
              )}
              {/* cell ticks */}
              {Array.from({ length: MAX + 1 }, (_, c) => (
                <line
                  key={c}
                  x1={LABEL_W + c * unit}
                  x2={LABEL_W + c * unit}
                  y1="0"
                  y2="34"
                  style={{ stroke: 'currentColor', strokeOpacity: 0.08 }}
                />
              ))}
              <rect x={LABEL_W} y="2" width={s.day * unit} height="14" rx="2" style={{ fill: 'var(--project-accent)' }} />
              <rect x={LABEL_W} y="19" width={s.night * unit} height="14" rx="2" style={{ fill: '#334155' }} />
              <text x={LABEL_W + s.day * unit + 6} y="14" fontSize="11" style={{ fill: 'currentColor' }}>
                {s.day}
              </text>
              <text x={LABEL_W + s.night * unit + 6} y="31" fontSize="11" style={{ fill: 'currentColor', fillOpacity: 0.7 }}>
                {s.night}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
