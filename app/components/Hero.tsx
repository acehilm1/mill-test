'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { VRHeadsetSVG } from './VRHeadsetSVG';

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Parallax: the device drifts up slower than the surrounding content.
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="hero-gradient film-grain relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-32 pb-24 text-center lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.6, delay: 0.05 }}
          className="mb-6 text-xs sm:text-sm uppercase tracking-4 text-ink-400"
        >
          Millwright · Spatial Computing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tightest leading-[1.05]"
        >
          Welcome to the era
          <br />
          <span className="bg-gradient-to-br from-white via-ink-50 to-ink-400 bg-clip-text text-transparent">
            of spatial vision.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, delay: 0.15 }}
          className="mt-8 max-w-2xl text-lg sm:text-xl text-ink-400 leading-relaxed"
        >
          Millwright Vision Pro fuses a 4K micro-OLED display, precision eye-tracking,
          and an aerospace-grade aluminum chassis into a headset that disappears.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#features"
            className="rounded-full bg-white px-7 py-3 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Explore the device
          </a>
          <a
            href="#contact"
            className="rounded-full border border-ink-100/30 px-7 py-3 text-sm font-medium text-ink-50 transition-colors hover:bg-white/5"
          >
            Reserve a demo
          </a>
        </motion.div>

        <motion.div
          style={{ y: deviceY }}
          initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 w-full max-w-3xl"
        >
          <VRHeadsetSVG className="w-full h-auto drop-shadow-[0_30px_60px_rgba(10,132,255,0.35)]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-400 text-xs"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}