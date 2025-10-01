import { fetchWithAuth } from "@utils/fetchWithAuth";

/**
 * Get unread notifications count for badge display
 * @returns {Promise<Object>} Response with unread count
 */

export const getUnreadCount = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/unread-count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred fetching data.");
  }

  const data = await response.json();
  return data;
};

/**
 * Get latest notifications for dropdown (unread first, then recent read ones)
 * @param {number} limit - Number of notifications to return (5-20, default: 10)
 * @returns {Promise<Object>} Response with latest notifications and unread count
 */

export const getLatestNotifications = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred fetching data.");
  }

  const data = await response.json();
  return data;
};

/**
 * Get paginated notifications for full notifications page
 * @param {number} perPage - Number of notifications per page (5-50, default: 15)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Response with paginated notifications(NOT IN USE YET)
 */
export const getNotifications = async (perPage = 15, page = 1) => {
  try {
    const response = await fetchWithAuth(
      `/notifications?per_page=${perPage}&page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

/**
 * Mark notification as read
 * @param {string} notificationId - The UUID of the notification to mark as read
 * @returns {Promise<Object>} Response
 */

export const markNotificationAsRead = async (notificationId) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-as-read`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notification_id: notificationId }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 422 && errorData.errors) {
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    }
    throw new Error(errorData.message || "An error occurred.");
  }

  const responseData = await response.json();
  return responseData;
};

/**
 * Mark all notifications as read
 * @returns {Promise<Object>} Response
 */
export const markAllNotificationsAsRead = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/mark-all-as-read`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 422 && errorData.errors) {
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    }
    throw new Error(errorData.message || "An error occurred.");
  }

  const responseData = await response.json();
  return responseData;
};
