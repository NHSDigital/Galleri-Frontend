import React from "react";
import { queryByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  filterClinicsByIcb,
  filterClinicsNoAppointments
} from "./helper";
import ClinicSummaryPage from "./ClinicSummaryPage";

describe('Clinic Summary helper tests', () => {

  test('filterClinicsByIcb() return correct clinics list', () => {
    let icb = "Participating ICB 1";

    let clinicList = [{
      "clinicName": "Phlebotomy Clinic 5",
      "icbId": "Participating ICB 1"
    },
    {
      "clinicName": "Phlebotomy Clinic 6",
      "icbId": "Participating ICB 1"
    },
    {
      "clinicName": "Phlebotomy Clinic 7",
      "icbId": "Participating ICB 2"
    },
    {
      "clinicName": "Phlebotomy Clinic 8",
      "icbId": "Participating ICB 3"
    }]

    let expected = [
      {
        "clinicName": "Phlebotomy Clinic 5",
        "icbId": "Participating ICB 1"
      },
      {
        "clinicName": "Phlebotomy Clinic 6",
        "icbId": "Participating ICB 1"
      }
    ]
    // Filter clinics list by provided icb
    expect(filterClinicsByIcb(clinicList, icb)).toStrictEqual(expected);
  });

  test('filterClinicsNoAppointments() return clinics list including no appointments', () => {
    let icb = "Participating ICB 1";

    let clinicList = [{
      "clinicName": "Phlebotomy Clinic 5",
      "numberOfAppointmentsAvailable": 0,
    },
    {
      "clinicName": "Phlebotomy Clinic 6",
      "numberOfAppointmentsAvailable": 5,
    },
    {
      "clinicName": "Phlebotomy Clinic 7",
      "numberOfAppointmentsAvailable": 0,
    },
    {
      "clinicName": "Phlebotomy Clinic 8",
      "numberOfAppointmentsAvailable": 10,
    }]

    let expectedFalse = [{
      "clinicName": "Phlebotomy Clinic 6",
      "numberOfAppointmentsAvailable": 5,
    },
    {
      "clinicName": "Phlebotomy Clinic 8",
      "numberOfAppointmentsAvailable": 10,
    }]
    // When false filter clinics list to have clinic with appointments only
    expect(filterClinicsNoAppointments(clinicList, false)).toStrictEqual(expectedFalse);
    // When true include clinics with no appointments
    expect(filterClinicsNoAppointments(clinicList, true)).toStrictEqual(clinicList);
  });
});

describe('Clinic Summary render', () => {

  const clinicSummary = <ClinicSummaryPage
    icbData={[{}, {}]}
    icbSelected={'icbSelected'}
    clinicList={[{}, {}]}
    lastUpdated={'lastUpdated'}
    displayClinicsNoApp={false}
    onIcbChangeHandler={() => { }}
    onCheckHandler={() => { }} />

  test('Page header renders', () => {
    render(clinicSummary)
    let header = screen.getByText(/Clinic Summary/);
    expect(header.innerHTML).toBe('Clinic Summary');
  })

  test('Page summary renders', () => {
    render(clinicSummary)
    let summary = screen.getByText(/Summarises how many appointments are available over the next 6 weeks, how many invitations have been sent and when these were most recently sent./);
    expect(summary.innerHTML).toBe('Summarises how many appointments are available over the next 6 weeks, how many invitations have been sent and when these were most recently sent.');
  })

  test('Dropdown label renders', () => {
    render(clinicSummary)
    let label = screen.getByText('Select the participating integrated care board (ICB)');
    expect(label.innerHTML).toBe('Select the participating integrated care board (ICB)');
  })

});
