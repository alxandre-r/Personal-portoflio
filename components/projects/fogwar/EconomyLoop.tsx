interface EconomyLoopProps {
  labels: {
    wood: string
    buildings: string
    food: string
    villagers: string
    market: string
    gold: string
    research: string
  }
}

const W = 140
const H = 40

type NodeKey = keyof EconomyLoopProps['labels']

// Node centres. The core loop is the square on the left; the gold/research
// branch hangs off Food.
const nodes: Record<NodeKey, { x: number; y: number; core: boolean }> = {
  wood: { x: 85, y: 40, core: true },
  buildings: { x: 290, y: 40, core: true },
  food: { x: 290, y: 140, core: true },
  villagers: { x: 85, y: 140, core: true },
  market: { x: 290, y: 240, core: false },
  gold: { x: 470, y: 240, core: false },
  research: { x: 470, y: 140, core: false },
}

const edges: [NodeKey, NodeKey][] = [
  ['wood', 'buildings'],
  ['buildings', 'food'],
  ['food', 'villagers'],
  ['villagers', 'wood'],
  ['food', 'market'],
  ['market', 'gold'],
  ['gold', 'research'],
]

/** Endpoint on the edge of a node's box, heading towards (tx, ty). */
function edgePoint(from: { x: number; y: number }, to: { x: number; y: number }, gap: number) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  if (Math.abs(dx) > Math.abs(dy)) return { x: from.x + Math.sign(dx) * (W / 2 + gap), y: from.y }
  return { x: from.x, y: from.y + Math.sign(dy) * (H / 2 + gap) }
}

/** FogWar's resource loop: wood builds farms, food feeds villagers, villagers gather wood. */
export function EconomyLoop({ labels }: EconomyLoopProps) {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 560 280"
        className="mx-auto w-full max-w-xl h-auto text-[var(--color-foreground)]"
        role="img"
        aria-label={edges.map(([a, b]) => `${labels[a]} → ${labels[b]}`).join(', ')}
      >
        <defs>
          <marker id="fogwar-economy-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" style={{ fill: 'var(--project-accent)' }} />
          </marker>
        </defs>

        {edges.map(([a, b]) => {
          const start = edgePoint(nodes[a], nodes[b], 2)
          const end = edgePoint(nodes[b], nodes[a], 4)
          return (
            <line
              key={`${a}-${b}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              markerEnd="url(#fogwar-economy-arrow)"
              strokeDasharray={nodes[a].core && nodes[b].core ? undefined : '5 4'}
              style={{ stroke: 'var(--project-accent)', strokeWidth: 2 }}
            />
          )
        })}

        {(Object.keys(nodes) as NodeKey[]).map((key) => {
          const n = nodes[key]
          return (
            <g key={key}>
              <rect
                x={n.x - W / 2}
                y={n.y - H / 2}
                width={W}
                height={H}
                rx="8"
                style={{
                  fill: 'var(--project-accent-soft)',
                  stroke: n.core ? 'var(--project-accent)' : 'var(--project-accent-border)',
                  strokeWidth: n.core ? 2 : 1.5,
                }}
              />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontWeight={n.core ? 600 : 400} style={{ fill: 'currentColor' }}>
                {labels[key]}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
