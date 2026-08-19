/**
 * Server-side validation for /api/contact.
 *
 * Kept dependency-free so the route stays small and auditable. Returns
 * either a normalized payload or a list of error messages.
 */

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { ok: false, errors: ['Invalid request body.'] };
  }

  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const email = typeof raw.email === 'string' ? raw.email.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';
  const website = typeof raw.website === 'string' ? raw.website : '';

  // Honeypot — silently treat as success but do nothing.
  if (website.length > 0) {
    return { ok: false, errors: [] };
  }

  if (name.length < 2 || name.length > 120) {
    errors.push('Name must be between 2 and 120 characters.');
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.push('Please provide a valid email address.');
  }
  if (message.length < 10 || message.length > 5000) {
    errors.push('Message must be between 10 and 5000 characters.');
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message, website } };
}

export const MAX_MESSAGE_LENGTH = 5000;
export const MAX_NAME_LENGTH = 120;
export const MAX_EMAIL_LENGTH = 254;