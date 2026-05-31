/** Full side length of the RubiksCube model in local (model) space.
 *  Cubelets sit at grid coords ‑1/0/+1; each has half-extent 0.47 → side ≈ 2.94 ≈ 3. */
const MODEL_DIM = 3

/** Collision radius: circumscribed sphere of the cube.
 *  r = a·√3 where a = half-extent = MODEL_DIM/2 · scale. */
export function makeRadius(scale: number): number {
  return (MODEL_DIM / 2) * scale * Math.sqrt(3)
}

export interface PhysicsBody {
  pos:        [number, number]          // XY world coords (Z always 0)
  vel:        [number, number]          // XY velocity (world-units/s)
  rotVel:     [number, number, number]  // current euler rotation speeds (rad/s)
  baseRotVel: [number, number, number]  // target rotation speeds (decays toward these)
  rotation:   [number, number, number]  // accumulated euler angles (rad)
  radius:     number                    // collision sphere radius (world units)
  baseSpeed:  number                    // nominal travel speed (before multiplier)
  delay:      number                    // seconds until first spawn
  visible:    boolean
}

export function spawnFromEdge(
  vw: number, vh: number,
  speed: number,
  body: PhysicsBody,
): void {
  const hw = vw / 2, hh = vh / 2
  const margin = body.radius + 0.1
  const edge = Math.floor(Math.random() * 4)
  let x = 0, y = 0, dx = 0, dy = 0

  if      (edge === 0) { x = -(hw + margin); y = (Math.random() - 0.5) * vh;  dx =  1; dy = (Math.random() - 0.5) * 0.7 }
  else if (edge === 1) { x =   hw + margin;  y = (Math.random() - 0.5) * vh;  dx = -1; dy = (Math.random() - 0.5) * 0.7 }
  else if (edge === 2) { x = (Math.random() - 0.5) * vw; y =   hh + margin;  dx = (Math.random() - 0.5) * 0.7; dy = -1 }
  else                 { x = (Math.random() - 0.5) * vw; y = -(hh + margin); dx = (Math.random() - 0.5) * 0.7; dy =  1 }

  const len = Math.sqrt(dx * dx + dy * dy)
  body.pos[0] = x;  body.pos[1] = y
  body.vel[0] = dx / len * speed
  body.vel[1] = dy / len * speed
}

/**
 * Equal-mass elastic collision with heuristic angular bump.
 * Returns true if a collision was resolved (for debug flash).
 */
export function resolveCollision(a: PhysicsBody, b: PhysicsBody): boolean {
  const dx = b.pos[0] - a.pos[0]
  const dy = b.pos[1] - a.pos[1]
  const distSq = dx * dx + dy * dy
  const minDist = a.radius + b.radius
  if (distSq >= minDist * minDist || distSq < 1e-10) return false

  const dist = Math.sqrt(distSq)
  const nx = dx / dist, ny = dy / dist

  // Relative velocity along collision normal
  const relDot = (a.vel[0] - b.vel[0]) * nx + (a.vel[1] - b.vel[1]) * ny
  if (relDot <= 0) return false  // already separating

  // Elastic velocity exchange along normal (equal mass → full swap of normal components)
  a.vel[0] -= relDot * nx;  a.vel[1] -= relDot * ny
  b.vel[0] += relDot * nx;  b.vel[1] += relDot * ny

  // Push apart to eliminate overlap
  const overlap = (minDist - dist) * 0.5
  a.pos[0] -= nx * overlap;  a.pos[1] -= ny * overlap
  b.pos[0] += nx * overlap;  b.pos[1] += ny * overlap

  // Heuristic angular bump: spin proportional to impulse, axis driven by collision normal
  const bump = Math.abs(relDot) * 2.5
  a.rotVel[0] +=  ny * bump;  b.rotVel[0] -= ny * bump
  a.rotVel[1] +=  nx * bump;  b.rotVel[1] -= nx * bump
  a.rotVel[2] -= (nx + ny) * bump * 0.4;  b.rotVel[2] += (nx + ny) * bump * 0.4

  return true
}

// ─── QuadTree ─────────────────────────────────────────────────────────────────

interface QTBounds { cx: number; cy: number; hw: number; hh: number }
interface QTEntry  { x: number; y: number; idx: number }

export class QuadTree {
  private b:       QTBounds
  private cap:     number
  private pts:     QTEntry[] = []
  private divided  = false
  private q:       [QuadTree, QuadTree, QuadTree, QuadTree] | null = null

  constructor(b: QTBounds, cap = 4) { this.b = b; this.cap = cap }

  insert(e: QTEntry): void {
    if (!this.has(e.x, e.y)) return
    if (!this.divided) {
      if (this.pts.length < this.cap) { this.pts.push(e); return }
      this.split()
    }
    for (const c of this.q!) c.insert(e)
  }

  query(ox: number, oy: number, r: number, out: number[] = []): number[] {
    if (!this.hitsCircle(ox, oy, r)) return out
    for (const p of this.pts) {
      const dx = p.x - ox, dy = p.y - oy
      if (dx * dx + dy * dy <= r * r) out.push(p.idx)
    }
    if (this.divided) for (const c of this.q!) c.query(ox, oy, r, out)
    return out
  }

  /** Recursively draw cell outlines for debug visualization. */
  draw(
    ctx:  CanvasRenderingContext2D,
    toX:  (x: number) => number,
    toY:  (y: number) => number,
    toW:  (w: number) => number,
    toH:  (h: number) => number,
  ): void {
    const { cx, cy, hw, hh } = this.b
    // toY(cy+hh) is the canvas-space top (world +Y = canvas top)
    ctx.strokeRect(toX(cx - hw), toY(cy + hh), toW(hw * 2), toH(hh * 2))
    if (this.divided) for (const c of this.q!) c.draw(ctx, toX, toY, toW, toH)
  }

  private has(x: number, y: number): boolean {
    const { cx, cy, hw, hh } = this.b
    return x >= cx - hw && x < cx + hw && y >= cy - hh && y < cy + hh
  }

  private hitsCircle(ox: number, oy: number, r: number): boolean {
    const { cx, cy, hw, hh } = this.b
    const nearX = Math.max(cx - hw, Math.min(ox, cx + hw))
    const nearY = Math.max(cy - hh, Math.min(oy, cy + hh))
    const dx = ox - nearX, dy = oy - nearY
    return dx * dx + dy * dy <= r * r
  }

  private split(): void {
    const { cx, cy, hw, hh } = this.b
    const qw = hw / 2, qh = hh / 2
    this.q = [
      new QuadTree({ cx: cx + qw, cy: cy + qh, hw: qw, hh: qh }, this.cap), // NE
      new QuadTree({ cx: cx - qw, cy: cy + qh, hw: qw, hh: qh }, this.cap), // NW
      new QuadTree({ cx: cx + qw, cy: cy - qh, hw: qw, hh: qh }, this.cap), // SE
      new QuadTree({ cx: cx - qw, cy: cy - qh, hw: qw, hh: qh }, this.cap), // SW
    ]
    this.divided = true
    for (const p of this.pts) for (const c of this.q) c.insert(p)
    this.pts = []
  }
}
