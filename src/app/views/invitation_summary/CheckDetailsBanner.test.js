import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import CheckDetailsBanner from './checkDetailsBanner';

describe('CheckDetailsBanner Component', () => {
  const mockProps = {
    onClickGoBackPrevPageLinkHandler: jest.fn(),
    noInviteToGenerate: 150,
    totalToInvite: 200,
  };

  test('renders correctly with provided props', () => {
    const { getByText } = render(<CheckDetailsBanner {...mockProps} />);
    // Check if the warning message is rendered as totalToInvite>noInviteToGenerate
    const check = getByText('Check these details before you generate invitations');
    expect(check).toBeInTheDocument();
  });

  const mockProps1 = {
    onClickGoBackPrevPageLinkHandler: jest.fn(),
    noInviteToGenerate: 150,
    totalToInvite: 100,
  };

  test('Warning scenario', () => {
    const { getByText } = render(<CheckDetailsBanner {...mockProps1} />);
    // Check if the warning message is rendered as totalToInvite<noInviteToGenerate
    const warning = getByText('select more people to invite');
    expect(warning).toBeInTheDocument();
    });
});
