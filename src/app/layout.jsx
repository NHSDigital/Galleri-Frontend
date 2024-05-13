import SessionProvider from "./context/SessionProvider"; //next SessionProvider imported
import { getServerSession } from "next-auth";
import React from "react";
import AuthProvider from "./context/AuthProvider";
import { InactivityProvider } from "./context/AutoSignOutProvider";
import { useSession, getSession } from "next-auth/react";

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
  const session = getSession();
  return (
    <html lang="en">
      <body className="">
        {/* Wrapped with AuthProvider for all the client components to access the session data */}
        <SessionProvider session={session}>
          <InactivityProvider timeout={loggedOutDuration}>
            {children}
          </InactivityProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// RootLayout.getInitialProps = async (appContext) => {
//   let session = undefined;
//   // getSession works both server-side and client-side but we want to avoid any calls to /api/auth/session
//   // on page load, so we only call it server-side.
//   if (typeof window === "undefined") session = await getSession(appContext.ctx);
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps, ...(session !== undefined ? { session } : {}) };
// };
