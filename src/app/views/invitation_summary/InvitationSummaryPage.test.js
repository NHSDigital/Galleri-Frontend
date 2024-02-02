import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import InvitationSummaryPage from "./InvitationSummaryPage";

jest.mock("./CheckDetailsBanner", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked CheckDetailsBanner</div>),
}));

jest.mock("./ClinicInfo", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ClinicInfo</div>),
}));

jest.mock("./SummaryListFirst", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked SummaryListFirst</div>),
}));

jest.mock("./SummaryListSecond", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked SummaryListSecond</div>),
}));

describe("InvitationSummaryPage", () => {
  const defaultProps = {
    clinicName: "Test Clinic",
    address1: "123 Street",
    address2: "Apt 45",
    postcode: "12345",
    displayCheckDetailsBanner: true,
    displayErrorInvitationSummary: false,
    displayConfirmationInvitationSummary: false,
    onClickGenerateHandler: jest.fn(),
    onClickGoBackPrevPageLinkHandler: jest.fn(),
    recentInvitationHistory: [],
    rangeSelection: "Week",
    targetAppToFill: "Mock App",
    targetPercentageToFill: 80,
    totalToInvite: 100,
    avgExpectedUptake: 70,
    noInviteToGenerate: false,
  };

  it("renders InvitationSummaryPage correctly", () => {
    render(<InvitationSummaryPage {...defaultProps} />);

    // Check if the component renders correctly
    expect(
      screen.getByTestId("invitation-summary-container")
    ).toBeInTheDocument();
    expect(screen.getByText("Invitation summary")).toBeInTheDocument();
  });

  it("displays ClinicInfo component", () => {
    render(<InvitationSummaryPage {...defaultProps} />);
    expect(screen.getByText("Mocked ClinicInfo")).toBeInTheDocument();
  });

  it("displays mocked components correctly", () => {
    render(<InvitationSummaryPage {...defaultProps} />);
    expect(screen.getByText("Mocked CheckDetailsBanner")).toBeInTheDocument();
    expect(screen.getByText("Mocked SummaryListFirst")).toBeInTheDocument();
    expect(screen.getByText("Mocked SummaryListSecond")).toBeInTheDocument();
    expect(screen.getByText("Generate invitations")).toBeInTheDocument();
  });

  it("handles button click correctly", () => {
    render(<InvitationSummaryPage {...defaultProps} />);

    // Simulate button click
    fireEvent.click(screen.getByText("Go back to clinic invitations"));

    // Check if the click handler is called
    expect(defaultProps.onClickGoBackPrevPageLinkHandler).toHaveBeenCalled();
  });

  it("renders 'Generate Invite' button and handles click correctly", () => {
    const mockOnClickGenerateHandler = jest.fn();
    const props = {
      ...defaultProps,
      onClickGenerateHandler: mockOnClickGenerateHandler,
    };

    render(<InvitationSummaryPage {...props} />);

    // Check if the 'Generate Invite' button is rendered
    const generateButton = screen.getByText("Generate invitations");
    expect(generateButton).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(generateButton);

    // Check if the click handler is called
    expect(mockOnClickGenerateHandler).toHaveBeenCalled();
  });
});
