// utils/decodeToken.js
import jwt from "jsonwebtoken";

export function getUserRoleFromToken() {
  const token = document.cookie.split('; ').find(row => row.startsWith('accessToken'));
  if (!token) return null;

  const accessToken = token.split('=')[1];
  try {
    const decoded = jwt.decode(accessToken);
    return decoded.aud; // Retrieve the user role from the "aud" field
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
