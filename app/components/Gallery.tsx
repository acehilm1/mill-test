'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { RevealItem, Section } from './Section';
import { VRHeadsetSVG } from './VRHeadsetSVG';

/**
 * Pure-SVG gallery — no external assets, no CLS. The variants below
 * use the inline VRHeadsetSVG plus accent gradients so the page is
 * self-contained and instantly renders on first paint.
 */
const gallery = [
  {
    title: 'Front',
    body: 'Curved glass shield, signature graphite finish.',
    accent: 'from-blue-500/20 via-blue-500/0 to-transparent',
  },
  {
    title: 'Profile',
    body: 'Sub-12mm pancake optics for true thinness.',
    accent: 'from-violet-500/20 via-violet-500/0 to-transparent',
  },
  {
    title: 'In use',
    body: 'Knit light seal, balanced at the brow.',
    accent: 'from-cyan-400/20 via-cyan-400/0 to-transparent',
  },
  {
    title: 'At rest',
    body: 'Magnetic charging stand sold separately.',
    accent: 'from-pink-500/20 via-pink-500/0 to-transparent',
  },
];

export function Gallery() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      title="From every angle."
      description="A quiet object, designed to disappear."
      className="bg-ink-950"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((item, i) => (
          <RevealItem key={item.title}>
            <motion.div
              whileHover={reduced ? undefined : { y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br ${item.accent} blur-3xl transition-opacity duration-500 group-hover:opacity-90`}
              />
              <VRHeadsetSVG className="relative z-10 w-full h-auto opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="relative z-10 mt-6">
                <p className="text-xs uppercase tracking-4 text-ink-400">0{i + 1}</p>
                <h3 className="mt-1 text-lg font-medium text-ink-50">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-400 leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          </RevealItem>
        ))}
      </div>
    </Section>
  );
}