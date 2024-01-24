import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { InactivityProvider } from "../../context/AutoSignOutProvider.jsx";
import LoggedOut from "./LoggedOut";
import Root from "../../page";
import PrivacyConfirmationPage from "../privacy_confirmation/PrivacyConfirmationPage";
import { useSession } from "next-auth/react";

jest.mock("../privacy_confirmation/PrivacyConfirmationPage", () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="privacy-confirmation-page">
        Privacy Confirmation Start Page
      </div>
    ),
  };
});

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

describe("LoggedOut page", () => {
  test("it should render logged out page", () => {
    const mockSession = {
      user: { name: "Test User", email: "test@example.com" },
      expires: "mock-expiry",
    };

    useSession.mockReturnValueOnce([null, true]);
    useSession.mockReturnValueOnce([mockSession, false]);
    render(
      <InactivityProvider timeout={10000}>
        <Root />
        <LoggedOut />
      </InactivityProvider>
    );
    const logoutButton = screen.getByLabelText("Continue");
    const logoutHeader = screen.getByTestId("log-out-header");

    expect(logoutButton).toBeDefined();
    expect(logoutHeader).toBeDefined();
  });

  test("it shows continue button after timeout", async () => {
    const mockSession = {
      user: { name: "Test User", email: "test@example.com" },
      expires: "mock-expiry",
    };

    useSession.mockReturnValueOnce([null, true]);
    useSession.mockReturnValueOnce([mockSession, false]);
    const { getByLabelText, queryByTestId } = render(
      <InactivityProvider timeout={1000}>
        <Root />
        <LoggedOut />
      </InactivityProvider>
    );

    expect(queryByTestId("privacy-confirmation-page")).toBeInTheDocument();
    const logoutButton = getByLabelText("Continue");
    await waitFor(() => {
      expect(logoutButton).toBeInTheDocument();
    }, 1100);

    fireEvent.click(logoutButton);
    expect(queryByTestId("privacy-confirmation-page")).toBeInTheDocument();
    expect(logoutButton).toBeDefined();
  });
});
