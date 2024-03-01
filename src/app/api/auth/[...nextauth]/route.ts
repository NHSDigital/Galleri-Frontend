import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

const GET_USER_ROLE = process.env.NEXT_PUBLIC_GET_USER_ROLE;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

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
          const modifiedUser = {
            ...user, // Spread existing user properties
            activityCodes: ["B1824"], // appended this property to match what we get from CIS2 for global authorization check
            activityNames: ["Galleri Blood Test"], // appended this property to match what we get from CIS2 for global authorization check
            accountStatus: "Active", // appended this property to match what we get from GPS User Account for global authorization check
          };

          return modifiedUser;
        }
        return null;
      },
    }),
    // ...add more providers here
    {
      id: "cis2",
      name: "cis2",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CIS2_ID,
      clientSecret: process.env.CIS2_SECRET,
      wellKnown:
        "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk/openam/oauth2/realms/root/realms/oidc/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid email profile nationalrbacaccess",
          redirect_uri: "http://localhost:3000/api/auth/callback/cis2",
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
            return { tokens: r.data };
          } catch (err: any) {
            console.error(err);
            throw new Error(err);
          }
        },
      },
      userinfo: {
        url: "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc/userinfo",
        params: { schema: "openid" },
        async request(context) {
          try {
            const response = await axios({
              method: "GET",
              url: "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc/userinfo?schema=openid",
              headers: {
                Authorization: `Bearer ${context.tokens.access_token}`,
              },
            });
            return response.data;
          } catch (err: any) {
            console.error(err);
            throw new Error(err);
          }
        },
      },
      idToken: true,
      checks: ["state"],
      async profile(profile) {
        const uuid = profile.uid.replace(/(.{4})/g, "$1 ");

        // Call the getUserRole function to fetch user role information
        const { accountStatus, role, otherUserInfo } = await getUserRole(uuid);
        const returnValue = {
          name: profile.name,
          id: profile.uid,
          role,
          activityCodes: profile.nhsid_nrbac_roles[0].activity_codes,
          activityNames: profile.nhsid_nrbac_roles[0].activities,
          otherUserInfo,
          accountStatus,
        };
        return returnValue;
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/autherror",
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
        console.log("ACCOUNT : ", account);
        token.accessToken = account.access_token;
      }
      console.log("TOKEN : ", token);
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

async function getUserRole(uuid) {
  try {
    const response = await axios.get(
      `https://${GET_USER_ROLE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/get-user-role/?uuid=${uuid}`
    );
    console.log("RESPONSE : ", response);
    return {
      accountStatus: response.data.Status,
      role: response.data.Role,
      otherUserInfo: response.data,
    };
  } catch (error) {
    console.error(error.response.data.message);
    return {
      accountStatus: "User Not Found",
      role: "",
      otherUserInfo: {},
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
