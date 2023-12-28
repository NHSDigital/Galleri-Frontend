import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SummaryListSecond from "./SummaryListSecond";

describe("SummaryListSecond", () => {
  const defaultProps = {
    displayErrorInvitationSummary: false,
    avgExpectedUptake: 80,
    noInviteToGenerate: 50,
  };

  test("renders SummaryListSecond correctly without error", () => {
    render(<SummaryListSecond {...defaultProps} />);

    // Check if the component renders correctly without error
    expect(screen.getByTestId("summary-list-2")).toBeInTheDocument();
    expect(screen.queryByTestId("summary-list-2-error")).not.toBeInTheDocument();
  });

  test("renders SummaryListSecond correctly with error", () => {
    const propsWithError = { ...defaultProps, displayErrorInvitationSummary: true };
    render(<SummaryListSecond {...propsWithError} />);

    // Check if the component renders correctly with error
    expect(screen.getByTestId("summary-list-2-error")).toBeInTheDocument();
    expect(screen.queryByTestId("summary-list-2")).not.toBeInTheDocument();
  });

  test("matches prop types", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
    const invalidProps = {
      displayErrorInvitationSummary: "invalid",
      avgExpectedUptake: "invalid",
      noInviteToGenerate: "invalid",
    };

    render(<SummaryListSecond {...invalidProps} />);

    // Check if prop type warnings are logged
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
