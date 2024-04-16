import React from "react";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";

import "../../styles/css/sass.css";

export default function LoggedOut({ showHeader }) {
  const { closeLogoutPage } = useInactivity();
  const onLogoutHandler = () => closeLogoutPage(true);

  const loggedOutDuration =
    isNaN(parseInt(process.env.NEXT_PUBLIC_LOGGED_OUT)) === false
      ? parseInt(process.env.NEXT_PUBLIC_LOGGED_OUT / 60 / 1000)
      : 15;


  return (
    <>
      {showHeader && <Header withNavigation={false} />}
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-column-full">
            <div className="nhsuk-grid-row">
              <h1 data-testid="log-out-header">You have been logged out</h1>
              <p>
                You have been logged out as you have been inactive for{" "}
                {loggedOutDuration === parseInt("1")
                  ? `${loggedOutDuration} minute`
                  : `${loggedOutDuration} minutes`}
              </p>
              <p>We do this to protect patient data.</p>
              <p>Log in again to use GPS.</p>
            </div>
          </div>
          <a
            aria-label="Continue"
            className="nhsuk-button"
            data-testid="continue-button"
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
