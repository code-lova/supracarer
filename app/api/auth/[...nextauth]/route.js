import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days (24 hours)
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // If we have verification data from 2FA, use it directly
          if (
            credentials.skipBackendCall &&
            credentials.userDataFromVerification
          ) {
            const verificationData = JSON.parse(
              credentials.userDataFromVerification
            );

            return {
              id: verificationData.user.id,
              fullname: verificationData.user.fullname,
              email: verificationData.user.email,
              role: verificationData.user.role,
              twoFactorEnabled: verificationData.user.two_factor_auth || false,
              accessToken: verificationData.accessToken,
              accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
            };
          }

          // Normal login flow
          // Prepare request body
          const requestBody = {
            email: credentials.email,
            password: credentials.password,
          };

          // Add user agent if provided from client
          if (credentials.userAgent) {
            requestBody.userAgent = credentials.userAgent;
          }

          // Get user agent from the actual request headers
          const userAgent = req?.headers?.["user-agent"];

          const apiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Use real user agent from request headers
                ...(userAgent && { "X-Real-User-Agent": userAgent }),
                // Or use client-provided user agent as fallback
                ...(credentials.userAgent &&
                  !userAgent && { "X-Real-User-Agent": credentials.userAgent }),
              },
              body: JSON.stringify(requestBody),
            }
          );

          const data = await apiResponse.json();

          if (!apiResponse.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // Check if 2FA is required (but not if this is a post-2FA verification)
          if (data.requires_2fa && !credentials.verified2FA) {
            throw new Error("2FA_REQUIRED");
          }

          // Ensure user object is returned correctly
          if (!data.user) {
            throw new Error("User data missing in response");
          }

          return {
            id: data.user.id,
            fullname: data.user.fullname,
            email: data.user.email,
            role: data.user.role,
            twoFactorEnabled: data.user.two_factor_auth,
            accessToken: data.accessToken,
            accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
          };
        } catch (error) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      token.error = "AccessTokenExpired";
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        fullname: token.fullname,
        email: token.email,
        role: token.role,
        twoFactorEnabled: token.twoFactorEnabled,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
