import {
  FaCalendarCheck,
  FaUsers,
  FaUserTie,
  FaUserMd,
  FaStar,
  FaCommentAlt,
  FaTicketAlt,
  FaHeadset,
} from "react-icons/fa";
import { formatNumber } from "@components/core/NumberFormater";

/**
 * StatsDataProvider - Transforms dashboard API data into formatted stats array
 * @param {Object} dashboardData - Raw dashboard data from API
 * @returns {Array} Formatted stats array for display
 */
export const getStatsData = (dashboardData) => {
  if (!dashboardData?.data) return [];

  const data = dashboardData.data;

  return [
    {
      label: "Total Appointments",
      value: formatNumber(data.appointments?.total || 0),
      icon: <FaCalendarCheck size={28} className="text-blue-500" />,
      bg: "bg-blue-50",
      subData: [
        {
          label: "This Month",
          value: formatNumber(data.appointments?.current_month || 0),
        },
        {
          label: "Last Month",
          value: formatNumber(data.appointments?.previous_month || 0),
        },
        {
          label: "Growth",
          value: `${data.appointments?.growth_percentage || 0}%`,
          isGrowth: true,
        },
      ],
      breakdown: data.appointments?.status_breakdown,
    },
    {
      label: "Total Users",
      value: formatNumber(data.users?.total || 0),
      icon: <FaUsers size={28} className="text-green-500" />,
      bg: "bg-green-50",
      subData: [
        {
          label: "Active",
          value: formatNumber(data.users?.overall?.active || 0),
        },
        {
          label: "Inactive",
          value: formatNumber(data.users?.overall?.inactive || 0),
        },
        {
          label: "Verified",
          value: formatNumber(data.users?.overall?.verified || 0),
        },
      ],
      breakdown: {
        "Active %": `${data.users?.overall?.active_percentage || 0}%`,
        "Verified %": `${data.users?.overall?.verified_percentage || 0}%`,
        Clients: formatNumber(data.users?.clients?.total || 0),
        "Health Workers": formatNumber(data.users?.health_workers?.total || 0),
      },
    },
    {
      label: "Total Clients",
      value: formatNumber(data.users?.clients?.total || 0),
      icon: <FaUserTie size={28} className="text-purple-500" />,
      bg: "bg-purple-50",
      subData: [
        {
          label: "Active",
          value: formatNumber(data.users?.clients?.active || 0),
        },
        {
          label: "Inactive",
          value: formatNumber(data.users?.clients?.inactive || 0),
        },
        {
          label: "Verified",
          value: formatNumber(data.users?.clients?.verified || 0),
        },
      ],
      breakdown: {
        Unverified: formatNumber(data.users?.clients?.unverified || 0),
        "Registered This Month": formatNumber(
          data.users?.clients?.registered_this_month || 0
        ),
        "2FA Enabled": formatNumber(
          data.users?.clients?.two_factor_enabled || 0
        ),
      },
    },
    {
      label: "Health Workers",
      value: formatNumber(data.users?.health_workers?.total || 0),
      icon: <FaUserMd size={28} className="text-pink-500" />,
      bg: "bg-pink-50",
      subData: [
        {
          label: "Active",
          value: formatNumber(data.users?.health_workers?.active || 0),
        },
        {
          label: "Verified",
          value: formatNumber(data.users?.health_workers?.verified || 0),
        },
        {
          label: "With Ratings",
          value: formatNumber(data.users?.health_workers?.with_ratings || 0),
        },
      ],
      breakdown: {
        "Average Rating": `${
          data.users?.health_workers?.average_rating || 0
        }/5`,
        "With Appointments": formatNumber(
          data.users?.health_workers?.with_appointments || 0
        ),
        "Registered This Month": formatNumber(
          data.users?.health_workers?.registered_this_month || 0
        ),
        "2FA Enabled": formatNumber(
          data.users?.health_workers?.two_factor_enabled || 0
        ),
      },
    },
    {
      label: "Total Ratings",
      value: formatNumber(data.health_worker_ratings?.total || 0),
      icon: <FaStar size={28} className="text-yellow-500" />,
      bg: "bg-yellow-50",
      subData: [
        {
          label: "This Month",
          value: formatNumber(data.health_worker_ratings?.current_month || 0),
        },
        {
          label: "Last Month",
          value: formatNumber(data.health_worker_ratings?.previous_month || 0),
        },
        {
          label: "Avg Rating",
          value: `${data.health_worker_ratings?.average_rating || 0}/5`,
        },
      ],
    },
    {
      label: "Total Reviews",
      value: formatNumber(data.health_worker_reviews?.total || 0),
      icon: <FaCommentAlt size={28} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      subData: [
        {
          label: "This Month",
          value: formatNumber(data.health_worker_reviews?.current_month || 0),
        },
        {
          label: "Last Month",
          value: formatNumber(data.health_worker_reviews?.previous_month || 0),
        },
        {
          label: "Growth",
          value: `${data.health_worker_reviews?.growth_percentage || 0}%`,
          isGrowth: true,
        },
      ],
    },
    {
      label: "Client Support Tickets",
      value: formatNumber(data.client_support_tickets?.total || 0),
      icon: <FaTicketAlt size={28} className="text-red-500" />,
      bg: "bg-red-50",
      subData: [
        {
          label: "This Month",
          value: formatNumber(data.client_support_tickets?.current_month || 0),
        },
        {
          label: "Platform Interactions",
          value: formatNumber(data.summary?.total_platform_interactions || 0),
        },
        {
          label: "User Engagement",
          value: `${data.summary?.user_engagement_rate || 0}%`,
        },
      ],
    },
    {
      label: "Health Worker Messages",
      value: formatNumber(data.health_worker_support_messages?.total || 0),
      icon: <FaHeadset size={28} className="text-teal-500" />,
      bg: "bg-teal-50",
      subData: [
        {
          label: "This Month",
          value: formatNumber(
            data.health_worker_support_messages?.current_month || 0
          ),
        },
        {
          label: "Generated At",
          value: new Date(data.metadata?.generated_at).toLocaleDateString(),
        },
      ],
      breakdown: data.health_worker_support_messages?.status_breakdown,
    },
  ];
};

export default getStatsData;
