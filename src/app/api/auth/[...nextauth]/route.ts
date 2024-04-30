import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkAuthorization } from "../checkAuthorization";
import {
  extractClaims,
  validateTokenExpirationWithAuthTime,
} from "../checkAuthorization";
import { checkSession } from "../checkSession";
import getUserRole from "../getUserRole";
import getCIS2SignedJWT from "../getCIS2SignedJWT";
import { validateTokenSignature } from "../validateTokenSignature";
interface UsersItem {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UsersListType = UsersItem[];
let users: UsersListType = [];

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
const GET_USER_ROLE = process.env.NEXT_PUBLIC_GET_USER_ROLE;
const CIS2_SIGNED_JWT = process.env.NEXT_PUBLIC_CIS2_SIGNED_JWT;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const GALLERI_ACTIVITY_CODE = process.env.GALLERI_ACTIVITY_CODE;
const GALLERI_ACTIVITY_NAME = process.env.GALLERI_ACTIVITY_NAME;
const CIS2_CLIENT_ID = process.env.CIS2_ID;

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
          redirect_uri:
            "https://dev-3.cicd-gps-multi-cancer-blood-test.nhs.uk/api/auth/callback/cis2",
          response_type: "code",
        },
      },
      token: {
        async request(context) {
          const signedJWT = await getCIS2SignedJWT(
            CIS2_SIGNED_JWT,
            ENVIRONMENT
          );
          const body = {
            grant_type: "authorization_code",
            redirect_uri:
              "https://dev-3.cicd-gps-multi-cancer-blood-test.nhs.uk/api/auth/callback/cis2",
            client_id: process.env.CIS2_ID || "undefined",
            // client_secret: process.env.CIS2_SECRET || "undefined",
            client_assertion_type:
              "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            client_assertion: signedJWT || "undefined",
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
              url: `https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/access_token`,
            });
            return { tokens: r.data };
          } catch (err: any) {
            console.error(err);
            throw new Error(err);
          }
        },
      },
      userinfo: {
        url: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/userinfo",
        params: { schema: "openid" },
        async request(context) {
          try {
            const response = await axios({
              method: "GET",
              url: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/userinfo?schema=openid",
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
        return returnValue;
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/autherror",
  },
  adapter: DynamoDBAdapter(client),
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  session: {
    strategy: "database",
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
    async session({ session, token }) {
      const userId = token.sub;
      // await checkSession(token.sessionId);
      // try {
      //   await client.put({
      //     TableName: `${ENVIRONMENT}-auth-js`,
      //     Item: {
      //       userId,
      //       sessionData: session,
      //     },
      //   });
      // } catch (error) {
      //   console.error("Error storing session data in DynamoDB:", error);
      //   throw error;
      // }
      return session;
      // return {
      //   ...session,
      //   user: token.user,
      //   accessToken: token.accessToken,
      // };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
