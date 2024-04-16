import React from "react";
import "../styles/css/sass.css";
import NavMenu from "./NavMenu";
// import { useSession } from "next-auth/react"; //Will require later
// import { redirect } from "next/navigation"; //Will require later

// Header container
export default function Header({ withNavigation }) {
  // Block below is used to Fetching user session data for client components since the
  // class component this component is imported is client component
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // Redirect to sign-in page if user is not authenticated
  //     console.log(
  //       "Inside Header Component, Session Data Not Found so logging out"
  //     );
  //     redirect("/signin?callbackUrl=/");
  //   },
  // });
  return withNavigation ? (
    <>
      <div>
        <a
          id="skip-to-main"
          href="#main-content"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
      </div>
      <header className="nhsuk-header" role="banner">
        <div className="nhsuk-width-container">
          <div className="nhsuk-header__container">
            <div className="nhsuk-header__logo">
              <a className="nhsuk-header__link" href="">
                <svg
                  role="img"
                  className="nhsuk-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 16"
                  height="40"
                  width="100"
                  aria-label="NHS homepage"
                >
                  <path
                    className="nhsuk-logo__background"
                    fill="#005eb8"
                    d="M0 0h40v16H0z"
                  ></path>
                  <path
                    className="nhsuk-logo__text"
                    fill="#fff"
                    d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="nhsuk-header__transactional-service-name">
              <a
                className="nhsuk-header__transactional-service-name--link"
                href="#"
              >
                GPS
              </a>
            </div>
            <div style={{ position: "relative", display: "flex" }}>
              {" "}
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "2%",
                  color: "white",
                  fontSize: "25px",
                }}
              >
                {/* Hi, {session?.user.name} */}
              </div>
            </div>
          </div>
          <div className="nhsuk-navigation-container">
            <NavMenu />
          </div>
        </div>
      </header>
    </>
  ) : (
    <>
      <a
        id="skip-to-main"
        href="#main-content"
        className="govuk-skip-link"
        data-module="govuk-skip-link"
      >
        Skip to main content
      </a>
      <header
        className="nhsuk-header nhsuk-header--transactional"
        role="banner"
      >
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo nhsuk-header__logo--only">
            <a
              className="nhsuk-header__link"
              href="/"
              aria-label="NHS homepage"
            >
              <svg
                className="nhsuk-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 16"
                height="40"
                width="100"
              >
                <path
                  className="nhsuk-logo__background"
                  fill="#005eb8"
                  d="M0 0h40v16H0z"
                ></path>
                <path
                  className="nhsuk-logo__text"
                  fill="#fff"
                  d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"
                ></path>
              </svg>
            </a>
          </div>
          <div className="nhsuk-header__transactional-service-name">
            <a
              className="nhsuk-header__transactional-service-name--link"
              href="#"
            >
              GPS
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
