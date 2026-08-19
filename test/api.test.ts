import { afterEach, describe, expect, it, vi } from 'vitest';
import { _resetRateLimiter } from '../app/lib/rateLimit';

const originalSmtp = process.env.SMTP_HOST;

afterEach(() => {
  _resetRateLimiter();
  vi.restoreAllMocks();
  if (originalSmtp === undefined) delete process.env.SMTP_HOST;
  else process.env.SMTP_HOST = originalSmtp;
});

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  it('accepts a valid submission and returns 200', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(
      makeRequest({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        message: 'I would love a private demo.',
        website: '',
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(typeof body.receivedAt).toBe('string');
  });

  it('returns 400 on malformed JSON', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{not-json',
      }),
    );
    expect(res.status).toBe(400);
  });

  it('returns 400 with helpful error when fields are missing', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(makeRequest({ name: 'A', email: 'bad', message: 'short' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(typeof body.error).toBe('string');
    expect(body.error.length).toBeGreaterThan(0);
  });

  it('silently rejects honeypot submissions with 200', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(
      makeRequest({
        name: 'Bot',
        email: 'bot@spam.example',
        message: 'Buy meds cheap please click here',
        website: 'http://spam.example',
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  it('returns 429 after the rate limit is exhausted', async () => {
    const { POST } = await import('../app/api/contact/route');
    const validPayload = {
      name: 'Rate Tester',
      email: 'rate@example.com',
      message: 'Hello I would like a demo please.',
      website: '',
    };
    // Burst capacity is 5 — exhaust it then expect a 429.
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validPayload));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(makeRequest(validPayload));
    expect(blocked.status).toBe(429);
  });

  it('keys the rate limit by forwarded IP so different IPs are independent', async () => {
    const { POST } = await import('../app/api/contact/route');
    const validPayload = {
      name: 'Rate Tester',
      email: 'rate@example.com',
      message: 'Hello I would like a demo please.',
      website: '',
    };
    for (let i = 0; i < 5; i++) {
      const res = await POST(
        makeRequest(validPayload, { 'x-forwarded-for': '10.0.0.1' }),
      );
      expect(res.status).toBe(200);
    }
    const otherIp = await POST(
      makeRequest(validPayload, { 'x-forwarded-for': '10.0.0.2' }),
    );
    expect(otherIp.status).toBe(200);
  });

  it('handles unicode + emoji payload without erroring', async () => {
    const { POST } = await import('../app/api/contact/route');
    const res = await POST(
      makeRequest({
        name: '李雷',
        email: 'li.lei@example.com',
        message: '你好！预约一次演示 🎉',
        website: '',
      }),
    );
    expect(res.status).toBe(200);
  });
});

describe('GET /api/products', () => {
  it('returns a JSON product list with 200', async () => {
    const { GET } = await import('../app/api/products/route');
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    for (const product of body.products) {
      expect(typeof product.id).toBe('string');
      expect(typeof product.name).toBe('string');
      expect(typeof product.startingPrice).toBe('number');
    }
  });
});

describe('GET /api/health', () => {
  it('returns ok status', async () => {
    const { GET } = await import('../app/api/health/route');
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(typeof body.time).toBe('string');
  });
});