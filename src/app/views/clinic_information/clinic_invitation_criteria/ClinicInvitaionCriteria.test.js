import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClinicInvitationCriteria from "./ClinicInvitationCriteria";

describe("ClinicInvitationCriteria", () => {
  const mockProps = {
    displayUserErrorTargetPercentage: true,
    targetFillToInputValue: 50,
    appsToFill: 20,
    onClickTargetAppsToFillHandler: jest.fn(),
    onTargetFillToInputChangeHandler: jest.fn(),
  };

  test("renders component with initial state", () => {
    const props = {
      displayUserErrorTargetPercentage: false,
      targetFillToInputValue: 50,
      appsToFill: 10,
      onClickTargetAppsToFillHandler: jest.fn(),
      onTargetFillToInputChangeHandler: jest.fn(),
    };

    render(<ClinicInvitationCriteria {...props} />);

    // Assert that the component renders correctly
    expect(screen.getByText("Clinic Invitation Criteria")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Set the target percentage of appointments to fill")
    ).toBeInTheDocument();

    // Assert that the button is rendered
    expect(screen.getByText("Update")).toBeInTheDocument();

    expect(
      screen.getByText("Target number of appointments to fill")
    ).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
  test('clicking "Update" button calls onClickTargetAppsToFillHandler', () => {
    render(<ClinicInvitationCriteria {...mockProps} />);

    // Simulate a click on the "Update" button
    fireEvent.click(screen.getByText("Update"));

    // Check if the mock function was called
    expect(mockProps.onClickTargetAppsToFillHandler).toHaveBeenCalledWith(50);
  });
});
