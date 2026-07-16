import { useEffect, useRef } from 'react';
import type { HeartParticle } from '../types';
import './HeartRain.css';

const MAX_PARTICLES = 80;

export default function HeartRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let particles: HeartParticle[] = [];
    let frameId: number;

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const step = () => {
      if (particles.length < MAX_PARTICLES) {
        particles.push({
          x: Math.random() * width,
          y: -20,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * 0.8 + 0.3,
          size: Math.random() * 12 + 10,
          life: 1,
          opacity: 0,
        });
      }

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        const wave = Math.sin(p.y * 0.015) * 0.3;
        p.x += p.vx + wave;
        p.y += p.vy;
        p.opacity = Math.min(1, Math.max(0, p.life));
        p.life -= 0.005;

        ctx.font = `${p.size}px sans-serif`;
        ctx.fillStyle = `rgba(244, 114, 182, ${p.opacity * 0.6})`;
        ctx.shadowColor = `rgba(244, 114, 182, 0.2)`;
        ctx.shadowBlur = 10;
        ctx.fillText('❤', p.x, p.y);
      }

      particles = particles.filter((p) => p.life > 0);
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="heart-rain" />;
}
