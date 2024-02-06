import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBannerDetail from "./ErrorBannerDetail";

describe("ErrorBannerDetail Component", () => {
  const mockProps = {
    targetErrorMessage: "Test Error Message",
    onKeyUp: jest.fn(),
    hrefErrorMessage: "https://example.com/error",
  };

  test("renders correctly with provided props", () => {
    const { getByTestId, getByText } = render(
      <ErrorBannerDetail {...mockProps} />
    );

    // Check if the component renders
    const errorBanner = getByTestId("error-banner");
    expect(errorBanner).toBeInTheDocument();

    // Check if the error message and link are rendered
    const errorTitle = getByText("There is a problem");
    expect(errorTitle).toBeInTheDocument();

    const errorMessageLink = getByText("Test Error Message");
    expect(errorMessageLink).toBeInTheDocument();
    expect(errorMessageLink.href).toBe("https://example.com/error");
  });

  test("calls onKeyUp when a key is pressed", () => {
    const { getByTestId } = render(<ErrorBannerDetail {...mockProps} />);
    const errorBanner = getByTestId("error-banner");

    // Trigger a keydown event
    fireEvent.keyDown(errorBanner, { key: "Enter", keyCode: 13 });

    // Check if onKeyUp is called
    expect(mockProps.onKeyUp).toHaveBeenCalled();
  });
});
