import React from "react";
import AuthProvider from "./context/AuthProvider";
import { InactivityProvider } from "./context/AutoSignOutProvider";

export const metadata = {
  title: "NHS Galleri",
  description: "Galleri client",
};

const loggedOutDuration =
  isNaN(parseInt(process.env.NEXT_PUBLIC_LOGGED_OUT)) === false
    ? process.env.NEXT_PUBLIC_LOGGED_OUT
    : 15 * 60 * 1000;

// Root layout of Galleri
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        {/* Wrapped with AuthProvider for all the client components to access the session data */}
        <AuthProvider>
          <InactivityProvider timeout={loggedOutDuration}>
            {children}
          </InactivityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
