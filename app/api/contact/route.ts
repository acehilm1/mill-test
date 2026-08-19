import { NextResponse } from 'next/server';
import { allow } from '@/app/lib/rateLimit';
import { validateContact } from '@/app/lib/validation';

export const runtime = 'nodejs';

const JSON_HEADERS = { 'content-type': 'application/json' };

export async function POST(request: Request) {
  // Best-effort client IP — Vercel populates this header; falls back to a
  // generic bucket in tests / local dev.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  if (!allow(`contact:${ip}`)) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again in a few seconds.' }),
      { status: 429, headers: JSON_HEADERS },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid JSON.' }),
      { status: 400, headers: JSON_HEADERS },
    );
  }

  const result = validateContact(body);
  if (!result.ok) {
    // Honeypot triggered — pretend success without persisting.
    if (result.errors.length === 0) {
      return new NextResponse(JSON.stringify({ ok: true }), {
        status: 200,
        headers: JSON_HEADERS,
      });
    }
    return new NextResponse(
      JSON.stringify({ error: result.errors.join(' ') }),
      { status: 400, headers: JSON_HEADERS },
    );
  }

  // In production, forward to email / CRM. In dev, just log.
  if (process.env.SMTP_HOST) {
    // ponytail: integrate nodemailer / Resend here when you wire real mail.
  } else {
    console.info('[contact] received message', {
      name: result.data.name,
      email: result.data.email,
      length: result.data.message.length,
    });
  }

  return new NextResponse(
    JSON.stringify({ ok: true, receivedAt: new Date().toISOString() }),
    { status: 200, headers: JSON_HEADERS },
  );
}