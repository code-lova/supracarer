// Get Google Analytics data
export const getGoogleAnalytics = async () => {
  try {
    const response = await fetch("/api/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Google Analytics:", error);
    throw error;
  }
};

// Get real-time analytics data
export const getRealTimeAnalytics = async () => {
  try {
    const response = await fetch("/api/analytics?type=realtime", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching real-time analytics:", error);
    throw error;
  }
};
