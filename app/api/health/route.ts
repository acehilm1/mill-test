import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const JSON_HEADERS = { 'content-type': 'application/json' };

export async function GET() {
  return new NextResponse(JSON.stringify({ status: 'ok', time: new Date().toISOString() }), {
    status: 200,
    headers: JSON_HEADERS,
  });
}