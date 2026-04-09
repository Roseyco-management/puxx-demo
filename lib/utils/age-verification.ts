/**
 * Age Verification Utilities
 * Handles cookie and localStorage management for age verification
 */

const AGE_VERIFICATION_KEY = 'puxx_age_verified';
const COOKIE_EXPIRY_DAYS = 30;

/**
 * Set a cookie with expiration
 */
function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * Check if user has been age verified
 */
export function isAgeVerified(): boolean {
  // Check both cookie and localStorage for redundancy
  const cookieVerified = getCookie(AGE_VERIFICATION_KEY) === 'true';
  const localStorageVerified =
    typeof window !== 'undefined' &&
    localStorage.getItem(AGE_VERIFICATION_KEY) === 'true';

  return cookieVerified || localStorageVerified;
}

/**
 * Set age verification status
 */
export function setAgeVerified(): void {
  // Set cookie with 30-day expiration
  setCookie(AGE_VERIFICATION_KEY, 'true', COOKIE_EXPIRY_DAYS);

  // Also set localStorage as backup
  if (typeof window !== 'undefined') {
    localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
    localStorage.setItem(
      `${AGE_VERIFICATION_KEY}_timestamp`,
      new Date().toISOString()
    );
  }
}

/**
 * Clear age verification (for testing purposes)
 */
export function clearAgeVerification(): void {
  // Clear cookie by setting expiry to past
  setCookie(AGE_VERIFICATION_KEY, '', -1);

  // Clear localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AGE_VERIFICATION_KEY);
    localStorage.removeItem(`${AGE_VERIFICATION_KEY}_timestamp`);
  }
}

/**
 * Get the timestamp when age was verified
 */
export function getVerificationTimestamp(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`${AGE_VERIFICATION_KEY}_timestamp`);
}
