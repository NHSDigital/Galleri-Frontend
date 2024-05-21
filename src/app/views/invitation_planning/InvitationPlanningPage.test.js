import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvitationPlanningPage from "./InvitationPlanningPage";
import { SessionProvider } from "next-auth/react";
import { InactivityProvider } from "../../context/AutoSignOutProvider";

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
  const mockInactivityValues = {
    showLogoutPage: false,
    closeLogoutPage: jest.fn(),
  };

  jest.mock("../../context/AutoSignOutProvider.jsx", () => ({
    ...jest.requireActual("../../context/AutoSignOutProvider.jsx"),
    useInactivity: jest.fn(() => mockInactivityValues),
  }));
  test("renders without crashing", () => {
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
          <InvitationPlanningPage {...mockProps} />
        </InactivityProvider>
      </SessionProvider>
    );
    expect(screen.getByText("Invitation variables")).toBeInTheDocument();
  });

  test("renders error summary when isCorrectUptakeTotal or isCorrectTotal is false", () => {
    const propsWithErrors = {
      ...mockProps,
      isCorrectUptakeTotal: false,
      isCorrectTotal: false,
    };
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
          <InvitationPlanningPage {...propsWithErrors} />
        </InactivityProvider>
      </SessionProvider>
    );
    expect(screen.getAllByRole("alert")[0]).toBeInTheDocument();
  });

  test('triggers onCancelSaveForecastHandler on "Cancel without saving" click', () => {
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
          <InvitationPlanningPage {...mockProps} enableUptakeEdit={true} />
        </InactivityProvider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Cancel without saving"));
    expect(mockProps.onCancelSaveForecastHandler).toHaveBeenCalled();
  });

  test('triggers onSaveForecastHandler on "Save changes" click', () => {
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
          <InvitationPlanningPage {...mockProps} enableUptakeEdit={true} />
        </InactivityProvider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Save changes"));
    expect(mockProps.onSaveForecastHandler).toHaveBeenCalledWith(50);
  });

  test('triggers onAmendForecastHandler on "Amend forecast uptake" click', () => {
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
          <InvitationPlanningPage {...mockProps} />
        </InactivityProvider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Amend forecast uptake"));
    expect(mockProps.onAmendForecastHandler).toHaveBeenCalledWith(50);
  });

  test('triggers onCancelSaveFillHandler on "Cancel without saving" click', () => {
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
          <InvitationPlanningPage {...mockProps} enableFillEdit={true} />
        </InactivityProvider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Cancel without saving"));
    expect(mockProps.onCancelSaveFillHandler).toHaveBeenCalled();
  });

  test('triggers onSaveFillHandler on "Save changes" click', () => {
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
          <InvitationPlanningPage {...mockProps} enableFillEdit={true} />
        </InactivityProvider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Save changes"));
    expect(mockProps.onSaveFillHandler).toHaveBeenCalledWith({});
  });

  test('triggers onAmendFillHandler on "Amend fill target" click', () => {
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
          <InvitationPlanningPage {...mockProps} />
        </InactivityProvider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByText("Amend fill target"));
    expect(mockProps.onAmendFillHandler).toHaveBeenCalled();
  });
});
