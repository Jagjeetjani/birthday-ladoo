import { useEffect, useRef, useCallback } from 'react';
import './SparkleTrail.css';

export default function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef(false);

  const createSparkle = useCallback((x: number, y: number) => {
    if (!containerRef.current || throttleRef.current) return;
    throttleRef.current = true;
    setTimeout(() => { throttleRef.current = false; }, 50);

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-dot';
    const size = Math.random() * 8 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x - size / 2}px`;
    sparkle.style.top = `${y - size / 2}px`;
    sparkle.style.animationDuration = `${Math.random() * 400 + 400}ms`;

    containerRef.current.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => createSparkle(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) createSparkle(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [createSparkle]);

  return <div className="sparkle-container" ref={containerRef} />;
}
