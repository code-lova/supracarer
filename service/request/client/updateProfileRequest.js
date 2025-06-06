import { fetchWithAuth } from "@utils/fetchWithAuth";

export const updateClientprofile = async (formValues) => {
  const formData = new FormData();

  // Append all fields to FormData
  for (const key in formValues) {
    if (formValues[key] !== null && formValues[key] !== undefined) {
      formData.append(key, formValues[key]);
    }
  }
  // Add method override
  formData.append("_method", "PUT");

  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/client/update`,
    {
      method: "POST",
      body: formData,
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
