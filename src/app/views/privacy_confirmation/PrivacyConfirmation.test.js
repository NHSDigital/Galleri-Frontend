import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from '@testing-library/react';
import PrivacyConfirmation from "./PrivacyConfirmation";

describe("ClinicInfo", () => {
  const mockProps = {};

  test("renders PrivacyConfirmation correctly", () => {
    render(<PrivacyConfirmation {...mockProps} />);
    expect(screen.getByText("Protecting patient data")).toBeInTheDocument();
    expect(screen.getByText("You must only access a participant’s records if there is a legitimate requirement to access their data.")).toBeInTheDocument();
    expect(screen.getByText("All activity in the Galleri pilot system is routinely checked to ensure records are not accessed inappropriately.")).toBeInTheDocument();
    expect(screen.getByText("When you are finished using the system you must:")).toBeInTheDocument();
    expect(screen.getByText("Log out using the button in the top right hand corner.")).toBeInTheDocument();
    expect(screen.getByText("Remove your smart card.")).toBeInTheDocument();
    expect(screen.getByText("I have read and understood this message")).toBeInTheDocument();
  });

  test("renders PrivacyConfirmation errors correctly", () => {
    render(<PrivacyConfirmation {...mockProps} />);
    const checkbox = screen.getByTestId('confirm-privacy');
    expect(checkbox.checked).toEqual(false);
    // Simulate a click on the "Continue" button while checkbox unchecked
    fireEvent.click(screen.getByText('Continue'));
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
  });

  test("renders PrivacyConfirmation checkbox to function correctly", () => {
    render(<PrivacyConfirmation {...mockProps} />);
    const checkbox = screen.getByTestId('confirm-privacy');
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
