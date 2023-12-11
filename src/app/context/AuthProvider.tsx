/**
 * AuthProvider.tsx
 *
 * This file provides an authentication context for Next.js applications.
 * It uses SessionProvider from the next-auth/react library to manage
 * user sessions, authentication states, and related functionality.
 *
 * When wrapping your components with AuthProvider, the SessionProvider
 * is included in the component tree, allowing the management of
 * authentication state for its descendants. To keep track of whether a user is logged in or not.
 * This is important for creating features like protected pages
 * that require users to be logged in to access them.
 *
 **/

"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
