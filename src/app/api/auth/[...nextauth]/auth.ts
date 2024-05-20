import "server-only";
import NextAuth, { NextAuthConfig } from "next-auth";
import type { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
// import { checkAuthorization } from "./src/app/api/auth/checkAuthorization";
import axios from "axios";
import returnUser from ".././returnUser";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { authAdapter } from "@/app/api/auth/[...nextauth]/adapter";
import crypto from "crypto";

type UsersListType = UsersItem[];
let users: UsersListType = [];

interface UsersItem {
  id: string;
  name: string;
  email: string;
  password: string;
}

const dynamoDBConfig: DynamoDBClientConfig = {
  region: process.env.NEXT_AUTH_AWS_REGION,
};

const client = DynamoDBDocument.from(new DynamoDB(dynamoDBConfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

try {
  users = JSON.parse(process.env.USERS || "[]");
} catch (error) {
  console.error("Error parsing USERS environment variable:", error);
}

// Environment Variables
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const AUTHENTICATOR = process.env.NEXT_PUBLIC_AUTHENTICATOR;
const GALLERI_ACTIVITY_CODE = process.env.GALLERI_ACTIVITY_CODE;
// const CIS2_REDIRECT_URL = process.env.CIS2_REDIRECT_URL;
const SESSION_MAX_AGE = 15000;
const CIS2_REDIRECT_URL = "http://localhost:3000";

export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: true,
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
      // issuer:
      //   "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare",
      type: "oauth",
      clientId: process.env.CIS2_ID,
      wellKnown:
        "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk/openam/oauth2/realms/root/realms/NHSIdentity/realms/qHealthcare/.well-known/openid-configuration",
      authorization: {
        url: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/authorize",
        params: {
          scope: "openid email profile nationalrbacaccess",
          redirect_uri: `${CIS2_REDIRECT_URL}/api/auth/callback/cis2`,
          response_type: "code",
          max_age: 60 * 15,
        },
      },
      token: {
        url: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/access_token",
        // The token exchange and userinfo end point calls are handled in the backend through Lambda
        // Below is the call to API Gateway endpoint to trigger the token exchange by sending along the authorization code
        async request(context) {
          try {
            const r = await axios.get(
              `https://${AUTHENTICATOR}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/authenticator-lambda?code=${context.params.code}`
            );
            return { tokens: r.data }; // the property tokens now contain non-sensitive data, NOT the actual tokens. keyword tokens is used as required by NextAuth
          } catch (err: any) {
            console.error(err);
            throw new Error(err);
          }
        },
      },
      userinfo: {
        url: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/userinfo",
        // Returning the same information returned by the option above so it can be passed through as Next-auth intended
        async request(context) {
          return await returnUser(context);
        },
      },
      checks: ["state"],
      async profile(profile) {
        const returnValue = {
          name: profile.name,
          id: profile.id,
          role: profile.role,
          isAuthorized: profile.isAuthorized,
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
  adapter: authAdapter(),
  // jwt: { secret: process.env.NEXTAUTH_SECRET },
  session: {
    strategy: "database",
    maxAge: SESSION_MAX_AGE,
    generateSessionToken: () => crypto.randomBytes(16).toString("base64"),
  },
  jwt: {
    async encode({ token }) {
      // This is the string returned from the `jwt` callback above.
      // It represents the session token that will be set in the browser.
      return token?.id as unknown as string;
    },
    async decode() {
      // Disable default JWT decoding.
      // This method is really only used when using the email provider.
      return null;
    },
  },
  callbacks: {
    // generating a token and assigning properties
    async jwt({ user }) {
      // Override default jwt callback behavior.
      // Create a session instead and then return that session token for use in the
      // `jwt.encode` callback below.
      const session = await authAdapter().createSession?.({
        expires: new Date(Date.now() + SESSION_MAX_AGE * 1000),
        sessionToken: crypto.randomBytes(16).toString("base64"),
        userId: user.id,
      });

      return { id: session?.sessionToken };
    },
    // custom authorization check during signIn
    async signIn({ user, account }) {
      return true;
    },
    async session({ session: DefaultSession, user }) {
      // Make our own custom session object.
      const session: Session = {
        // userId?: { id: user.id },
        expires: DefaultSession.expires,
      };

      return session;
    },
  },
});
