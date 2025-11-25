// Feature flags configuration
export const FEATURES = {
  GUIDED_RATE_SYSTEM: {
    enabled: false, // Only enable in development
    description: "Advanced rate calculation system for health workers",
    // Alternative: use environment variable
    // enabled: process.env.NEXT_PUBLIC_ENABLE_GUIDED_RATE_SYSTEM === 'true',
    dependencies: [], // Features that depend on this
    routes: ["/health-service/guided-rate-system"], // Routes that should be hidden when disabled
  },

  // GRS Related Features - all should be disabled when GRS is disabled
  GRS_ANALYTICS: {
    enabled: process.env.NODE_ENV === "development",
    description: "Analytics for guided rate system",
    dependencies: ["GUIDED_RATE_SYSTEM"], // Depends on GRS
  },

  GRS_NOTIFICATIONS: {
    enabled: process.env.NODE_ENV === "development",
    description: "Notifications related to rate updates",
    dependencies: ["GUIDED_RATE_SYSTEM"],
  },

  CLIENT_SERVICE_SELECTION: {
    enabled: false, // Disabled - collecting manually for now
    description: "Allow clients to select services during booking",
    dependencies: [],
  },
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (featureName) => {
  const feature = FEATURES[featureName];
  if (!feature) return false;

  // Check if feature is enabled
  if (!feature.enabled) return false;

  // Check dependencies - if any dependency is disabled, this feature should be disabled
  if (feature.dependencies && feature.dependencies.length > 0) {
    return feature.dependencies.every((dep) => isFeatureEnabled(dep));
  }

  return true;
};

// Check if a route should be accessible based on feature flags
export const isRouteEnabled = (routePath) => {
  return Object.entries(FEATURES).some(([featureName, config]) => {
    if (!config.routes) return true;
    const isRouteInFeature = config.routes.includes(routePath);
    if (isRouteInFeature) {
      return isFeatureEnabled(featureName);
    }
    return true;
  });
};

// Get all enabled features for debugging
export const getEnabledFeatures = () => {
  return Object.entries(FEATURES)
    .filter(([name, _]) => isFeatureEnabled(name))
    .map(([name, _]) => name);
};

// Get disabled features for debugging
export const getDisabledFeatures = () => {
  return Object.entries(FEATURES)
    .filter(([name, _]) => !isFeatureEnabled(name))
    .map(([name, config]) => ({
      name,
      reason: config.description || "No description",
    }));
};

// Development helper - log feature status
export const logFeatureStatus = () => {
  if (process.env.NODE_ENV === "development") {
    console.group("🎛️ Feature Flags Status");
    console.log("✅ Enabled:", getEnabledFeatures());
    console.log(
      "❌ Disabled:",
      getDisabledFeatures().map((f) => f.name)
    );
    console.log("🌍 Environment:", process.env.NODE_ENV);
    console.groupEnd();
  }
};
