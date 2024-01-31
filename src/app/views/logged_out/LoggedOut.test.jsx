import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InactivityProvider } from '../../context/AutoSignOutProvider.jsx';
import LoggedOut from './LoggedOut';
import Root from '../../page';
import { useSession } from 'next-auth/react';

jest.mock('../privacy_confirmation/PrivacyConfirmationPage', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="privacy-confirmation-page">
      Privacy Confirmation Start Page
    </div>
  ),
}));

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

describe('LoggedOut page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should render logged out page', () => {
    const mockSession = {
      user: { name: 'Test User', email: 'test@example.com' },
      expires: 'mock-expiry',
    };

    useSession.mockReturnValueOnce([null, true]);
    useSession.mockReturnValueOnce([mockSession, false]);
    render(
      <InactivityProvider timeout={10}>
        <Root />
        <LoggedOut />
      </InactivityProvider>,
    );

    const logoutButton = screen.getByLabelText('Continue');
    const logoutHeader = screen.getByTestId('log-out-header');

    expect(logoutButton).toBeDefined();
    expect(logoutHeader).toBeDefined();
  });

  test('it shows continue button after timeout', async () => {
    const mockSession = {
      user: { name: 'Test User', email: 'test@example.com' },
      expires: 'mock-expiry',
    };

    useSession.mockReturnValueOnce([null, true]);
    useSession.mockReturnValueOnce([mockSession, false]);

    render(
      <InactivityProvider timeout={1000}>
        <Root />
        <LoggedOut />
      </InactivityProvider>,
    );

    expect(
      screen.queryByTestId('privacy-confirmation-page'),
    ).toBeInTheDocument();

    const logoutButton = screen.getByLabelText('Continue');
    await waitFor(
      () => {
        expect(logoutButton).toBeInTheDocument();
      },
      { timeout: 10 },
    ); // Adjust the timeout value

    fireEvent.click(logoutButton);

    expect(
      screen.queryByTestId('privacy-confirmation-page'),
    ).toBeInTheDocument();
    expect(logoutButton).toBeDefined();
  });
});
