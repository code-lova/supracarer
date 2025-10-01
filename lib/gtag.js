// Google Analytics configuration for Next.js
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// gtag function
export const gtag = (...args) => {
  if (typeof window !== "undefined") {
    window.gtag(...args);
  }
};

// Track page views
export const pageview = (url) => {
  if (GA_MEASUREMENT_ID) {
    gtag("event", "page_view", {
      page_path: url,
    });
  }
};

// Track events
export const event = (action, event_category, event_label, value) => {
  gtag("event", action, {
    event_category,
    event_label,
    value,
  });
};
