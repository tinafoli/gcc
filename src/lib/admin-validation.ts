const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim().toLowerCase());
}

export function isValidHttpUrl(value: string): boolean {
  const raw = value.trim();
  if (!raw) return false;
  try {
    const url = new URL(raw);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isLikelyImagePathOrUrl(value: string): boolean {
  const raw = value.trim();
  if (!raw) return true;
  if (raw.startsWith('/')) return true;
  if (!isValidHttpUrl(raw)) return false;
  return /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(raw);
}

export function isStrongPassword(value: string): boolean {
  if (value.length < 12) return false;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);
  return hasLower && hasUpper && hasNumber && hasSymbol;
}

export function sanitizeText(value: unknown, max = 5000): string {
  const str = String(value ?? '').trim();
  return str.slice(0, max);
}
