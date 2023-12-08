"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

const timeout = 60000 * 2; // 10 minute in milliseconds

const AutoSignOutProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const { data: session } = useSession();

  // Function to reset the timer
  const resetTimer = useCallback(() => {
    clearTimeout(timer);
    // Set a new timer when called
    setTimer(setTimeout(() => handleSignOut(), timeout));
  }, [timer]);

  // Function to handle the sign-out action
  const handleSignOut = async () => {
    window.location.href = '/signin?callbackUrl=/';
  };

  useEffect(() => {
    // Set the initial timer when the component mounts
    setTimer(setTimeout(() => handleSignOut(), timeout));

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  useEffect(() => {
    // Function to reset the timer on user activity
    const resetTimerOnActivity = () => {
      resetTimer();
    };

    // Attach event listeners for user activity
    document.addEventListener('mousemove', resetTimerOnActivity);
    document.addEventListener('click', resetTimerOnActivity);
    document.addEventListener('touchstart', resetTimerOnActivity);

    // Detach event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', resetTimerOnActivity);
      document.removeEventListener('click', resetTimerOnActivity);
      document.removeEventListener('touchstart', resetTimerOnActivity);
    };
  }, [resetTimer]);

  useEffect(() => {
    // Reset the timer when the session changes
    resetTimer();
  }, [session, resetTimer]);

  return <>{children}</>;
};

export default AutoSignOutProvider;
