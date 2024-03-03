"use client";

import React from "react";
import "src/app/styles/css/sass.css";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";
import LoggedOut from "@/app/views/logged_out/LoggedOut";

export default function ActivityCodeMissingError() {
  const { showLogoutPage } = useInactivity();

  return !showLogoutPage ? (
    <>
      <Header withNavigation={false} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>You do not have the required access for this system</h1>
              <p>
                If you think you should have access, contact your Registration
                Authority (RA) for help.
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
