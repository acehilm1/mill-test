'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Optional eyebrow rendered above the title. */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
};

/**
 * Reveal-on-scroll wrapper. Animates once per page lifecycle and respects
 * prefers-reduced-motion via Framer Motion's built-in handling.
 */
export function Section({
  id,
  className = '',
  children,
  eyebrow,
  title,
  description,
}: SectionProps) {
  const reduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      id={id}
      className={`relative w-full px-6 py-24 sm:py-32 lg:px-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {(eyebrow || title || description) && (
        <div className="mx-auto max-w-3xl text-center mb-16">
          {eyebrow && (
            <motion.p
              variants={childVariants}
              className="text-xs sm:text-sm uppercase tracking-4 text-ink-400 mb-4"
            >
              {eyebrow}
            </motion.p>
          )}
          {title && (
            <motion.h2
              variants={childVariants}
              className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest text-ink-50"
            >
              {title}
            </motion.h2>
          )}
          {description && (
            <motion.p
              variants={childVariants}
              className="mt-6 text-base sm:text-lg text-ink-400 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      <motion.div variants={containerVariants}>{children}</motion.div>
    </motion.section>
  );
}

/**
 * Apply inside a Section so each child element picks up the staggered reveal.
 */
export function RevealItem({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}