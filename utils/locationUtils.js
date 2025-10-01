import toast from "react-hot-toast";

/**
 * Get user location from IP address using ipapi.co service
 * @returns {Promise<{success: boolean, coords?: object, city?: string, country?: string, error?: string}>}
 */
export const getLocationFromIP = async () => {
  try {
    toast.loading("Getting location from IP...");
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    if (data.latitude && data.longitude) {
      const coords = {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      };

      toast.dismiss();
      return {
        success: true,
        coords,
        city: data.city,
        country: data.country_name,
      };
    } else {
      toast.dismiss();
      return {
        success: false,
        error: "Could not determine location from IP",
      };
    }
  } catch (error) {
    toast.dismiss();
    return {
      success: false,
      error: "Failed to get location. Please try manual entry.",
    };
  }
};

/**
 * Convert address to coordinates using OpenStreetMap Nominatim service
 * @param {string} address - The address to geocode
 * @returns {Promise<{success: boolean, coords?: object, displayName?: string, error?: string}>}
 */
export const geocodeAddress = async (address) => {
  if (!address.trim()) {
    return {
      success: false,
      error: "Please enter an address",
    };
  }

  try {
    toast.loading("Finding location...");

    // Using OpenStreetMap Nominatim (free service)
    const nominatimResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1&addressdetails=1`
    );

    const nominatimData = await nominatimResponse.json();

    if (nominatimData && nominatimData.length > 0) {
      const result = nominatimData[0];
      const coords = {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };

      toast.dismiss();
      return {
        success: true,
        coords,
        displayName: result.display_name,
      };
    } else {
      toast.dismiss();
      return {
        success: false,
        error: "Could not find that location. Please try a different address.",
      };
    }
  } catch (error) {
    toast.dismiss();
    return {
      success: false,
      error: "Failed to find location. Please try again.",
    };
  }
};

/**
 * Get user location using browser geolocation API with silent fallback to IP-based location
 * @param {function} onSuccess - Callback function for successful location retrieval
 * @param {function} ipFallback - Function to call for IP-based fallback
 */
export const getCurrentLocation = (onSuccess, ipFallback) => {
  if (!navigator.geolocation) {
    // Silently fallback to IP-based location without toast
    ipFallback();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      onSuccess(coords);
    },
    (error) => {
      // Silently fallback to IP-based location
      ipFallback();
    },
    {
      enableHighAccuracy: false, // Set to false for faster response
      timeout: 10000, // 10 seconds timeout
      maximumAge: 300000, // 5 minutes cache
    }
  );
};
