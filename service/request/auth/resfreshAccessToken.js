export const refreshAccessToken = async (token) => {
  try {
    if (!token.refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to refresh token");
    }

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 mins expiration duration
      refreshToken: data.refreshToken ?? token.refreshToken, // Keep existing if no new refresh token is sent
    };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
};
