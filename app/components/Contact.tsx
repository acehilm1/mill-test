'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Section } from './Section';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      // Honeypot — real users leave it blank.
      website: String(data.get('website') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setMessage(body?.error ?? 'Please double-check your details and try again.');
        setStatus('error');
        return;
      }
      form.reset();
      setStatus('success');
      setMessage('Thanks — we will be in touch within one business day.');
    } catch {
      setStatus('error');
      setMessage('Network hiccup. Please try again in a moment.');
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Reserve a private demo."
      description="Step into Vision Pro at a Millwright retail studio or request a concierge delivery."
      className="bg-gradient-to-b from-ink-950 to-black"
    >
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-2xl gap-5"
        noValidate
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name" name="name" type="text" required autoComplete="name" />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
        </div>
        <Field
          label="Tell us what you'd like to see"
          name="message"
          multiline
          required
          rows={4}
        />
        {/* Honeypot for spam bots — hidden from real users + screen readers. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[10000px] top-auto h-0 w-0 opacity-0"
        />
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-400" aria-live="polite">
            {message}
          </p>
          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium text-ink-950 transition-opacity disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Request demo'}
          </motion.button>
        </div>
        {status === 'success' && (
          <p className="text-sm text-emerald-400" role="status">
            Your request is on its way.
          </p>
        )}
      </motion.form>
    </Section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  autoComplete?: string;
};

function Field({ label, name, type = 'text', required, multiline, rows, autoComplete }: FieldProps) {
  const id = `field-${name}`;
  const baseClass =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-50 placeholder:text-ink-400/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-accent-500/40';
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs uppercase tracking-4 text-ink-400">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows ?? 4}
          className={baseClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={baseClass}
        />
      )}
    </label>
  );
}