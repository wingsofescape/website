/**
 * Feature Flags Configuration
 *
 * This file contains all feature flags and configuration variables
 * used for A/B testing, feature toggles, and controlling website
 * functionality and appearance.
 *
 * @example
 * import { featureFlags } from '@/config/featureFlags';
 * if (featureFlags.showCountrySelector) {
 *   // Render country selector
 * }
 */

export interface FeatureFlags {
  // Header/Navigation Features
  showCountrySelector: boolean;
  showCurrencySelector: boolean;

  // Future feature flags can be added here
  // Examples:
  // enableDarkMode: boolean;
  // showPromosBanner: boolean;
  // enableChatBot: boolean;
  // showTestimonials: boolean;
  // enableNewCheckoutFlow: boolean;
}

/**
 * Feature flags configuration object
 * Set these values to true/false to enable/disable features
 */
export const featureFlags: FeatureFlags = {
  // Header/Navigation Features
  showCountrySelector: false,
  showCurrencySelector: false,
};

/**
 * Helper function to check if a feature is enabled
 * @param flagName - The name of the feature flag
 * @returns boolean indicating if the feature is enabled
 */
export const getConfig = (flagName: keyof FeatureFlags): boolean => {
  return featureFlags[flagName];
};

/**
 * Environment-based feature flag overrides
 * These can override the default values based on environment
 */
export const getFeatureFlags = (): FeatureFlags => {
  const baseFlags = { ...featureFlags };

  // Override flags based on environment
  if (process.env.NODE_ENV === "development") {
    // Enable certain features only in development
    // baseFlags.enableDebugMode = true;
  }

  if (process.env.NODE_ENV === "production") {
    // Production-specific overrides
    // baseFlags.enableAnalytics = true;
  }

  return baseFlags;
};

export default featureFlags;
