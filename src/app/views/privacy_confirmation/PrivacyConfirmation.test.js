import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PrivacyConfirmation from './PrivacyConfirmation';
import { useInactivity } from '../../context/AutoSignOutProvider.jsx';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

jest.mock('../../context/AutoSignOutProvider');

const mockInactivityValues = {
  showLogoutPage: false,
  closeLogoutPage: jest.fn(),
};

const mockSession = {
  user: { name: 'Test User', email: 'test@example.com' },
  expires: 'mock-expiry',
};

useSession.mockReturnValue([mockSession, false]);
useInactivity.mockReturnValue(mockInactivityValues);

global.renderWithInactivityProvider = (ui, options) => {
  return render(
    <InactivityProvider timeout={1000}>{ui}</InactivityProvider>,
    options
  );
};

describe('ClinicInfo', () => {
  const mockProps = {};

  jest.mock('next-auth/react', () => ({
    ...jest.requireActual('next-auth/react'),
    useSession: jest.fn(),
  }));

  test('renders PrivacyConfirmation correctly', () => {
    render(<PrivacyConfirmation {...mockProps} />);
    expect(screen.getByText('Protecting patient data')).toBeInTheDocument();
    expect(
      screen.getByText(
        'You must only access a participant’s records if there is a legitimate requirement to access their data.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'All activity in the Galleri pilot system is routinely checked to ensure records are not accessed inappropriately.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('When you are finished using the system you must:')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Log out using the button in the top right hand corner.')
    ).toBeInTheDocument();
    expect(screen.getByText('Remove your smart card.')).toBeInTheDocument();
    expect(
      screen.getByText('I have read and understood this message')
    ).toBeInTheDocument();
  });

  test('renders PrivacyConfirmation errors correctly', () => {
    render(<PrivacyConfirmation {...mockProps} />);
    const checkbox = screen.getByTestId('confirm-privacy');
    expect(checkbox.checked).toEqual(false);
    // Simulate a click on the "Continue" button while checkbox unchecked
    fireEvent.click(screen.getByText('Continue'));
    expect(screen.getByText('There is a problem')).toBeInTheDocument();
  });

  test('renders PrivacyConfirmation checkbox to function correctly', () => {
    render(<PrivacyConfirmation {...mockProps} />);
    const checkbox = screen.getByTestId('confirm-privacy');
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
