"use client";
// The display counter does not represent the actual timer after inactive,
// and it auto-signs out after set timer runs out regardless of inactive or not
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";

const timeout = 60000 * 2; // 2 mins currently but have to be 10 minutes in milliseconds

const AutoSignOutProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(timeout / 1000);
  const { data: session } = useSession();
  const resetTimerRef = useRef();

  // Function to reset the timer
  const resetTimer = useCallback(() => {
    console.log("Resetting timer function.");
    clearTimeout(timer);
    // Set a new timer when called
    // setTimer(setTimeout(() => handleSignOut(), timeout));
    setTimer(setTimeout(() => timeout));
    setRemainingTime(timeout / 1000);
  }, [timer, remainingTime]);

  // Save the current resetTimer function to the ref
  resetTimerRef.current = resetTimer;

  // Function to handle the sign-out action
  const handleSignOut = async () => {
    console.log("Auto sign out handle singout action invoked");
    window.location.href = "/signin?callbackUrl=/";
  };

  useEffect(() => {
    // Set the initial timer when the component mounts
    // setTimer(setTimeout(() => handleSignOut(), timeout));
    setTimer(setTimeout(() => timeout));

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]); // Empty dependency array ensures the effect runs only on mount and unmount

  useEffect(() => {
    // Function to reset the timer on user activity
    const resetTimerOnActivity = () => {
      console.log("User activity detected! Resetting timer.");
      resetTimerRef.current();
    };

    // Attach event listeners for user activity
    document.addEventListener("mousemove", resetTimerOnActivity);
    document.addEventListener("click", resetTimerOnActivity);
    document.addEventListener("touchstart", resetTimerOnActivity);

    // Detach event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", resetTimerOnActivity);
      document.removeEventListener("click", resetTimerOnActivity);
      document.removeEventListener("touchstart", resetTimerOnActivity);
    };
  }, []);

  useEffect(() => {
    // Reset the timer when the session changes
    resetTimerRef.current();
  }, [session]);

  useEffect(() => {
    // Update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if remaining time is zero and trigger sign-out
    if (remainingTime === 0) {
      handleSignOut();
    }
  }, [remainingTime]);

  return (
    <>
      <div>Remaining Time: {remainingTime} seconds</div>
      {children}
    </>
  );
};

export default AutoSignOutProvider;
