import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClinicInformation from "./ClinicInformation";

describe('Clinic Information render', () => {

  const clinicInformation = <ClinicInformation />;

  test('Page header renders', () => {
    render(clinicInformation)
    let header = screen.getByText(/Clinic Invitations/);
    expect(header.innerHTML).toBe('Clinic Invitations');
  })

  test('Page summary renders', () => {
    render(clinicInformation)
    let summary = screen.getByText(/View appointment availability, and set criteria to generate new invitations for a clinic./);
    expect(summary.innerHTML).toBe('View appointment availability, and set criteria to generate new invitations for a clinic.');
  })

  test('Clinic weekly capacity table renders', () => {
    render(clinicInformation)
    let tableHeader = screen.getByText('Clinic Weekly Capacity');
    expect(tableHeader.innerHTML).toBe('Clinic Weekly Capacity<div class=\"nhsuk-hint\" id=\"last-updated-hint\">Last Updated: 14 July 2024, 1.00am</div>');
  })

  test('Recent invitation history table renders', () => {
    render(clinicInformation)
    let tableHeader = screen.getByText('Recent Invitation History');
    expect(tableHeader.innerHTML).toBe('Recent Invitation History');
  })

  test('LSOA Table renders', () => {
    render(clinicInformation)
    let tableHeader = screen.getByText('Select a distance from the clinic to find eligible people per lower layer super output area (LSOA)');
    expect(tableHeader.innerHTML).toBe('Select a distance from the clinic to find eligible people per lower layer super output area (LSOA)');
  })

  test('Change/cancel button renders', () => {
    const { container } = render(<ClinicInformation />);
    let buttonText = screen.getByText('Change clinic');
    expect(buttonText.innerHTML).toBe('Change clinic');
    const button = container.querySelector(`a[id="changeCancelButtonId"]`);
    fireEvent.click(button);
    buttonText = screen.getByText('Cancel change');
    expect(buttonText.innerHTML).toBe('Cancel change');
  })

  test('Clinic selector renders', () => {
    const { container } = render(<ClinicInformation />);
    const button = container.querySelector(`a[id="changeCancelButtonId"]`);
    fireEvent.click(button);
    const selector = container.querySelector(`select[id="clinic-selector"]`);
    expect(selector).toBeTruthy();
  })

  test('Clinic invitation criteria header renders', () => {
    render(clinicInformation)
    let header = screen.getByText(/Clinic Invitation Criteria/);
    expect(header.innerHTML).toBe('Clinic Invitation Criteria');
  })

  test('Target percentage header renders', () => {
    render(clinicInformation)
    let header = screen.getByText(/Set the target percentage of appointments to fill/);
    expect(header.innerHTML).toBe('Set the target percentage of appointments to fill');
  })

  test('Target percentage input renders', () => {
    render(clinicInformation)
    let input = screen.getByTestId("input-target-percentage");
    expect(input).toBeInTheDocument();
  })

  test('Summary list renders', () => {
    render(clinicInformation)
    let header = screen.getByText(/Target number of appointments to fill/);
    expect(header.innerHTML).toBe('Target number of appointments to fill');
  })

  test('Target percentage update button renders', () => {
    render(clinicInformation)
    let button = screen.getByText('Update');
    expect(button).toBeInTheDocument();
  })

  test('Calculate number to invite button renders', () => {
    render(clinicInformation)
    let button = screen.getByText(/Calculate number to invite/);
    expect(button.innerHTML).toBe('Calculate number to invite');
    expect(button).toBeInTheDocument();
  })
});
