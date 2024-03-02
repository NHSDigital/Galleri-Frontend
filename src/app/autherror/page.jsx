"use client";

import React from "react";
import "src/app/styles/css/sass.css";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";
import LoggedOut from "../views/logged_out/LoggedOut";

export default function AuthError() {
  const { showLogoutPage } = useInactivity();

  return !showLogoutPage ? (
    <>
      <Header withNavigation={false} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>We found no record of this account</h1>
              <p>
                If you think you should have access, contact your line manager.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <LoggedOut showHeader={true} />
  );
}
