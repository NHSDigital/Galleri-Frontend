"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Footer from "../components/Footer";
import "../styles/css/sass.css";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { data: session } = useSession();

  useEffect(() => {
    // Redirect to the homepage if the user is already logged in
    if (session) {
      window.location.href = "/";
    }
  }, [session]);

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false, // Don't redirect, handle the result in the component
    });

    if (result.error) {
      // Handle error, e.g., display error message
      console.error(result.error);
    } else {
      // Redirect to home or any other page after successful sign-in
      window.location.href = "/";
    }
  };

  const handlePasswordKeyDown = (e) => {
    // If Enter is pressed, prevent the default behavior (form submission) and trigger handleSubmit
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <header className="nhsuk-header nhsuk-header--transactional" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo nhsuk-header__logo--only"><a className="nhsuk-header__link" href="/" aria-label="NHS homepage">
            <svg className="nhsuk-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16" height="40" width="100">
              <path className="nhsuk-logo__background" fill="#005eb8" d="M0 0h40v16H0z"></path>
              <path className="nhsuk-logo__text" fill="#fff" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"></path>
            </svg>
          </a>
          </div>
        </div>
      </header>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>GPS Sign-In Page</h1>
              <div className="nhsuk-grid-column-two-third">
                <div
                  className="nhsuk-form-group"
                >
                  <label className="nhsuk-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="nhsuk-input nhsuk-u-width-one-half"
                    id="email"
                    name="email"
                    type="text"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="nhsuk-form-group">
                  <label className="nhsuk-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="nhsuk-input nhsuk-u-width-one-half"
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    onKeyDown={handlePasswordKeyDown}
                  />
                </div>
                <div >
                  <button className="nhsuk-button" data-module="nhsuk-button" type="submit" onClick={handleSubmit}>Sign In with Email</button>
                </div>
                <p> ------------- or ------------- </p>
                <div>
                  <button className="nhsuk-button" data-module="nhsuk-button" onClick={() => signIn("github")}>
                    Sign In with GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main >
      </div >
      <Footer />
    </>
  );
};

export default SignIn;
