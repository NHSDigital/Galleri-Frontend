import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LsoaTable from './LsoaTable';

// Mock data
const mockLsoaInRange = [
  {
    LSOA_NAME: { S: 'LSOA 1' },
    DISTANCE_TO_SITE: { N: '5' },
    MODERATOR: { S: '1.5' },
    IMD_DECILE: { N: '3' },
    ELIGIBLE_POPULATION: { S: '100' },
    INVITED_POPULATION: { S: '20' },
    checked: false,
  },
];

// Mock props
const mockProps = {
  lsoaInRange: mockLsoaInRange,
  checkAllHandler: jest.fn(),
  checkRecord: jest.fn(),
  handleRangeSelection: jest.fn(),
  pageSize: 10,
  currentPage: 1,
  onSubmitHandler: jest.fn(),
  onPageSizeChange: jest.fn(),
  onCurrentPageChange: jest.fn(),
  lsoaCodesAppsToFill: jest.fn(),
  lsoaTableError: false,
  nationalUptakePercentage: 50,
};

describe('LsoaTable Component', () => {
  test('renders component correctly', () => {
    const { getAllByText } = render(<LsoaTable {...mockProps} />);

    // Check if important elements are present
    expect(screen.getByLabelText('Select All LSOA below')).toBeInTheDocument();

    const LSOA = (getAllByText('LSOA name'));
    expect(LSOA[0]).toBeInTheDocument();

    const distance = (getAllByText('Distance'));
    expect(distance[0]).toBeInTheDocument();

    const forecast = (getAllByText('Forecast uptake'));
    expect(forecast[0]).toBeInTheDocument();

    const IMD = (getAllByText('IMD decile'));
    expect(IMD[0]).toBeInTheDocument();

    const eligible = (getAllByText('Eligible'));
    expect(eligible[0]).toBeInTheDocument();

    const invited = (getAllByText('Invited'));
    expect(invited[0]).toBeInTheDocument();

    const availableInvite = (getAllByText('Available to invite'));
    expect(availableInvite[0]).toBeInTheDocument();
  });

  test('renders LSOA data correctly', () => {
    render(<LsoaTable {...mockProps} />);
    // Check if the table rows are rendered based on the mock data
    expect(screen.getByText('LSOA 1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument(); // Available to invite
  });

  test('handles check all functionality', () => {
    render(<LsoaTable {...mockProps} />);
    // Check all checkbox
    const selectAllCheckbox = screen.getByLabelText('Select All LSOA below');
    fireEvent.click(selectAllCheckbox);
    expect(mockProps.checkAllHandler).toHaveBeenCalled();
  });

  test('handles individual record checkbox', () => {
    render(<LsoaTable {...mockProps} />);
    // Check an individual checkbox
    const individualCheckbox = screen.getByTestId('select-LSOA-1');
    fireEvent.click(individualCheckbox);
    expect(mockProps.checkRecord).toHaveBeenCalled();
  });

  test('handles range selection', () => {
    render(<LsoaTable {...mockProps} />);
    // Change the range selection
    const milesSelector = screen.getByLabelText('Select a distance from the clinic to find eligible people per lower layer super output area (LSOA)');
    fireEvent.change(milesSelector, { target: { value: '10' } });
    expect(mockProps.handleRangeSelection).toHaveBeenCalled();
  });

  // an asynchronous test
  test('handles submit button click', async () => {
    render(<LsoaTable {...mockProps} />);
    // Click the submit button
    const submitButton = screen.getByText('Calculate number to invite');
    fireEvent.click(submitButton);
    await act(() => Promise.resolve()); // Wait for async operations to complete
    expect(mockProps.onSubmitHandler).toHaveBeenCalled();
    expect(mockProps.lsoaCodesAppsToFill).toHaveBeenCalled();
  });
});
