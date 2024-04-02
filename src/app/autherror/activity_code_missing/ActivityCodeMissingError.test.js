import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActivityCodeMissingError from "./page";

describe("ActivityCodeMissingError component", () => {
  test("renders header and error message when showLogoutPage is false", () => {
    // Act
    const { getByText } = render(<ActivityCodeMissingError />);

    // Assert
    expect(
      getByText("You do not have the required access for this system")
    ).toBeInTheDocument();
    expect(
      getByText(
        `If you think you should have access, contact your Registration Authority (RA) for help.`
      )
    ).toBeInTheDocument();
  });
});
