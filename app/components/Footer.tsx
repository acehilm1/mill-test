'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Section } from './Section';

const columns = [
  {
    title: 'Product',
    links: ['Vision Pro', 'Compare', 'Accessories', 'Specs'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Support',
    links: ['Help center', 'Warranty', 'Repair', 'Accessibility'],
  },
];

export function Footer() {
  const reduced = useReducedMotion();

  return (
    <Section className="border-t border-white/10 bg-black py-16" id="footer">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0 : 0.6 }}
        >
          <p className="text-lg font-semibold tracking-tight">Millwright</p>
          <p className="mt-3 max-w-xs text-sm text-ink-400 leading-relaxed">
            Designed in California. Built for everyone, everywhere.
          </p>
        </motion.div>

        {columns.map((col) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.08 }}
          >
            <p className="text-xs uppercase tracking-4 text-ink-400">{col.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-50">
              {col.links.map((link) => (
                <li key={link}>
                  <a className="transition-colors hover:text-white/80" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.6 }}
        className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center"
      >
        <span>© {new Date().getFullYear()} Millwright, Inc. All rights reserved.</span>
        <span>Privacy · Terms · Accessibility</span>
      </motion.div>
    </Section>
  );
}