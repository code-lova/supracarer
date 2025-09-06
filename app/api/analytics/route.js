import {
  getAnalyticsData,
  getRealTimeAnalytics,
} from "../../../lib/googleAnalytics";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  try {
    // Optional: Add authentication check
    // const session = await getServerSession();
    // if (!session) {
    //   return Response.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "analytics";

    let data;

    if (type === "realtime") {
      data = await getRealTimeAnalytics();
    } else {
      data = await getAnalyticsData();
    }

    return Response.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analytics API Error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch analytics data",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
