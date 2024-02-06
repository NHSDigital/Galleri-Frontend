import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

interface UsersItem {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UsersListType = UsersItem[];

let users: UsersListType = [];

try {
  users = JSON.parse(process.env.USERS || "[]");
} catch (error) {
  console.error("Error parsing USERS environment variable:", error);
}

const authOptions: NextAuthOptions = {
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
        const user = users.find((item) => item.email === credentials.email);
        if (user?.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    {
      id: "cis2",
      name: "Cis2",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CIS2_ID,
      clientSecret: process.env.CIS2_SECRET,
      wellKnown:
        "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk/openam/oauth2/realms/root/realms/oidc/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid email profile nationalrbacaccess",
          redirect_uri: "http://localhost:3000/",
          response_type: "code",
        },
      },
      token: {
        async request(context) {
          const body = {
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:3000/api/auth/callback/cis2",
            client_id: process.env.CIS2_ID || "undefined",
            client_secret: process.env.CIS2_SECRET || "undefined",
            code: context.params.code || "undefined",
          };
          console.log("CODE", context.params.code);
          const data = new URLSearchParams(body).toString();
          try {
            const r = await axios({
              method: "POST",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
              },
              data,
              url: `https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc/access_token`,
            });
            console.log("TOKEN ENDPOINT RESPONSE :", r.data);
            return { tokens: r.data };
          } catch (err: any) {
            console.error(err);
            throw new Error(err);
          }
        },
      },
      idToken: true,
      checks: ["state"],
      profile(profile) {
        return profile;
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
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
    maxAge: 60 * 15, // 15 min

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
