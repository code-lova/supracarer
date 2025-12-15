"use client";
import { useEffect, useRef, useCallback } from "react";

/**
 * Cloudflare Turnstile Component
 *
 * A privacy-focused CAPTCHA alternative from Cloudflare.
 *
 * @param {Object} props
 * @param {string} props.siteKey - Your Turnstile site key (from Cloudflare dashboard)
 * @param {function} props.onVerify - Callback when verification succeeds, receives token
 * @param {function} props.onError - Callback when verification fails
 * @param {function} props.onExpire - Callback when token expires
 * @param {string} props.theme - 'light', 'dark', or 'auto'
 * @param {string} props.size - 'normal', 'compact', or 'invisible'
 * @param {string} props.className - Additional CSS classes
 */
const Turnstile = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = "auto",
  size = "normal",
  className = "",
}) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  const handleCallback = useCallback(
    (token) => {
      if (onVerify) {
        onVerify(token);
      }
    },
    [onVerify]
  );

  const handleError = useCallback(() => {
    if (onError) {
      onError();
    }
  }, [onError]);

  const handleExpire = useCallback(() => {
    if (onExpire) {
      onExpire();
    }
  }, [onExpire]);

  useEffect(() => {
    // Load Turnstile script if not already loaded
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (window.turnstile) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(
          'script[src*="turnstile"]'
        );
        if (existingScript) {
          existingScript.addEventListener("load", resolve);
          existingScript.addEventListener("error", reject);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initTurnstile = async () => {
      try {
        await loadScript();

        // Wait for turnstile to be available
        const waitForTurnstile = () => {
          return new Promise((resolve) => {
            if (window.turnstile) {
              resolve();
            } else {
              const interval = setInterval(() => {
                if (window.turnstile) {
                  clearInterval(interval);
                  resolve();
                }
              }, 100);
            }
          });
        };

        await waitForTurnstile();

        // Remove existing widget if any
        if (widgetIdRef.current !== null && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // Widget might already be removed
          }
        }

        // Render new widget
        if (containerRef.current && window.turnstile) {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: handleCallback,
            "error-callback": handleError,
            "expired-callback": handleExpire,
            theme: theme,
            size: size,
          });
        }
      } catch (error) {
        console.error("Failed to load Turnstile:", error);
        if (onError) {
          onError();
        }
      }
    };

    if (siteKey) {
      initTurnstile();
    }

    // Cleanup
    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Widget might already be removed
        }
      }
    };
  }, [siteKey, theme, size, handleCallback, handleError, handleExpire]);

  // Method to reset the widget (can be called via ref)
  const reset = useCallback(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  if (!siteKey) {
    // In development without a site key, show a placeholder
    return (
      <div
        className={`bg-gray-100 border border-gray-300 rounded-lg p-4 text-center text-sm text-gray-500 ${className}`}
      >
        <p>⚠️ Turnstile not configured</p>
        <p className="text-xs mt-1">
          Add NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`cf-turnstile ${className}`}
      data-sitekey={siteKey}
      data-theme={theme}
      data-size={size}
    />
  );
};

export default Turnstile;
