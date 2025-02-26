export const verifyEmailRequest = async (verificationCode) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/email/verify/${verificationCode}`
  );

  if (!response.ok) {
    throw new Error("An error occurred during email verification.");
  }

  return response.json();
};
