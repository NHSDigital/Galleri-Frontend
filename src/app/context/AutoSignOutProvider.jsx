"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

const InactivityContext = createContext();

const InactivityProvider = ({ children, timeout }) => {
  const [showLogoutPage, setShowLogoutPage] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowLogoutPage(true);
    }, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    const onActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, onActivity);
    });
    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, onActivity);
      });
    };
  }, [timeout]);

  const closeLogoutPage = async () => {
    resetTimer();
    window.location.href = "/";
    setTimeout(() => {
      setShowLogoutPage(false);
    }, 1000);
  };

  return (
    <InactivityContext.Provider
      value={{ showLogoutPage, closeLogoutPage, sessionId, setSessionId }}
    >
      {children}
    </InactivityContext.Provider>
  );
};

const useInactivity = () => {
  return useContext(InactivityContext);
};

export { InactivityProvider, useInactivity };
