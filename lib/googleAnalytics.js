import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { JWT } from "google-auth-library";

// Initialize the Analytics Data API client
let analyticsDataClient;

function getAnalyticsClient() {
  if (!analyticsDataClient) {
    // Option 1: Using service account key file
    if (process.env.GOOGLE_ANALYTICS_CREDENTIALS) {
      analyticsDataClient = new BetaAnalyticsDataClient({
        keyFilename: process.env.GOOGLE_ANALYTICS_CREDENTIALS,
      });
    }
    // Option 2: Using environment variables (recommended for production)
    else if (process.env.GOOGLE_ANALYTICS_PRIVATE_KEY) {
      const credentials = {
        client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
        project_id: process.env.GOOGLE_ANALYTICS_PROJECT_ID,
      };

      analyticsDataClient = new BetaAnalyticsDataClient({
        credentials,
      });
    } else {
      throw new Error("Google Analytics credentials not configured properly");
    }
  }

  return analyticsDataClient;
}

// Get property ID
function getPropertyId() {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
  if (!propertyId) {
    throw new Error(
      "GOOGLE_ANALYTICS_PROPERTY_ID environment variable is not set"
    );
  }
  return `properties/${propertyId}`;
}

// Fetch analytics data
export async function getAnalyticsData() {
  try {
    const analyticsDataClient = getAnalyticsClient();
    const propertyId = getPropertyId();

    // Get date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    // Run multiple reports in parallel
    const [
      visitorsReport,
      bounceRateReport,
      pagesReport,
      devicesReport,
      locationsReport,
    ] = await Promise.all([
      // Visitors and sessions
      analyticsDataClient.runReport({
        property: propertyId,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [],
        metrics: [
          { name: "activeUsers" },
          { name: "totalUsers" },
          { name: "sessions" },
        ],
      }),

      // Bounce rate
      analyticsDataClient.runReport({
        property: propertyId,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [],
        metrics: [{ name: "bounceRate" }],
      }),

      // Page views
      analyticsDataClient.runReport({
        property: propertyId,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [],
        metrics: [{ name: "screenPageViews" }],
      }),

      // Devices
      analyticsDataClient.runReport({
        property: propertyId,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [
          {
            metric: {
              metricName: "activeUsers",
            },
            desc: true,
          },
        ],
        limit: 3,
      }),

      // Locations (Countries)
      analyticsDataClient.runReport({
        property: propertyId,
        dateRanges: [
          {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        ],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [
          {
            metric: {
              metricName: "activeUsers",
            },
            desc: true,
          },
        ],
        limit: 3,
      }),
    ]);

    // Process the data
    const visitors =
      visitorsReport[0]?.rows?.[0]?.metricValues?.[0]?.value || "0";
    const uniqueUsers =
      visitorsReport[0]?.rows?.[0]?.metricValues?.[1]?.value || "0";
    const sessions =
      visitorsReport[0]?.rows?.[0]?.metricValues?.[2]?.value || "0";

    const bounceRate =
      bounceRateReport[0]?.rows?.[0]?.metricValues?.[0]?.value || "0";
    const pageViews =
      pagesReport[0]?.rows?.[0]?.metricValues?.[0]?.value || "0";

    // Process devices data
    const devices =
      devicesReport[0]?.rows?.map((row) => ({
        device: row.dimensionValues[0].value,
        users: row.metricValues[0].value,
      })) || [];

    // Process locations data
    const locations =
      locationsReport[0]?.rows?.map((row) => ({
        country: row.dimensionValues[0].value,
        users: row.metricValues[0].value,
      })) || [];

    return {
      visitorsPerMonth: parseInt(visitors).toLocaleString(),
      uniqueUsers: parseInt(uniqueUsers).toLocaleString(),
      bounceRate: `${Math.round(parseFloat(bounceRate) * 100)}%`,
      pagesVisited: parseInt(pageViews).toLocaleString(),
      devices: devices.map((d) => d.device).join(", ") || "No data",
      locations: locations.map((l) => l.country).join(", ") || "No data",
      visits: parseInt(sessions).toLocaleString(),
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching Google Analytics data:", error);
    throw error;
  }
}

// Get real-time data (optional)
export async function getRealTimeAnalytics() {
  try {
    const analyticsDataClient = getAnalyticsClient();
    const propertyId = getPropertyId();

    const [response] = await analyticsDataClient.runRealtimeReport({
      property: propertyId,
      dimensions: [],
      metrics: [{ name: "activeUsers" }],
    });

    const activeUsers = response?.rows?.[0]?.metricValues?.[0]?.value || "0";

    return {
      activeUsers: parseInt(activeUsers).toLocaleString(),
    };
  } catch (error) {
    console.error("Error fetching real-time analytics:", error);
    throw error;
  }
}
