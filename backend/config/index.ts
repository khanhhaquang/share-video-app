// import { load } from 'https://deno.land/std/dotenv/mod.ts';

const JWT_CRYPTO_KEY = await crypto.subtle.generateKey({ name: 'HMAC', hash: 'SHA-512' }, true, ['sign', 'verify']);

export { JWT_CRYPTO_KEY };
