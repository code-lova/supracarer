/**
 * Cloudflare-friendly API request utility
 * Adds headers to help bypass Cloudflare challenges for legitimate API requests
 */

export const cloudflareAPIFetch = async (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'SupraCarer-Frontend/1.0',
    // Add cache control to help with Cloudflare caching
    'Cache-Control': 'no-cache',
    // Add origin header for CORS
    ...(typeof window !== 'undefined' && { 'Origin': window.location.origin }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if we got HTML instead of JSON (Cloudflare challenge page)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      // This likely means we hit a Cloudflare challenge
      throw new Error('Received HTML response instead of JSON. This may be a Cloudflare challenge. Please check your Cloudflare configuration.');
    }

    return response;
  } catch (error) {
    // Enhanced error handling for Cloudflare issues
    if (error.message.includes('Unexpected token') && error.message.includes('DOCTYPE')) {
      throw new Error('Cloudflare challenge detected. Please configure Cloudflare to allow API requests from your domain.');
    }
    throw error;
  }
};

// Export a version specifically for NextAuth
export const nextAuthAPIFetch = async (url, options = {}) => {
  return cloudflareAPIFetch(url, {
    ...options,
    headers: {
      // Add specific headers for authentication endpoints
      'X-Auth-Request': 'true',
      'X-Frontend-Domain': typeof window !== 'undefined' ? window.location.hostname : 'supracarer.com',
      ...options.headers,
    },
  });
};