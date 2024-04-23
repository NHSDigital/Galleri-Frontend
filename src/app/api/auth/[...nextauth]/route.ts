import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkAuthorization } from "../checkAuthorization";
import {
  extractClaims,
  validateTokenExpirationWithAuthTime,
} from "../checkAuthorization";
import getUserRole from "../getUserRole";
import returnUser from "../returnUser";
import { validateTokenSignature } from "../validateTokenSignature";
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

// Environment Variables
const GET_USER_ROLE = process.env.NEXT_PUBLIC_GET_USER_ROLE;
const CIS2_SIGNED_JWT = process.env.NEXT_PUBLIC_CIS2_SIGNED_JWT;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const GALLERI_ACTIVITY_CODE = process.env.GALLERI_ACTIVITY_CODE;
const GALLERI_ACTIVITY_NAME = process.env.GALLERI_ACTIVITY_NAME;
const CIS2_CLIENT_ID = process.env.CIS2_ID;
const CIS2_REDIRECT_URL = `https://dev-2.cicd-gps-multi-cancer-blood-test.nhs.uk/api/auth/callback/cis2`;

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
            activityCodes: [GALLERI_ACTIVITY_CODE], // appended this property to match what we get from CIS2 for global authorization check
            activityNames: [GALLERI_ACTIVITY_NAME], // appended this property to match what we get from CIS2 for global authorization check
            accountStatus: "Active", // appended this property to match what we get from GPS User Account for global authorization check
          };

          return modifiedUser;
        }
        return null;
      },
    }),
    // custom CIS2 Oauth provider below
    {
      id: "cis2",
      name: "cis2",
      type: "oauth",
      version: "2.0",
      clientId: process.env.CIS2_ID,
      // clientSecret: process.env.CIS2_SECRET,
      wellKnown:
        "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid email profile nationalrbacaccess",
          // redirect_uri: CIS2_REDIRECT_URL,
          response_type: "code",
        },
      },
      token: {
        // The token exchange and userinfo end point calls are handled in the backend through Lambda
        // Below is the call to API Gateway endpoint to trigger the token exchange by sending along the authorization code
        async request(context) {
          // TEMPORARY CONSOLE LOG
          console.log("CODE : ", context.params.code);
          try {
            const r = await axios.get(
              `https://if5niw6mb8.execute-api.eu-west-2.amazonaws.com/dev-2/authenticator-lambda?code=${context.params.code}`
            );
            // TEMPORARY CONSOLE LOG
            console.log("USER INFO FROM BACKEND RESPONSE :", r.data);
            return { tokens: r.data }; // the property tokens now contain non-sensitive data, NOT the actual tokens.
          } catch (err: any) {
            console.error(err);
            throw new Error(err);
          }
        },
      },
      userinfo: {
        // Returning the same information returned by the option above so it can be passed through as Next-auth intended
        async request(context) {
          // TEMPORARY CONSOLE LOG
          console.log("CONTEXT: ", context);
          return await returnUser(context);
        },
      },
      checks: ["state"],
      async profile(profile) {
        // TEMPORARY CONSOLE LOG
        console.log("PROFILE : ", profile);
        const uuid = profile.uid.replace(/(.{4})/g, "$1 ");

        // Call the getUserRole function to fetch user role information
        const { accountStatus, role, otherUserInfo } = await getUserRole(
          uuid,
          GET_USER_ROLE,
          ENVIRONMENT
        );
        const returnValue = {
          name: profile.name,
          id: profile.uid,
          sub: profile.sub,
          role,
          activityCodes: profile.nhsid_nrbac_roles[0].activity_codes,
          activityNames: profile.nhsid_nrbac_roles[0].activities,
          otherUserInfo,
          accountStatus,
        };
        // TEMPORARY CONSOLE LOG
        console.log(returnValue);
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
    // generating a token and assigning properties
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.iss = process.env.CIS2_ID;
      }
      return token;
    },
    // custom authorization check during signIn
    async signIn({ user, account }) {
      // TEMPORARY CONSOLE LOG
      console.log("USER: ", user);
      console.log("ACCOUNT: ", account);
      return checkAuthorization(
        user,
        account,
        GALLERI_ACTIVITY_CODE,
        CIS2_CLIENT_ID,
        extractClaims,
        validateTokenExpirationWithAuthTime,
        validateTokenSignature
      );
    },
    // creating a session to be accessible on client side with returned token from jwt callback above
    async session({ session, token }) {
      return {
        ...session,
        user: token.user,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
