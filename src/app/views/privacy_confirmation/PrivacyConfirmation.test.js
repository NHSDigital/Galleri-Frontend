import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from '@testing-library/react';
import PrivacyConfirmationPage from "./PrivacyConfirmationPage";
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider



describe("ClinicInfo", () => {
  const mockProps = {
    onToggleConfirmationHandler: jest.fn(),
    onClickContinueHandler: jest.fn(),
    showError: false, // or true based on your testing scenario
  };

  // Mock the next-auth/react module
  jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    getProviders: jest.fn(),
  }));

  // Mock the next/navigation module
  jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
  }));

  test("renders PrivacyConfirmation correctly", () => {
    // Mock the session data
    const session = { data: { user: { name: 'Test User' } }, status: 'authenticated' };
    // Mock the useSession hook to return the mock session
    require('next-auth/react').useSession.mockReturnValueOnce(session);
    render(
      <SessionProvider session={session}>
        <PrivacyConfirmationPage {...mockProps} props={mockProps} />
      </SessionProvider>
    );
    expect(screen.getByText("Protecting patient data")).toBeInTheDocument();
    // expect(screen.getByText("You must only access a participant's records if there is a legitimate requirement to access their data.")).toBeInTheDocument();
    // expect(screen.getByText("All activity in the Galleri pilot system is routinely checked to ensure records are not accessed inappropriately.")).toBeInTheDocument();
    // expect(screen.getByText("When you are finished using the system you must:")).toBeInTheDocument();
    // expect(screen.getByText("Log out using the button in the top right hand corner.")).toBeInTheDocument();
    // expect(screen.getByText("Remove your smart card.")).toBeInTheDocument();
    // expect(screen.getByText("I have read and understood this message")).toBeInTheDocument();
  });

  test("renders PrivacyConfirmation errors correctly", () => {
    // Mock the session data
    const session = { data: { user: { name: 'Test User' } }, status: 'authenticated' };
    // Mock the useSession hook to return the mock session
    require('next-auth/react').useSession.mockReturnValueOnce(session);
    const mockProps = {
      onToggleConfirmationHandler: jest.fn(),
      onClickContinueHandler: jest.fn(),
      showError: true, // or true based on your testing scenario
    };
    render(
      <SessionProvider session={session}>
        <PrivacyConfirmationPage {...mockProps} props={mockProps} />
      </SessionProvider>
    );
    const checkbox = screen.getByTestId('errors-confirm-privacy');
    expect(checkbox.checked).toEqual(false);
    // Simulate a click on the "Continue" button while checkbox unchecked
    fireEvent.click(screen.getByText('Continue'));
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
  });

  test("renders PrivacyConfirmation checkbox to function correctly", () => {
    // Mock the session data
    const session = { data: { user: { name: 'Test User' } }, status: 'authenticated' };
    // Mock the useSession hook to return the mock session
    require('next-auth/react').useSession.mockReturnValueOnce(session);
    render(
      <SessionProvider session={session}>
        <PrivacyConfirmationPage  {...mockProps} props={mockProps} />
      </SessionProvider>
    );
    const checkbox = screen.getByTestId('confirm-privacy');
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
