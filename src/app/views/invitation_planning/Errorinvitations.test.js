import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Errorinvitations from './ErrorInvitations';

// Mock props
const mockProps = {
  onKeyUp: jest.fn(),
  isCorrectTotal: true,
  isCorrectUptakeTotal: true,
};

// Helper function to render the component with given props
const renderComponent = (props) => {
  return render(<Errorinvitations {...props} />);
};

describe('Errorinvitations Component', () => {
  beforeEach(() => {
    // Reset mock function calls before each test
    jest.clearAllMocks();
  });

  it('renders without errors when isCorrectTotal and isCorrectUptakeTotal are true', () => {
    renderComponent(mockProps);

    // Error summary should not be rendered
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('renders the error summary when isCorrectTotal is false', () => {
    const propsWithError = { ...mockProps, isCorrectTotal: false };
    renderComponent(propsWithError);

    // Error summary should be rendered
    const errorSummary = screen.getByRole('alert');
    expect(errorSummary).toBeInTheDocument();

    // Check if the correct error message is present
    expect(screen.getByText(/The fill targets must add up to 100%/i)).toBeInTheDocument();
  });

  it('renders the error summary when isCorrectUptakeTotal is false', () => {
    const propsWithError = { ...mockProps, isCorrectUptakeTotal: false };
    renderComponent(propsWithError);

    // Error summary should be rendered
    const errorSummary = screen.getByRole('alert');
    expect(errorSummary).toBeInTheDocument();

    // Check if the correct error message is present
    expect(screen.getByText(/The uptake percentage must be between 1% and 100%/i)).toBeInTheDocument();
  });

  it('calls onKeyUp when a key is pressed on the error summary', () => {
    const propsWithFunction = { ...mockProps, isCorrectTotal: false };
    renderComponent(propsWithFunction);

    // Error summary should be rendered
    const errorSummary = screen.getByRole('alert');
    expect(errorSummary).toBeInTheDocument();

    // Trigger a keydown event
    fireEvent.keyDown(errorSummary);

    // Check if onKeyUp is called
    expect(propsWithFunction.onKeyUp).toHaveBeenCalled();
  });
});
