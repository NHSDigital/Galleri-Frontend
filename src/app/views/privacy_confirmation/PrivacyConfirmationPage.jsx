"use client";

import React, { useState } from "react";
import "../../styles/css/sass.css";
import { useSession } from "next-auth/react";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";
import LoggedOut from "../logged_out/LoggedOut";

export default function PrivacyConfirmationPage({ continueToStart }) {
  const [confirmationReceived, setConfirmationReceived] = useState(false);
  const [showError, setShowError] = useState(false);

  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <Header />;
  }

  if (!session) {
    typeof window !== "undefined" && (window.location.href = "/signin");
    return null;
  }

  const { showLogoutPage } = useInactivity();

  const onToggleConfirmationHandler = () => {
    setConfirmationReceived(!confirmationReceived);
  };

  const onClickContinueHandler = () => {
    if (confirmationReceived) {
      if (session?.user?.otherUserInfo?.Role === "Referring Clinician") {
        window.location.href = "/onwardreferral";
      } else if (
        session?.user?.Role === "Invitation Planner" ||
        session?.user?.otherUserInfo?.Role === "Invitation Planner"
      ) {
        continueToStart(true);
      } else if (session?.user?.role === "Referring Clinician") {
        window.location.href = "/onwardreferral";
      }
    } else setShowError(true);
  };

  return !showLogoutPage ? (
    <>
      <Header />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          {showError ? (
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-two-thirds">
                <form>
                  <div
                    className="nhsuk-error-summary"
                    aria-labelledby="error-summary-title"
                    role="alert"
                    tabIndex="-1"
                  >
                    <h2
                      className="nhsuk-error-summary__title"
                      id="error-summary-title"
                    >
                      There is a problem
                    </h2>
                    <div className="nhsuk-error-summary__body">
                      <ul
                        className="nhsuk-list nhsuk-error-summary__list"
                        role="list"
                      >
                        <li>
                          <a href="#errors-confirm-privacy">
                            Select the checkbox to confirm you have read and
                            understood the message
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h1>Protecting patient data</h1>
              <p>
                You must only access a participant’s records if there is a
                legitimate requirement to access their data.{" "}
              </p>
              <p>
                All activity in the Galleri pilot system is routinely checked to
                ensure records are not accessed inappropriately.
              </p>
              <p>When you are finished using the system you must:</p>
              <div className="nhsuk-grid-column-full">
                <ol>
                  <li>
                    Log out using the button in the top right hand corner.
                  </li>
                  <li>Remove your smart card.</li>
                </ol>
              </div>
            </div>
          </div>
          {showError ? (
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-two-thirds">
                <form>
                  <div className="nhsuk-form-group nhsuk-form-group--error">
                    <fieldset
                      className="nhsuk-fieldset"
                      aria-describedby="contact-hint contact-error"
                    >
                      <span className="nhsuk-error-message" id="contact-error">
                        <span className="nhsuk-u-visually-hidden">Error:</span>{" "}
                        Select the checkbox to confirm you have read and
                        understood the message
                      </span>

                      <div className="nhsuk-checkboxes">
                        <div className="nhsuk-checkboxes__item nhsuk-u-margin-bottom-4">
                          <input
                            className="nhsuk-checkboxes__input"
                            id="errors-confirm-privacy"
                            data-testid="errors-confirm-privacy"
                            name="confirm-privacy"
                            type="checkbox"
                            value={false}
                            onChange={() => onToggleConfirmationHandler()}
                          />
                          <label
                            className="nhsuk-label nhsuk-checkboxes__label"
                            htmlFor="errors-confirm-privacy"
                          >
                            I have read and understood this message
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="nhsuk-checkboxes__item nhsuk-u-margin-bottom-4">
              <input
                className="nhsuk-checkboxes__input"
                id="confirm-privacy"
                data-testid="confirm-privacy"
                name="confirm-privacy"
                type="checkbox"
                value={false}
                onChange={() => onToggleConfirmationHandler()}
              />
              <label
                className="nhsuk-label nhsuk-checkboxes__label"
                htmlFor="errors-confirm-privacy"
              >
                I have read and understood this message
              </label>
            </div>
          )}
          <br />
          <a
            className="nhsuk-button"
            data-testid="continue-button"
            href="#"
            role="button"
            draggable="false"
            onClick={() => onClickContinueHandler()}
          >
            Continue
          </a>
        </main>
      </div>
    </>
  ) : (
    <LoggedOut showHeader={true} />
  );
}
