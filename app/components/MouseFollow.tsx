'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Subtle cursor halo. Hidden on touch / coarse-pointer devices so we don't
 * duplicate a cursor or leave a static blob in the corner.
 */
export function MouseFollow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;
    if (!fine || noHover) return;
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      className="pointer-events-none fixed left-0 top-0 z-50"
    >
      <span className="block h-6 w-6 rounded-full bg-white/30 mix-blend-difference backdrop-blur" />
      <span className="absolute inset-0 -z-10 animate-pulse-slow rounded-full bg-accent-500/40 blur-xl" />
    </motion.div>
  );
}