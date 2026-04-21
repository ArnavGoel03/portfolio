"use client";

import { useEffect, useRef } from "react";

interface Node {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
  type: "gem" | "orbit" | "ambient";
  driftX: number;
  driftY: number;
}

interface Edge {
  from: number;
  to: number;
}

const PHI = (1 + Math.sqrt(5)) / 2;

function icosahedronVertices(): [number, number, number][] {
  const v: [number, number, number][] = [];
  for (const s1 of [-1, 1]) {
    for (const s2 of [-1, 1]) {
      v.push([0, s1, s2 * PHI]);
      v.push([s1, s2 * PHI, 0]);
      v.push([s2 * PHI, 0, s1]);
    }
  }
  const len = Math.sqrt(1 + PHI * PHI);
  return v.map(([x, y, z]) => [x / len, y / len, z / len]);
}

const ICO_EDGES: [number, number][] = [];
{
  const verts = icosahedronVertices();
  const edgeLen = 2 / Math.sqrt(1 + PHI * PHI);
  const threshold = edgeLen * 1.05;
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const dx = verts[i][0] - verts[j][0];
      const dy = verts[i][1] - verts[j][1];
      const dz = verts[i][2] - verts[j][2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
        ICO_EDGES.push([i, j]);
      }
    }
  }
}

function projectNode(
  bx: number,
  by: number,
  bz: number,
  cx: number,
  cy: number,
  scale: number,
  ry: number,
  rx: number
) {
  let x = bx, z = bz;
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = x * cosY - z * sinY;
  const z2 = x * sinY + z * cosY;

  let y = by;
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = y * cosX - z2 * sinX;
  const z3 = y * sinX + z2 * cosX;

  const persp = 600 / (600 + z3 * scale);
  return {
    px: cx + x2 * scale * persp,
    py: cy + y2 * scale * persp,
    s: persp,
    z: z3,
  };
}

export default function HeroNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    nodes: [] as Node[],
    edges: [] as Edge[],
    mouse: { x: -9999, y: -9999 },
    frame: 0,
    scroll: 0,
    rotation: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const S = stateRef.current;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      S.w = canvas!.offsetWidth;
      S.h = canvas!.offsetHeight;
      canvas!.width = S.w * dpr;
      canvas!.height = S.h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      const nodes: Node[] = [];
      const edges: Edge[] = [];

      const verts = icosahedronVertices();
      for (const [vx, vy, vz] of verts) {
        nodes.push({
          baseX: vx,
          baseY: vy,
          baseZ: vz,
          radius: 2.8,
          opacity: 0.85,
          pulseSpeed: 0.012 + Math.random() * 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
          type: "gem",
          driftX: 0,
          driftY: 0,
        });
      }
      for (const [i, j] of ICO_EDGES) {
        edges.push({ from: i, to: j });
      }

      const midEdgeNodes: [number, number, number][] = [];
      for (const [i, j] of ICO_EDGES) {
        const mx = (verts[i][0] + verts[j][0]) / 2;
        const my = (verts[i][1] + verts[j][1]) / 2;
        const mz = (verts[i][2] + verts[j][2]) / 2;
        const len = Math.sqrt(mx * mx + my * my + mz * mz);
        midEdgeNodes.push([mx / len * 1.15, my / len * 1.15, mz / len * 1.15]);
      }
      const midStart = nodes.length;
      for (const [mx, my, mz] of midEdgeNodes) {
        nodes.push({
          baseX: mx,
          baseY: my,
          baseZ: mz,
          radius: 1.4,
          opacity: 0.35,
          pulseSpeed: 0.006 + Math.random() * 0.006,
          pulseOffset: Math.random() * Math.PI * 2,
          type: "orbit",
          driftX: 0,
          driftY: 0,
        });
      }
      for (let k = 0; k < ICO_EDGES.length; k++) {
        edges.push({ from: ICO_EDGES[k][0], to: midStart + k });
        edges.push({ from: ICO_EDGES[k][1], to: midStart + k });
      }

      const orbitCount = 16;
      const orbitStart = nodes.length;
      for (let i = 0; i < orbitCount; i++) {
        const theta = (i / orbitCount) * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.6 + Math.random() * 0.6;
        nodes.push({
          baseX: r * Math.sin(phi) * Math.cos(theta),
          baseY: r * Math.sin(phi) * Math.sin(theta),
          baseZ: r * Math.cos(phi),
          radius: 1.8 + Math.random() * 0.8,
          opacity: 0.25 + Math.random() * 0.15,
          pulseSpeed: 0.007 + Math.random() * 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
          type: "orbit",
          driftX: 0,
          driftY: 0,
        });
      }
      for (let i = 0; i < orbitCount; i++) {
        const closest = verts.reduce(
          (best, v, vi) => {
            const n = nodes[orbitStart + i];
            const d =
              (n.baseX - v[0]) ** 2 +
              (n.baseY - v[1]) ** 2 +
              (n.baseZ - v[2]) ** 2;
            return d < best.d ? { d, vi } : best;
          },
          { d: Infinity, vi: 0 }
        );
        edges.push({ from: orbitStart + i, to: closest.vi });
      }

      const ambientCount = Math.min(
        35,
        Math.floor((S.w * S.h) / 30000)
      );
      for (let i = 0; i < ambientCount; i++) {
        nodes.push({
          baseX: (Math.random() - 0.5) * 5,
          baseY: (Math.random() - 0.5) * 3.5,
          baseZ: (Math.random() - 0.5) * 3,
          radius: Math.random() * 1.2 + 0.4,
          opacity: Math.random() * 0.12 + 0.04,
          pulseSpeed: Math.random() * 0.004 + 0.002,
          pulseOffset: Math.random() * Math.PI * 2,
          type: "ambient",
          driftX: (Math.random() - 0.5) * 0.15,
          driftY: (Math.random() - 0.5) * 0.1,
        });
      }

      S.nodes = nodes;
      S.edges = edges;
    }

    function draw(time: number) {
      const { w, h, nodes, edges, mouse } = S;
      ctx!.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.46;
      const scale = Math.min(w, h) * 0.22;

      S.rotation += 0.002;
      const ry = S.rotation + S.scroll * 0.0008;
      const rx = 0.35 + Math.sin(time * 0.0003) * 0.08;

      const projected = nodes.map((n, _i) => {
        if (n.type === "ambient") {
          n.baseX += n.driftX * 0.003;
          n.baseY += n.driftY * 0.003;
          if (Math.abs(n.baseX) > 3) n.driftX *= -1;
          if (Math.abs(n.baseY) > 2.2) n.driftY *= -1;

          const p = projectNode(n.baseX, n.baseY, n.baseZ, cx, cy, scale * 0.9, ry * 0.15, rx * 0.1);
          return p;
        }
        const orbMod = n.type === "orbit" ? 0.7 : 1;
        return projectNode(
          n.baseX,
          n.baseY,
          n.baseZ,
          cx,
          cy,
          scale,
          ry * orbMod,
          rx * orbMod
        );
      });

      for (const edge of edges) {
        const p1 = projected[edge.from];
        const p2 = projected[edge.to];
        const n1 = nodes[edge.from];
        const n2 = nodes[edge.to];
        const isGemEdge = n1.type === "gem" && n2.type === "gem";

        const avgS = (p1.s + p2.s) / 2;
        const baseAlpha = isGemEdge ? 0.18 : 0.07;
        const alpha = baseAlpha * avgS;

        const grad = ctx!.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        grad.addColorStop(0, `rgba(245,245,247,${alpha})`);
        grad.addColorStop(0.5, `rgba(245,245,247,${alpha * 0.7})`);
        grad.addColorStop(1, `rgba(245,245,247,${alpha})`);

        ctx!.beginPath();
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = isGemEdge ? 1 * avgS : 0.5 * avgS;
        ctx!.moveTo(p1.px, p1.py);
        ctx!.lineTo(p2.px, p2.py);
        ctx!.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const p = projected[i];
        const pulse =
          Math.sin(time * n.pulseSpeed + n.pulseOffset) * 0.3 + 0.7;
        const r = n.radius * pulse * p.s;

        let extra = 0;
        if (
          n.type === "gem" &&
          Math.sin(time * 0.0017 + n.pulseOffset * 5.3) > 0.92
        ) {
          extra = 0.5;
        }

        const dx = mouse.x - p.px;
        const dy = mouse.y - p.py;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const mouseBoost = mouseDist < 180 ? (1 - mouseDist / 180) * 0.35 : 0;
        const totalOpacity = Math.min(1, n.opacity * pulse + extra + mouseBoost);

        const glowR = r * (n.type === "gem" ? 10 : 6);
        const glow = ctx!.createRadialGradient(
          p.px,
          p.py,
          0,
          p.px,
          p.py,
          glowR
        );
        glow.addColorStop(0, `rgba(245,245,247,${totalOpacity * 0.22})`);
        glow.addColorStop(0.4, `rgba(245,245,247,${totalOpacity * 0.08})`);
        glow.addColorStop(1, "transparent");

        ctx!.beginPath();
        ctx!.fillStyle = glow;
        ctx!.arc(p.px, p.py, glowR, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(245,245,247,${totalOpacity})`;
        ctx!.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx!.fill();

        if (n.type === "gem" && extra > 0.3) {
          ctx!.beginPath();
          ctx!.fillStyle = `rgba(255,255,255,${extra * 0.6})`;
          ctx!.arc(p.px, p.py, r * 0.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      S.frame = requestAnimationFrame(draw);
    }

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      S.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() {
      S.mouse = { x: -9999, y: -9999 };
    }
    function onScroll() {
      S.scroll = window.scrollY;
    }

    resize();
    init();
    S.frame = requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      resize();
      init();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(S.frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.75 }}
    />
  );
}
