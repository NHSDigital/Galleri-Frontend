"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';


const AutoSignOutProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const { data: session } = useSession();

  const resetTimer = useCallback(() => {
    clearTimeout(timer);
    setTimer(setTimeout(() => handleSignOut(), 60000)); // 1 minute in milliseconds
  }, [timer]);

  const handleSignOut = async () => {
    window.location.href = '/signin?callbackUrl=/';
  };

  useEffect(() => {
    setTimer(setTimeout(() => handleSignOut(), 60000));

    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  useEffect(() => {
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
