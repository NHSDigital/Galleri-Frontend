import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import NationalForecastUptakeTable from "./NationalForecastUptakeTable";

describe("NationalForecastUptakeTable", () => {
  const mockProps = {
    nationalUptakePercentage: 50,
    enableUptakeEdit: true,
    onUptakeChangeHandler: jest.fn(),
    isCorrectUptakeTotal: true,
  };

  test("renders without crashing", () => {
    render(<NationalForecastUptakeTable {...mockProps} />);
  });

  test("renders caption with correct label", () => {
    const { getByText } = render(
      <NationalForecastUptakeTable {...mockProps} />
    );
    expect(getByText("National forecast uptake")).toBeInTheDocument();
  });

  test("renders error message when isCorrectUptakeTotal is false", () => {
    const { getByText } = render(
      <NationalForecastUptakeTable
        {...mockProps}
        isCorrectUptakeTotal={false}
      />
    );
    expect(
      getByText("The uptake percentage must be between 1% and 100%")
    ).toBeInTheDocument();
  });

  test("renders input field with correct attributes when enableUptakeEdit is true", () => {
    const { getAllByLabelText, getByPlaceholderText } = render(
      <NationalForecastUptakeTable {...mockProps} enableUptakeEdit={true} />
    );
    const inputElement = getAllByLabelText("National forecast uptake");
    expect(inputElement[1]).toBeInTheDocument();
    expect(getByPlaceholderText("50%")).toBeInTheDocument(); // Assuming nationalUptakePercentage is 50
  });

  test("calls onUptakeChangeHandler when input value changes", () => {
    const { getAllByLabelText } = render(
      <NationalForecastUptakeTable {...mockProps} enableUptakeEdit={true} />
    );
    const inputElement = getAllByLabelText("National forecast uptake")[1];
    fireEvent.change(inputElement, { target: { value: "75" } });
    expect(mockProps.onUptakeChangeHandler).toHaveBeenCalledWith(
      expect.anything()
    );
  });
});
