/**
 * Session cache management utility
 * Helps handle Cloudflare caching issues with NextAuth sessions
 */

/**
 * Clear session cache by invalidating browser cache
 * This helps prevent stale session data when logging in/out repeatedly
 */
export const clearSessionCache = async () => {
  try {
    // Clear any cached session requests
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const sessionCaches = cacheNames.filter(name => name.includes('session') || name.includes('auth'));
      
      for (const cacheName of sessionCaches) {
        await caches.delete(cacheName);
      }
    }
    
    // Clear localStorage/sessionStorage auth tokens if any
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
      } catch (e) {
        // Ignore errors from storage clearing
      }
    }
  } catch (error) {
    console.error("Error clearing session cache:", error);
  }
};

/**
 * Invalidate Cloudflare cache for session endpoint
 * Adds a timestamp to ensure fresh requests
 */
export const getSessionWithCacheBypass = async () => {
  try {
    // Add timestamp to bypass Cloudflare caching
    const response = await fetch(`/api/auth/session?t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch session');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching session with cache bypass:", error);
    return null;
  }
};

/**
 * Wait for session to be available after login
 * With retries to handle Cloudflare delays
 */
export const waitForSessionAvailable = async (maxRetries = 3, delayMs = 300) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const session = await getSessionWithCacheBypass();
      if (session?.user) {
        return session;
      }
    } catch (error) {
      console.error(`Session check attempt ${i + 1} failed:`, error);
    }
    
    // Wait before retrying
    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return null;
};
