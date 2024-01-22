import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "../../../../../helpers/user_database";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        console.log(users.find((item) => item.email === "amar.rai5@nhs.net"));
        const user = users.find((item) => item.email === credentials.email);
        if (user?.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
    // ...add more providers here
    {
      id: "CIS2",
      name: "CIS2",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CIS2_ID,
      clientSecret: process.env.CIS2_SECRET,
      wellKnown:
        "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk/openam/oauth2/realms/root/realms/oidc/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid email profile nationalrbacaccess",
          redirect_uri: process.env.NEXTAUTH_URL,
        },
      },
      idToken: true,
      checks: ["state"],
      profile(profile) {
        return (
          console.log("profile", profile),
          {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          }
        );
      },
    },
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60 * 10, // 10 min

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session callback", { session, token });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
