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
      async authorize(credentials) {
        try {
          const apiResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const data = await apiResponse.json();

          if (!apiResponse.ok) {
            throw new Error(data.message || "Invalid credentials");
          }

          // Ensure user object is returned correctly
          if (!data.user) {
            throw new Error("User data missing in response");
          }

          return {
            id: data.user._id,
            fullname: data.user.fullname,
            role: data.user.role,
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
          role: user.role,
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
        role: token.role,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
