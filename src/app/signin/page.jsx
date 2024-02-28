"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Footer from "../components/Footer";
import "../styles/css/sass.css";
import Header from "../components/Header";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { data: session } = useSession();

  useEffect(() => {
    // Keeping this here in case we want to route different users to different pages for referrals repo
    if (
      session?.user?.otherUserInfo?.Role === "Referring Clinician" ||
      session?.user?.role === "Invitation Planner" ||
      session?.user?.otherUserInfo?.Role === "Invitation Planner" ||
      session?.user?.role === "Referring Clinician"
    ) {
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
      <Header />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>GPS Sign-In Page</h1>
              <div className="nhsuk-grid-column-two-third">
                <div className="nhsuk-form-group">
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
                <div>
                  <button
                    className="nhsuk-button"
                    data-module="nhsuk-button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign In with Email
                  </button>
                </div>
                <p> ------------- or ------------- </p>
                <div>
                  <button
                    className="nhsuk-button"
                    data-module="nhsuk-button"
                    onClick={() => signIn("cis2")}
                  >
                    Sign In with CIS2
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
