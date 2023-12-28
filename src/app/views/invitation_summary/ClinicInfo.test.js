import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ClinicInfo from "./ClinicInfo";

describe("ClinicInfo", () => {
  const mockProps = {
    clinicName: "Mock Clinic",
    address1: "123 Main St",
    address2: "Apt 4",
    postcode: "12345",
  };

  test("renders ClinicInfo correctly", () => {
    render(<ClinicInfo {...mockProps} />);

    // Check if the component renders correctly
    expect(screen.getByText("Mock Clinic")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        // Since the text are broken into multiple lines,
        // Below is a custom condition to match text content
        return (
          content === mockProps.clinicName ||
          content === mockProps.address1 ||
          content === mockProps.address2 ||
          content === mockProps.postcode
        );
      })
    ).toBeInTheDocument();
  });

  test("has correct accessibility roles and labels", () => {
    render(<ClinicInfo {...mockProps} />);

    // Check if the address element has the correct ARIA attributes
    const addressElement = screen.getByTestId("addressLine");
    expect(addressElement).toHaveAttribute("aria-labelledby", "clinicNameLabel");
  });

  test("handles missing or undefined props", () => {
    // Render the component with missing or undefined props
    render(<ClinicInfo />);

    // Check if the component renders without crashing
    expect(screen.getByTestId("addressLine")).toBeInTheDocument();
  });
});
