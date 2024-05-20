import type { DefaultSession } from "next-auth";

import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends PrismaUser {}

  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  // interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  export interface SessionInterface {
    user: {
      username: string;
      displayName?: string | null;
      imperial: boolean;
      language: string;
      timezone: string;
    } & Omit<DefaultSession["user"], "id">;
  }
}

declare module "@auth/core/adapters" {
  // interface Adapter {}
  // interface AdapterAccount {}
  // interface AdapterSession {}
  // interface AdapterUser extends PrismaUser {
  //   emailVerified?: boolean  null;
  // }
}
