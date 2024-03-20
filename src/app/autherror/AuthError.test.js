import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthError from "./page";

describe("ActivityCodeMissingError component", () => {
  test("renders header and error message when showLogoutPage is false", () => {
    // Act
    const { getByText } = render(<AuthError />);

    // Assert
    expect(getByText("Access Denied")).toBeInTheDocument();
    expect(
      getByText(
        `If you think you should have access, contact your Registration Authority (RA) for help.`
      )
    ).toBeInTheDocument();
  });
});
