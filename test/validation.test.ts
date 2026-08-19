import { describe, expect, it } from 'vitest';
import {
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  validateContact,
} from '../app/lib/validation';

describe('validateContact', () => {
  it('accepts a well-formed payload', () => {
    const result = validateContact({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I would love a private demo please.',
      website: '',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe('Ada Lovelace');
      expect(result.data.email).toBe('ada@example.com');
    }
  });

  it('rejects missing fields', () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it('rejects malformed email addresses', () => {
    for (const bad of ['plainstring', 'a@b', 'a@b.', '@b.com', 'a@.com']) {
      const result = validateContact({
        name: 'Test User',
        email: bad,
        message: 'Hello there I am interested',
      });
      expect(result.ok, `expected email ${bad} to fail`).toBe(false);
    }
  });

  it('trims whitespace before validation', () => {
    const result = validateContact({
      name: '   Grace Hopper   ',
      email: '  grace@example.com  ',
      message: '   please show me the headset   ',
      website: '',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe('Grace Hopper');
      expect(result.data.email).toBe('grace@example.com');
      expect(result.data.message).toBe('please show me the headset');
    }
  });

  it('rejects an email longer than the RFC 5321 practical maximum', () => {
    const longLocal = 'a'.repeat(MAX_EMAIL_LENGTH);
    const result = validateContact({
      name: 'A B',
      email: `${longLocal}@x.io`,
      message: 'Hello world this is a message.',
    });
    expect(result.ok).toBe(false);
  });

  it('rejects messages below the 10-character minimum', () => {
    const result = validateContact({
      name: 'Anon',
      email: 'anon@example.com',
      message: 'short',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(' ')).toMatch(/Message/);
    }
  });

  it('rejects messages above the 5000-character maximum', () => {
    const result = validateContact({
      name: 'Anon',
      email: 'anon@example.com',
      message: 'x'.repeat(MAX_MESSAGE_LENGTH + 1),
    });
    expect(result.ok).toBe(false);
  });

  it('accepts the boundary-length name', () => {
    const result = validateContact({
      name: 'A'.repeat(MAX_NAME_LENGTH),
      email: 'a@b.co',
      message: 'Hello there I would like a demo',
      website: '',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects a single-character name', () => {
    const result = validateContact({
      name: 'A',
      email: 'a@b.co',
      message: 'Hello there I would like a demo',
    });
    expect(result.ok).toBe(false);
  });

  it('treats honeypot submission as silent failure (no errors leak)', () => {
    const result = validateContact({
      name: 'Bot',
      email: 'bot@spam.example',
      message: 'Buy meds cheap',
      website: 'http://spam.example',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual([]);
    }
  });

  it('rejects non-object input safely', () => {
    for (const input of [null, undefined, 42, 'string', true, []]) {
      const result = validateContact(input);
      expect(result.ok, `expected ${String(input)} to fail`).toBe(false);
    }
  });

  it('rejects non-string field types', () => {
    const result = validateContact({
      name: 1234,
      email: ['bad'],
      message: { evil: true },
      website: undefined,
    });
    expect(result.ok).toBe(false);
  });

  it('handles unicode, emoji, and CJK characters in the message', () => {
    const result = validateContact({
      name: '李雷',
      email: 'li.lei@example.com',
      message: '你好！我想预约一次演示 🎉✨ — thanks.',
      website: '',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.message).toContain('🎉');
      expect(result.data.name).toBe('李雷');
    }
  });
});