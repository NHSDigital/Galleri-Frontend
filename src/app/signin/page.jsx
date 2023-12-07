"use client";

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/css/sass.css";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { data: session } = useSession();

  useEffect(() => {
    // Redirect to the homepage if the user is already logged in
    if (session) {
      window.location.href = '/';
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      ...credentials,
      redirect: false, // Don't redirect, handle the result in the component
    });

    if (result.error) {
      // Handle error, e.g., display error message
      console.error(result.error);
    } else {
      // Redirect to home or any other page after successful sign-in
      window.location.href = '/';
    }
  };

  return (
    <>
      <Header />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>Custom Sign-In Page</h1>
              <div className="nhsuk-grid-column-two-third">
                <form onSubmit={handleSubmit}>
                  <div className="nhsuk-form-group" style={{ marginBottom: '10px' }}>
                    <label className="nhsuk-label" htmlFor="email">
                      Email
                      <input
                        className="nhsuk-input nhsuk-u-width-one-half"
                        id="email"
                        name="email"
                        type="text"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      />
                    </label>
                  </div>
                  <div className="nhsuk-form-group">
                    <label className="nhsuk-label" htmlFor="password">
                      Password
                      <input
                        className="nhsuk-input nhsuk-u-width-one-half"
                        id="password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      />
                    </label>
                  </div>
                  <button type="submit">Sign In</button>
                </form>
              </div>
            </div>
            <div>
              <button onClick={() => signIn('github')}>Sign In with GitHub</button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
