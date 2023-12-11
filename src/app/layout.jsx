import React from "react";
import AuthProvider from "./context/AuthProvider";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
