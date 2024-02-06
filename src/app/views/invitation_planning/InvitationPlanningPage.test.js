import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvitationPlanningPage from "./InvitationPlanningPage";

import { useInactivity } from "../../context/AutoSignOutProvider";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("../../context/AutoSignOutProvider");

const mockInactivityValues = {
  showLogoutPage: false,
  closeLogoutPage: jest.fn(),
};

const mockSession = {
  user: { name: "Test User", email: "test1@example.com" },
  expires: "mock-expiry",
};

useSession.mockReturnValue([mockSession, false]);
useInactivity.mockReturnValue(mockInactivityValues);

global.renderWithInactivityProvider = (ui, options) => {
  return render(
    <InactivityProvider timeout={10000}>{ui}</InactivityProvider>,
    options
  );
};

// Mocked props
const mockProps = {
  quintileValues: {},
  quintileValuesAux: {},
  onQuintileChangeHandler: jest.fn(),
  onAmendFillHandler: jest.fn(),
  onSaveFillHandler: jest.fn(),
  enableFillEdit: false,
  onCancelSaveFillHandler: jest.fn(),
  lastUpdatedQuintile: "2023-01-01",
  userName: "John Doe",
  isCorrectTotal: true,
  nationalUptakePercentage: 50,
  enableUptakeEdit: false,
  onAmendForecastHandler: jest.fn(),
  onUptakeChangeHandler: jest.fn(),
  isCorrectUptakeTotal: true,
  onCancelSaveForecastHandler: jest.fn(),
  onSaveForecastHandler: jest.fn(),
  sumQuintiles: jest.fn(),
  onKeyUp: jest.fn(),
};

describe("InvitationPlanningPage Component", () => {
  test("renders without crashing", () => {
    render(<InvitationPlanningPage {...mockProps} />);
    expect(screen.getByText("Invitation variables")).toBeInTheDocument();
  });

  test("renders error summary when isCorrectUptakeTotal or isCorrectTotal is false", () => {
    const propsWithErrors = {
      ...mockProps,
      isCorrectUptakeTotal: false,
      isCorrectTotal: false,
    };
    render(<InvitationPlanningPage {...propsWithErrors} />);
    expect(screen.getAllByRole("alert")[0]).toBeInTheDocument();
  });

  test('triggers onCancelSaveForecastHandler on "Cancel without saving" click', () => {
    render(<InvitationPlanningPage {...mockProps} enableUptakeEdit={true} />);
    fireEvent.click(screen.getByText("Cancel without saving"));
    expect(mockProps.onCancelSaveForecastHandler).toHaveBeenCalled();
  });

  test('triggers onSaveForecastHandler on "Save changes" click', () => {
    render(<InvitationPlanningPage {...mockProps} enableUptakeEdit={true} />);
    fireEvent.click(screen.getByText("Save changes"));
    expect(mockProps.onSaveForecastHandler).toHaveBeenCalledWith(50);
  });

  test('triggers onAmendForecastHandler on "Amend forecast uptake" click', () => {
    render(<InvitationPlanningPage {...mockProps} />);
    fireEvent.click(screen.getByText("Amend forecast uptake"));
    expect(mockProps.onAmendForecastHandler).toHaveBeenCalledWith(50);
  });

  test('triggers onCancelSaveFillHandler on "Cancel without saving" click', () => {
    render(<InvitationPlanningPage {...mockProps} enableFillEdit={true} />);
    fireEvent.click(screen.getByText("Cancel without saving"));
    expect(mockProps.onCancelSaveFillHandler).toHaveBeenCalled();
  });

  test('triggers onSaveFillHandler on "Save changes" click', () => {
    render(<InvitationPlanningPage {...mockProps} enableFillEdit={true} />);
    fireEvent.click(screen.getByText("Save changes"));
    expect(mockProps.onSaveFillHandler).toHaveBeenCalledWith({});
  });

  test('triggers onAmendFillHandler on "Amend fill target" click', () => {
    render(<InvitationPlanningPage {...mockProps} />);
    fireEvent.click(screen.getByText("Amend fill target"));
    expect(mockProps.onAmendFillHandler).toHaveBeenCalled();
  });
});
