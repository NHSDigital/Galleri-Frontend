import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SummaryListFirst from "./SummaryListFirst";

describe("SummaryListFirst", () => {
  const mockProps = {
    appsRemaining: 10,
    targetPercentageToFill: 50,
    targetAppToFill: 5,
    rangeSelection: 20,
    totalToInvite: 30,
  };

  test("renders SummaryListFirst correctly", () => {
    render(<SummaryListFirst  {...mockProps} props={mockProps} />);

    // Check if the component renders correctly
    expect(screen.getByText("Appointments remaining")).toBeInTheDocument();
    expect(screen.getByText("Target percentage of appointments to fill")).toBeInTheDocument();
    expect(screen.getByText("Target number of appointments to fill")).toBeInTheDocument();
    expect(screen.getByText("Distance from clinic")).toBeInTheDocument();
    expect(screen.getByText("Total available to invite")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("+ 20 miles")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  // test("matches prop types", () => {
  //   const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
  //   const invalidProps = {
  //     appsRemaining: "invalid",
  //     rangeSelection: "invalid",
  //     targetAppToFill: "invalid",
  //     targetPercentageToFill: "invalid",
  //     totalToInvite: "invalid",
  //   };

  //   render(<SummaryListFirst {...invalidProps} props={invalidProps} />);

  //   // Check if prop type warnings are logged
  //   expect(consoleErrorSpy).toHaveBeenCalled();

  //   consoleErrorSpy.mockRestore();
  // });
});
