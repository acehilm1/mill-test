import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const products = [
  {
    id: 'vision-pro',
    name: 'Millwright Vision Pro',
    tagline: 'Spatial computing, beautifully.',
    startingPrice: 3499,
    currency: 'USD',
    availability: 'available',
  },
  {
    id: 'vision-pro-lite',
    name: 'Millwright Vision Lite',
    tagline: 'Spatial computing, lighter still.',
    startingPrice: 1999,
    currency: 'USD',
    availability: 'preorder',
  },
];

const JSON_HEADERS = { 'content-type': 'application/json' };

export async function GET() {
  return new NextResponse(JSON.stringify({ products }), {
    status: 200,
    headers: JSON_HEADERS,
  });
}