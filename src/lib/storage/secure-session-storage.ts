/**
 * Secure Session Storage Obfuscation Utility
 * 
 * Obfuscates sensitive client-side session data and keys before writing to sessionStorage,
 * ensuring that data inspection via browser DevTools reveals only non-descriptive encoded tokens.
 */

const SALT = 'ds_sec_v2_9f8b2c';
const PAYLOAD_PREFIX = '_ds_enc_v1_';
const KEY_PREFIX = '_ds_sk_';

/**
 * Obfuscates a string value using UTF-8 URI encoding, cyclic XOR transformation, and Base64.
 */
export function obfuscateSessionData(value: string): string {
  if (typeof value !== 'string') {
    try {
      value = JSON.stringify(value);
    } catch {
      value = String(value);
    }
  }

  try {
    // 1. Safely encode UTF-8 to handle multi-byte / accented / unicode characters
    const utf8 = encodeURIComponent(value);

    // 2. Cyclic XOR transformation with salt
    let xor = '';
    for (let i = 0; i < utf8.length; i++) {
      xor += String.fromCharCode(utf8.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length));
    }

    // 3. Base64 encoding with signature prefix
    return PAYLOAD_PREFIX + btoa(xor);
  } catch {
    // Fallback if environment lacks btoa
    return value;
  }
}

/**
 * Deobfuscates an obfuscated string value back to its original plain text.
 */
export function deobfuscateSessionData(encoded: string | null): string | null {
  if (!encoded || typeof encoded !== 'string') return null;

  // If data was saved before obfuscation was enabled, return as-is for backward compatibility
  if (!encoded.startsWith(PAYLOAD_PREFIX)) {
    return encoded;
  }

  try {
    // 1. Strip signature prefix
    const base64 = encoded.slice(PAYLOAD_PREFIX.length);

    // 2. Decode Base64
    const xor = atob(base64);

    // 3. Reverse cyclic XOR transformation
    let utf8 = '';
    for (let i = 0; i < xor.length; i++) {
      utf8 += String.fromCharCode(xor.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length));
    }

    // 4. Decode UTF-8 URI string
    return decodeURIComponent(utf8);
  } catch {
    return null;
  }
}

/**
 * Generates an obfuscated key name so key identifiers (e.g. location, preferences) are not exposed.
 */
export function getObfuscatedSessionKey(key: string): string {
  try {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash |= 0;
    }
    const cleanB64 = btoa(key).replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    return `${KEY_PREFIX}${Math.abs(hash).toString(36)}_${cleanB64}`;
  } catch {
    return `${KEY_PREFIX}${key}`;
  }
}

/**
 * Sets an obfuscated key-value pair in sessionStorage.
 * Also purges any legacy plaintext key that may have been previously set.
 */
export function setSecureSessionItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;

  try {
    const obfKey = getObfuscatedSessionKey(key);
    const obfValue = obfuscateSessionData(value);

    window.sessionStorage.setItem(obfKey, obfValue);

    // Clean up legacy un-obfuscated key if it exists
    if (obfKey !== key) {
      window.sessionStorage.removeItem(key);
    }
  } catch {}
}

/**
 * Retrieves and deobfuscates a value from sessionStorage by its logical key.
 * Transparently falls back to and migrates legacy plaintext keys.
 */
export function getSecureSessionItem(key: string): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const obfKey = getObfuscatedSessionKey(key);
    const rawObf = window.sessionStorage.getItem(obfKey);

    if (rawObf) {
      return deobfuscateSessionData(rawObf);
    }

    // Fallback: check if legacy plaintext key exists
    if (obfKey !== key) {
      const legacyRaw = window.sessionStorage.getItem(key);
      if (legacyRaw) {
        // Transparently migrate to obfuscated format
        setSecureSessionItem(key, legacyRaw);
        return legacyRaw;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Removes an item from sessionStorage by its logical key (purges both obfuscated and plain keys).
 */
export function removeSecureSessionItem(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    const obfKey = getObfuscatedSessionKey(key);
    window.sessionStorage.removeItem(obfKey);
    if (obfKey !== key) {
      window.sessionStorage.removeItem(key);
    }
  } catch {}
}

/**
 * Convenience helper to serialize and store JSON data obfuscated in sessionStorage.
 */
export function setSecureSessionJSON<T>(key: string, data: T): void {
  try {
    setSecureSessionItem(key, JSON.stringify(data));
  } catch {}
}

/**
 * Convenience helper to retrieve and parse obfuscated JSON data from sessionStorage.
 */
export function getSecureSessionJSON<T>(key: string): T | null {
  try {
    const raw = getSecureSessionItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
