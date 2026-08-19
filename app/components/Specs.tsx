'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealItem, Section } from './Section';

const specs = [
  { label: 'Display', value: 'Dual 4K micro-OLED · 120Hz · 5000 nits peak' },
  { label: 'Chip', value: 'Millwright M3 Spatial · 16-core neural engine' },
  { label: 'Optics', value: 'Pancake lenses · 110° field of view' },
  { label: 'Tracking', value: '6-DoF inside-out · eye · hand · voice' },
  { label: 'Audio', value: 'Dual-driver spatial audio · 6-mic array' },
  { label: 'Battery', value: '2.5 hours tethered · all-day in pass-through' },
  { label: 'Weight', value: '318 g · 7000-series aluminum chassis' },
  { label: 'Connectivity', value: 'Wi-Fi 7 · Bluetooth 5.4 · USB-C' },
];

export function Specs() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Parallax the headline against the spec rows for cinematic depth.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const rowsY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 30]);

  return (
    <Section
      id="specs"
      className="bg-gradient-to-b from-ink-950 via-[#050507] to-ink-950"
      eyebrow="Specifications"
      title="The hardware, end to end."
      description="Designed from the silicon up. Every gram, every photon accounted for."
    >
      <div ref={ref} className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <motion.div style={{ y: titleY }}>
          <RevealItem>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tightest text-ink-50">
              Crafted in a single piece of aluminum.
            </h3>
            <p className="mt-4 text-base text-ink-400 leading-relaxed">
              The chassis is machined from a 1.2 kg billet of 7000-series aluminum, hand
              polished, and anodized in our signature graphite finish. A curved glass front
              shield protects the optics without compromising color.
            </p>
          </RevealItem>
        </motion.div>

        <motion.dl
          style={{ y: rowsY }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-sm sm:grid-cols-2"
        >
          {specs.map((spec) => (
            <RevealItem key={spec.label} className="bg-ink-950/60 p-5">
              <dt className="text-xs uppercase tracking-4 text-ink-400">{spec.label}</dt>
              <dd className="mt-2 text-base text-ink-50">{spec.value}</dd>
            </RevealItem>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}