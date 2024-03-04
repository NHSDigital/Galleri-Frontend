import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountNotFoundError from "./page";

describe("AccountNotFoundError component", () => {
  test("renders header and error message when showLogoutPage is false", () => {
    // Act
    const { getByText } = render(<AccountNotFoundError />);

    // Assert
    expect(getByText("We found no record of this account")).toBeInTheDocument();
    expect(
      getByText(
        "If you think you should have access, contact your line manager."
      )
    ).toBeInTheDocument();
  });
});
