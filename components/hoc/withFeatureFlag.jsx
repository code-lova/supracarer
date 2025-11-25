"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isFeatureEnabled } from "@config/features";
import LoadingStateUI from "@components/core/loading";

/**
 * Higher-Order Component to protect feature-flagged routes
 * Redirects users when trying to access disabled features
 */
const withFeatureFlag = (
  WrappedComponent,
  featureName,
  redirectTo = "/health-service"
) => {
  const FeatureProtectedComponent = (props) => {
    const router = useRouter();
    const isEnabled = isFeatureEnabled(featureName);

    useEffect(() => {
      if (!isEnabled) {
        console.warn(
          `Feature "${featureName}" is disabled. Redirecting to ${redirectTo}`
        );
        router.replace(redirectTo);
      }
    }, [isEnabled, router]);

    // Show loading while redirecting
    if (!isEnabled) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingStateUI label="Redirecting..." />
        </div>
      );
    }

    // Render the component if feature is enabled
    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  FeatureProtectedComponent.displayName = `withFeatureFlag(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return FeatureProtectedComponent;
};

/**
 * Specific HOC for GRS-protected components
 */
export const withGRSFeature = (WrappedComponent) => {
  return withFeatureFlag(
    WrappedComponent,
    "GUIDED_RATE_SYSTEM",
    "/health-service"
  );
};

/**
 * Generic feature flag HOC for other features
 */
export default withFeatureFlag;
