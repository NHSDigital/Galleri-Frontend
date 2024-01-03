import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import ConfirmationBanner from './ConfirmationBanner';

describe('ConfirmationBanner Component', () => {

  test('renders correctly with provided props', () => {
    const { getByText } = render(<ConfirmationBanner />);
    // Check if the warning message is rendered as totalToInvite>noInviteToGenerate
    const message = getByText('Your invitations are confirmed and will be sent at the end of the day.');
    expect(message).toBeInTheDocument();
  });
});
