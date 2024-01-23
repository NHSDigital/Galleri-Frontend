import React from "react";
import { useInactivity } from "@/app/context/InactivityTimerContext";
import Header from "@/app/components/Header";

import "../../styles/css/sass.css";

export default function LoggedOut() {
  const { closeLogoutPage } = useInactivity();
  const onLogoutHandler = () => closeLogoutPage(true);

  return (
    <>
      <Header withNavigation={false} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-column-full">
            <h1 data-testid="log-out-header">You have been logged out</h1>
          </div>
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <p>
                You have been logged out as you have been inactive for 15
                minutes.
              </p>
              <p>We do this to protect patient data</p>
              <p>Log in to use the Galleri system.</p>
            </div>
          </div>
          <a
            aria-label="Log Out"
            className="nhsuk-button"
            data-testid="log-out-button"
            href="#"
            role="button"
            draggable="false"
            onClick={() => onLogoutHandler()}
          >
            Continue
          </a>
        </main>
      </div>
    </>
  );
}
