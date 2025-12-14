/**
 * Cookie Consent Management Utility
 * Handles user cookie preferences for GDPR/CCPA compliance
 */

const CONSENT_COOKIE_NAME = "supracarer_cookie_consent";
const CONSENT_EXPIRY_DAYS = 365; // 1 year

// Cookie categories
export const COOKIE_CATEGORIES = {
  ESSENTIAL: "essential", // Always allowed - login, security
  FUNCTIONAL: "functional", // Preferences, language
  ANALYTICS: "analytics", // Google Analytics, tracking
  MARKETING: "marketing", // Ads, retargeting
};

// Default consent state (only essential allowed by default)
const DEFAULT_CONSENT = {
  essential: true, // Always true - required for site function
  functional: false,
  analytics: false,
  marketing: false,
  timestamp: null,
};

/**
 * Get the current consent state from cookie/localStorage
 */
export const getConsentState = () => {
  if (typeof window === "undefined") return DEFAULT_CONSENT;

  try {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure essential is always true
      return { ...parsed, essential: true };
    }
  } catch (error) {
    console.error("Error reading cookie consent:", error);
  }

  return DEFAULT_CONSENT;
};

/**
 * Check if user has given consent (any response)
 */
export const hasUserConsented = () => {
  if (typeof window === "undefined") return false;

  try {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
    return stored !== null;
  } catch (error) {
    return false;
  }
};

/**
 * Save consent preferences
 */
export const saveConsent = (preferences) => {
  if (typeof window === "undefined") return;

  const consent = {
    ...DEFAULT_CONSENT,
    ...preferences,
    essential: true, // Always enforce essential
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consent));

    // Also set a cookie for server-side detection
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(consent)
    )};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;

    // Trigger consent update event
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdate", { detail: consent })
    );

    // Update Google Analytics consent if analytics is granted
    if (consent.analytics && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }

    // Update marketing consent
    if (consent.marketing && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
  } catch (error) {
    console.error("Error saving cookie consent:", error);
  }
};

/**
 * Accept all cookies
 */
export const acceptAllCookies = () => {
  saveConsent({
    essential: true,
    functional: true,
    analytics: true,
    marketing: true,
  });
};

/**
 * Reject all non-essential cookies
 */
export const rejectAllCookies = () => {
  saveConsent({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
};

/**
 * Check if a specific category is allowed
 */
export const isCategoryAllowed = (category) => {
  const consent = getConsentState();
  return consent[category] === true;
};

/**
 * Clear consent (for testing or user request)
 */
export const clearConsent = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
    document.cookie = `${CONSENT_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  } catch (error) {
    console.error("Error clearing cookie consent:", error);
  }
};

/**
 * Initialize Google Analytics consent mode
 * Should be called before GA loads
 */
export const initializeConsentMode = () => {
  if (typeof window === "undefined") return;

  const consent = getConsentState();
  const hasConsented = hasUserConsented();

  // Set default consent state
  if (typeof window.gtag === "function") {
    window.gtag("consent", "default", {
      analytics_storage:
        hasConsented && consent.analytics ? "granted" : "denied",
      ad_storage: hasConsented && consent.marketing ? "granted" : "denied",
      ad_user_data: hasConsented && consent.marketing ? "granted" : "denied",
      ad_personalization:
        hasConsented && consent.marketing ? "granted" : "denied",
      functionality_storage:
        hasConsented && consent.functional ? "granted" : "denied",
      personalization_storage:
        hasConsented && consent.functional ? "granted" : "denied",
      security_storage: "granted", // Always allowed for essential
    });
  }
};
