"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function HeroNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initNodes() {
      const count = Math.min(80, Math.floor((canvas!.offsetWidth * canvas!.offsetHeight) / 12000));
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.offsetWidth,
        y: Math.random() * canvas!.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = 150;
      const mouseDistance = 200;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDistance) {
          const force = (mouseDistance - dist) / mouseDistance * 0.02;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        node.vx *= 0.99;
        node.vy *= 0.99;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            const gradient = ctx!.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(167, 139, 250, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(129, 140, 248, ${alpha * 0.8})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);

            ctx!.beginPath();
            ctx!.strokeStyle = gradient;
            ctx!.lineWidth = 0.8;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.3 + 0.7;
        const r = node.radius * pulse;

        const glow = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
        glow.addColorStop(0, `rgba(167, 139, 250, ${node.opacity * pulse * 0.3})`);
        glow.addColorStop(0.5, `rgba(139, 92, 246, ${node.opacity * pulse * 0.1})`);
        glow.addColorStop(1, "transparent");

        ctx!.beginPath();
        ctx!.fillStyle = glow;
        ctx!.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(196, 181, 253, ${node.opacity * pulse})`;
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    function handleMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    initNodes();
    frameRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", () => { resize(); initNodes(); });
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.7 }}
    />
  );
}
