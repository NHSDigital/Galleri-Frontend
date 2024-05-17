import "server-only";
import type { Adapter, AdapterUser } from "@auth/core/adapters";
import { Awaitable } from "@auth/core/types";
import crypto from "crypto";

import { PrismaClient } from "@prisma/client";
// import { getIP } from "utils";
// import { getUserAgent } from "utils";

const prisma = new PrismaClient();

type SessionCreationResult = {
  expires: Date;
  sessionToken: string;
  userId: number;
  error?: string;
};

type AuthAdapter = {
  // Create type for createSession
  createUser: (
    // eslint-disable-next-line no-unused-vars
    data: any
  ) => Awaitable<AdapterUser>;
} & Omit<Adapter, "createUser">;

async function testConnection() {
  try {
    // Describe the "Session" table schema
    const sessionTableSchema = await prisma.session.findFirst();

    // Log the schema
    console.log("Session table schema:", sessionTableSchema);
  } catch (error) {
    // Log any errors
    console.error("Session table schema error:", error);
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

export function authAdapter(): AuthAdapter {
  return {
    async createSession(data): Promise<SessionCreationResult> {
      try {
        await testConnection();
        // Attempt to create session
        const createSessionResponse = await prisma.session.create({
          data: {
            sessionToken: data.sessionToken,
            userId: data.userId,
            expires: data.expires,
          },
        });

        // Return successful session data
        return {
          expires: createSessionResponse.expires,
          sessionToken: createSessionResponse.sessionToken,
          userId: createSessionResponse.userId,
        };
      } catch (error) {
        // Return error information
        console.error("Error creating session:", error);
        return {
          expires: null, // or undefined
          sessionToken: null, // or undefined
          userId: null, // or undefined
          error: "Failed to create session",
        };
      }
    },
    async createUser(data) {
      console.log("createUser ******", data);
      const userData = {
        id: crypto.randomBytes(16).toString("base64"),
        username: data.username,
        email: data.email,
        displayName: data.displayName,
        createdAt: new Date(),
        role: "Referring Clinician",
      };

      const newUser = await prisma.user.create({
        data: userData,
      });

      return newUser;
    },
    async deleteSession(sessionToken) {
      const session = await prisma.session.delete({ where: { sessionToken } });

      return {
        expires: session.expires,
        sessionToken: session.sessionToken,
        userId: session.userId,
      };
    },
    async getSessionAndUser(sessionToken) {
      const userAndSession = await prisma.session.findUnique({
        where: { sessionToken },
        // include: { user: true },
      });

      if (!userAndSession) return null;

      const { ...session } = userAndSession;

      return {
        // user,
        session: {
          expires: session.expires,
          sessionToken: session.sessionToken,
          userId: session.userId,
        },
      };
    },
    async getUserByAccount(oAuthProvider) {
      const { provider, providerAccountId } = oAuthProvider;

      // We'll only ever use Google or Apple, so we can just check for those.
      if (provider === "google") {
        return prisma.user.findFirst({
          where: { googleId: providerAccountId },
        });
      }

      return null;
    },
    async updateSession(data) {
      const session = await prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data: { sessionToken: data.sessionToken, expires: data.expires },
      });

      return {
        expires: session.expires,
        sessionToken: session.sessionToken,
        userId: session.userId,
      };
    },
    deleteUser: (id) => prisma.user.delete({ where: { id } }),
    getUser: (id) => prisma.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => prisma.user.findUnique({ where: { email } }),
    linkAccount: async (data) => {
      if (data.provider === "google") {
        const user = await prisma.user.update({
          where: { id: data.userId },
          data: {
            googleId: data.providerAccountId,
          },
        });

        if (user?.googleId)
          return {
            provider: data.provider,
            providerAccountId: user.googleId,
            type: data.type,
            userId: user.id,
          };
      }

      return null;
    },
    updateUser: ({ id, ...data }) =>
      prisma.user.update({ where: { id }, data }),
  };
}
