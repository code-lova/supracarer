import { fetchWithAuth } from "@utils/fetchWithAuth";

export const getAuthUser = async () => {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/healthworker`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred fetching data."
    );
  }

  const data = await response.json();
  return data;
};

export const getClientUser = async () => {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/client`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred fetching data."
    );
  }

  const data = await response.json();
  return data;
};


export const getAdminUser = async () => {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred fetching data."
    );
  }

  const data = await response.json();
  return data;
};
