import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuintileTargetTable from "./QuintileTargetTable";

// Mocking the helper function
jest.mock("./helper", () => ({
  quintileHintText: jest.fn(() => "Mocked Quintile Hint Text"),
}));

describe("QuintileTargetTable", () => {
  const mockQuintileValues = {
    quintile1: 20,
    quintile2: 30,
    quintile3: 25,
    quintile4: 15,
    quintile5: 10,
  };

  const mockSumQuintiles = jest.fn(() => 100);
  const mockChangeHandler = jest.fn();

  const defaultProps = {
    quintileValuesAux: 100,
    quintileValues: mockQuintileValues,
    enableFillEdit: true,
    sumQuintiles: mockSumQuintiles,
    onQuintileChangeHandler: mockChangeHandler,
    isCorrectTotal: true,
  };

  test("renders QuintileTargetTable correctly", () => {
    render(<QuintileTargetTable {...defaultProps} />);

    // Check if the component renders correctly
    expect(screen.getByText("Quintile fill target")).toBeInTheDocument();
    expect((screen.getAllByText("Mocked Quintile Hint Text"))[0]).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Quintile" })).toBeInTheDocument();
  });

  test("handles input change correctly", () => {
    render(<QuintileTargetTable {...defaultProps} />);

    // Check if the input field is rendered
    const inputElement = screen.getByPlaceholderText(/20%/i);
    expect(inputElement).toBeInTheDocument();

    // Simulate input change
    fireEvent.change(inputElement, { target: { value: "50" } });

    // Check if the change handler is called
    expect(mockChangeHandler).toHaveBeenCalledWith(expect.any(Object), "quintile1");
  });

  test("displays error message correctly", () => {
    render(<QuintileTargetTable {...defaultProps} isCorrectTotal={false} />);

    // Check if the error message is displayed
    expect(screen.getByText("The fill targets must add up to 100%")).toBeInTheDocument();
  });

  test("displays total percentage correctly", () => {
    render(<QuintileTargetTable {...defaultProps} />);

    // Check if the total percentage is displayed
    expect(screen.getByText("Total percentage")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  test("handles non-fill edit mode correctly", () => {
    render(<QuintileTargetTable {...defaultProps} enableFillEdit={false} />);

    // Check if non-fill edit mode content is rendered
    expect((screen.getAllByText("Mocked Quintile Hint Text"))[0]).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  // test("matches prop types", () => {
  //   const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
  //   const invalidProps = {
  //     quintileValuesAux: "invalid",
  //     quintileValues: "invalid",
  //     enableFillEdit: "invalid",
  //     sumQuintiles: jest.fn(),
  //     onQuintileChangeHandler: jest.fn(),
  //     isCorrectTotal: "invalid",
  //   };

  //   render(<QuintileTargetTable {...invalidProps} />);

  //   // Check if prop type warnings are logged
  //   expect(consoleErrorSpy).toHaveBeenCalled();

  //   consoleErrorSpy.mockRestore();
  // });
});
