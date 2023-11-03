import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvitationSummary from "./InvitationSummary";

describe('Clinic Information render', () => {

  const invitationSummary = <InvitationSummary />

  test('Page header renders', () => {
    render(invitationSummary)
    let header = screen.getByText(/Clinic Invitations/);
    expect(header.innerHTML).toBe('Clinic Invitations');
  })

  // test('Page summary renders', () => {
  //   render(clinicInformation)
  //   let summary = screen.getByText(/View appointment availability, and set criteria to generate new invitations for a clinic./);
  //   expect(summary.innerHTML).toBe('View appointment availability, and set criteria to generate new invitations for a clinic.');
  // })

  // test('Clinic weekly capacity table renders', () => {
  //   render(clinicInformation)
  //   let tableHeader = screen.getByText('Clinic Weekly Capacity');
  //   expect(tableHeader.innerHTML).toBe('Clinic Weekly Capacity<div class=\"nhsuk-hint\" id=\"last-updated-hint\">Last Updated: 14 July 2024, 1.00am</div>');
  // })

  // test('Recent invitation history table renders', () => {
  //   render(clinicInformation)
  //   let tableHeader = screen.getByText('Recent Invitation History');
  //   expect(tableHeader.innerHTML).toBe('Recent Invitation History');
  // })

  // test('Change/cancel button renders', () => {
  //   const { container } = render(<ClinicInformation />);
  //   let buttonText = screen.getByText('Change clinic');
  //   expect(buttonText.innerHTML).toBe('Change clinic');
  //   const button = container.querySelector(`a[id="changeCancelButtonId"]`);
  //   fireEvent.click(button);
  //   buttonText = screen.getByText('Cancel change');
  //   expect(buttonText.innerHTML).toBe('Cancel change');
  // })

  // test('Clinic selector renders', () => {
  //   const { container } = render(<ClinicInformation />);
  //   const button = container.querySelector(`a[id="changeCancelButtonId"]`);
  //   fireEvent.click(button);
  //   const selector = container.querySelector(`select[id="clinic-selector"]`);
  //   expect(selector).toBeTruthy();
  // })

});
