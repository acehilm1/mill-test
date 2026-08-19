/**
 * Tiny in-memory token-bucket rate limiter.
 *
 * ponytail: single-process Map. Fine for single-instance Vercel functions
 * and dev. Promote to Upstash/Redis when you need cross-region state.
 */

type Bucket = { tokens: number; updatedAt: number };

const buckets = new Map<string, Bucket>();

const REFILL_PER_SECOND = 1; // 1 token per second
const MAX_TOKENS = 5; // burst capacity

export function allow(key: string, cost = 1): boolean {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: MAX_TOKENS, updatedAt: now };
  const elapsedSeconds = (now - bucket.updatedAt) / 1000;
  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + elapsedSeconds * REFILL_PER_SECOND);
  bucket.updatedAt = now;
  if (bucket.tokens < cost) {
    buckets.set(key, bucket);
    return false;
  }
  bucket.tokens -= cost;
  buckets.set(key, bucket);
  return true;
}

/** Exposed for tests so buckets don't leak across cases. */
export function _resetRateLimiter(): void {
  buckets.clear();
}