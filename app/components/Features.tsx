'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { RevealItem, Section } from './Section';

const features = [
  {
    title: 'Dual 4K micro-OLED',
    body:
      '23 million pixels across two displays deliver cinema-grade color and a 120Hz refresh rate that never breaks immersion.',
  },
  {
    title: 'Precision eye-tracking',
    body:
      'Infrared cameras and on-device neural engines follow your gaze for foveated rendering and natural input.',
  },
  {
    title: 'Spatial audio mesh',
    body:
      'Two-driver audio straps produce a personal soundstage with zero leakage. Hear it. Feel it. Forget the headset.',
  },
  {
    title: 'Aerospace aluminum',
    body:
      'A single billet of 7000-series aluminum keeps the chassis at 318 grams while dissipating heat silently.',
  },
  {
    title: 'All-day comfort',
    body:
      'A knit light seal with three fit profiles distributes weight evenly. Sessions stretch from minutes to hours.',
  },
  {
    title: 'Privacy on-device',
    body:
      'Eye data and cameras stay on the headset. Optical indicators light up the moment a sensor is active.',
  },
];

function TiltCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <RevealItem className="group">
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur transition-col-2 hover:border-white/30"
      >
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-ink-50">
          0{index + 1}
        </div>
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-ink-50">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-400">{body}</p>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-500/0 transition-all duration-500 group-hover:bg-accent-500/20 group-hover:blur-3xl"
        />
      </motion.div>
    </RevealItem>
  );
}

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Engineered for presence"
      title="Every detail, considered."
      description="Six pillars of the Vision Pro experience. Built to vanish the moment you put it on."
      className="bg-ink-950"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <TiltCard key={f.title} title={f.title} body={f.body} index={i} />
        ))}
      </div>
    </Section>
  );
}