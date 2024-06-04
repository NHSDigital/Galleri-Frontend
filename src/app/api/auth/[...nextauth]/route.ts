import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkAuthorization } from "../checkAuthorization";
import returnUser from "../returnUser";

// User object for users signing in with credentials
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

try {
  users = JSON.parse(process.env.USERS || "[]");
} catch (error) {
  console.error("Error parsing USERS environment variable:", error);
}

// Environment Variables
/** @type {string | undefined} */
const ENVIRONMENT: string | undefined = process.env.NEXT_PUBLIC_ENVIRONMENT;
/** @type {string | undefined} */
const AUTHENTICATOR: string | undefined = process.env.NEXT_PUBLIC_AUTHENTICATOR;
/** @type {string | undefined} */
const GALLERI_ACTIVITY_CODE: string | undefined =
  process.env.GALLERI_ACTIVITY_CODE;
/** @type {string | undefined} */
const CIS2_REDIRECT_URL: string | undefined = process.env.CIS2_REDIRECT_URL;

/**
 * The NextAuth options configuration.
 * @type {NextAuthOptions}
 */

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
      /**
       * Authorize function for credentials provider.
       * @param {Object} credentials - The user credentials.
       * @param {string} credentials.email - The user's email.
       * @param {string} credentials.password - The user's password.
       * @param {Object} req - The request object.
       * @returns {Promise<UsersItem|null>} - The authenticated user or null if authentication fails.
       */
      async authorize(
        credentials: { email: string; password: string },
        req: object
      ): Promise<UsersItem | null> {
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
      type: "oauth",
      version: "2.0",
      clientId: process.env.CIS2_ID,
      wellKnown:
        "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile nationalrbacaccess",
          redirect_uri: CIS2_REDIRECT_URL,
          response_type: "code",
          max_age: 60 * 15,
        },
      },
      /**
       * Token request/handler function for custom OAuth provider.
       * The token exchange and userinfo end point calls are handled in the
       * backend through Lambda
       * Below is the call to API Gateway endpoint to trigger the request for token exchange
       * using the authorization code via the CIS2 token endpoint
       * @param {Object} context - The context object.
       * @param {Object} context.params - The parameters.
       * @param {string} context.params.code - The authorization code.
       * @returns {Promise<{ tokens: Object }>} - The token response.
       */
      token: {
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
      /**
       * Userinfo request function for custom OAuth provider.
       * Since decided to move the token and user info handling over to the Backend,
       * Need to deviate away from Next-auth flow of handling token and userinfo exchange over client side.
       * As a workaround, returning the same information returned by the token option block
       * above so it can be passed through as Next-auth intended.
       * @param {Object} context - The context object.
       * @function returnUser - Function to simply return the same response received from the authenticator Lambda.
       * @returns {Promise<Object>} - The user info.
       */
      userinfo: {
        async request(context) {
          return await returnUser(context);
        },
      },
      checks: ["state"],
      /**
       * Profile function for custom OAuth provider.
       * @callback function profile - The profile object.
       * @returns {Object} - The modified profile.
       * @property {string} id - The unique identifier of the user.
       * @property {string} name - The name of the user.
       * @property {string} role - The role of the user.
       * @property {boolean|string} isAuthorized - true if authorized, false if not authorized, or a string with the error URL if there's an issue.
       * @property {string} apiSessionId - The API Session ID associated with the user.
       */
      async profile(profile) {
        const returnValue = {
          name: profile.name,
          id: profile.id,
          role: profile.role,
          isAuthorized: profile.isAuthorized,
          apiSessionId: profile.apiSessionId,
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
    /**
     * JWT callback function
     * @callback jwt - Generating a token and assigning properties.
     * @param {Object} params - The params.
     * @param {Object} params.token - The token.
     * @param {Object} [params.user] - The user.
     * @returns {Promise<Object>} - The updated token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    /**
     * Sign-in callback function.
     * @callback signIn - signIn callback function.
     * @function checkAuthorization - custom authorization checks during signIn.
     * @param {Object} params - The params.
     * @param {Object} params.user - The user.
     * @param {Object} params.account - The account.
     * @returns {Promise<boolean|string>} - Whether sign-in is allowed.
     */
    async signIn({
      user,
      account,
    }: {
      user: object;
      account: object;
    }): Promise<boolean | string> {
      return checkAuthorization(user, account, GALLERI_ACTIVITY_CODE);
    },
    /**
     * Session callback function.
     * @callback session - Creates a session to be accessible on client side(cookie) with returned token from jwt callback above.
     * @param {Object} params - The params.
     * @param {Object} params.session - The session.
     * @param {Object} params.token - The token.
     * @returns {Promise<Object>} - The updated session.
     */
    async session({ session, token }) {
      return {
        ...session,
        user: token.user,
      };
    },
  },
};

/**
 * The NextAuth handler.
 * @type {import("next").NextApiHandler}
 */

const handler: import("next").NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
