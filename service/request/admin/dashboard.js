import { fetchWithAuth } from "@utils/fetchWithAuth";

//Fetch dashboard statistics
export const getDashboardStats = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  const responseData = await response.json();
  return responseData;
};

//fetch appointment data stats for the current year
//Month by month
export const getAppointmentChartStats = async () => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/appointment-statistics`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  const responseData = await response.json();
  return responseData;
};

//Appointment status statistics count
export const getAppointmentStatusCountStats = async (month = null) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/appointment-status-count`
  );

  // Add month parameter if provided
  if (month !== null && month !== undefined) {
    url.searchParams.append("month", month);
  }

  const response = await fetchWithAuth(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 422 && errorData.errors)
      throw new Error(Object.values(errorData.errors).flat().join(" "));
    if (response.status >= 500)
      throw new Error("Server error. Please try again later.");
    throw new Error(
      errorData.message || "An error occurred. Please try again."
    );
  }

  const responseData = await response.json();
  return responseData;
};
