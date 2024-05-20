"use client";

import React from "react";
import "../styles/css/sass.css";
import { useSession } from "next-auth/react";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";
import LoggedOut from "../views/logged_out/LoggedOut";

export default function OnwardReferral() {
  const { data: session, status } = useSession({
    required: true,
  });

  const { showLogoutPage } = useInactivity();

  if (status === "loading") {
    return <Header />;
  }

  if (!session) {
    typeof window !== "undefined" && (window.location.href = "/signin");
    return null;
  }

  return !showLogoutPage ? (
    <>
      <Header withNavigation={true} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>Onward Referral</h1>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <LoggedOut showHeader={true} />
  );
}
