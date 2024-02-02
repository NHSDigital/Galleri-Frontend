import React from "react";
import AuthProvider from "./context/AuthProvider";
import { InactivityProvider } from "./context/AutoSignOutProvider";

export const metadata = {
  title: "NHS Galleri",
  description: "Galleri client",
};

// Root layout of Galleri
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        {/* Wrapped with AuthProvider for all the client components to access the session data */}
        <AuthProvider>
          <InactivityProvider
            timeout={process.env.LOGOUT_TIMEOUT || 15 * 60 * 1000}
          >
            {children}
          </InactivityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
