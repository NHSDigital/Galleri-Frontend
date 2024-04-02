import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PrivacyConfirmationPage from "./PrivacyConfirmationPage";
import { SessionProvider } from "next-auth/react";
import { InactivityProvider } from "../../context/AutoSignOutProvider.jsx";

describe("Privacy Confirmation Page", () => {
  const mockProps = {
    onToggleConfirmationHandler: jest.fn(),
    onClickContinueHandler: jest.fn(),
    showError: false,
  };

  const mockInactivityValues = {
    showLogoutPage: false,
    closeLogoutPage: jest.fn(),
  };

  jest.mock("../../context/AutoSignOutProvider.jsx", () => ({
    ...jest.requireActual("../../context/AutoSignOutProvider.jsx"),
    useInactivity: jest.fn(() => mockInactivityValues),
  }));

  test("renders Privacy Confirmation correctly", () => {
    const session = {
      data: { user: { name: "Test User" } },
      status: "authenticated",
    };

    jest.mock("next-auth/react", () => ({
      useSession: jest.fn(() => ({ data: session })),
    }));

    render(
      <SessionProvider session={session}>
        <InactivityProvider timeout={1000}>
          <PrivacyConfirmationPage {...mockProps} />
        </InactivityProvider>
      </SessionProvider>
    );

    expect(screen.getByText("Protecting patient data")).toBeInTheDocument();
    expect(
      screen.getByText("When you are finished using the system you must:")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Log out using the button in the top right hand corner.")
    ).toBeInTheDocument();
    expect(screen.getByText("Remove your smart card.")).toBeInTheDocument();
    expect(
      screen.getByText("I have read and understood this message")
    ).toBeInTheDocument();
  });

  test("redirects to the onward referral page for Referring Clinician", () => {
    const session = {
      data: { user: { otherUserInfo: { Role: "Referring Clinician" } } },
      status: "authenticated",
    };

    jest.mock("next-auth/react", () => ({
      useSession: jest.fn(() => ({ data: session })),
    }));

    const { getByTestId } = render(
      <SessionProvider session={session}>
        <InactivityProvider timeout={1000}>
          <PrivacyConfirmationPage {...mockProps} />
        </InactivityProvider>
      </SessionProvider>
    );
    const continueButton = getByTestId("continue-button");

    fireEvent.click(continueButton);

    waitFor(() => {
      expect(window.location.href).toEqual("/onwardreferral");
    });
  });

  test("renders Privacy Confirmation errors correctly", () => {
    const session = {
      data: { user: { name: "Test User" } },
      status: "authenticated",
    };

    jest.mock("next-auth/react", () => ({
      useSession: jest.fn(() => ({ data: session })),
    }));

    render(
      <SessionProvider session={session}>
        <InactivityProvider timeout={1000}>
          <PrivacyConfirmationPage {...mockProps} showError={true} />
        </InactivityProvider>
      </SessionProvider>
    );

    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
  });

  test("renders Privacy Confirmation checkbox to function correctly", () => {
    const session = {
      data: { user: { name: "Test User" } },
      status: "authenticated",
    };

    // Mock the useSession hook to return the mock session
    jest.mock("next-auth/react", () => ({
      useSession: jest.fn(() => ({ data: session })),
    }));

    render(
      <SessionProvider session={session}>
        <InactivityProvider timeout={1000}>
          <PrivacyConfirmationPage {...mockProps} />
        </InactivityProvider>
      </SessionProvider>
    );

    const checkbox = screen.getByTestId("confirm-privacy");
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
