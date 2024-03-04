"use client";

import React from "react";
import "src/app/styles/css/sass.css";
import Header from "@/app/components/Header";

export default function AccountNotFoundError() {
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
              <h1>We found no record of this account</h1>
              <p>
                If you think you should have access, contact your line manager.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
