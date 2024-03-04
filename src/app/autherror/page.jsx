"use client";

import React from "react";
import "src/app/styles/css/sass.css";
import Header from "@/app/components/Header";

export default function AuthError() {
  return (
    <>
      <Header withNavigation={false} />
      <div className="nhsuk-width-container">
        <main
          className="nhsuk-main-wrapper custom-vertical-height-100vh"
          id="main-content"
          role="main"
        >
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>Access Denied</h1>
              <p>
                If you think you should have access, contact your Registration
                Authority (RA) for help.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
