import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClinicInformation from "./ClinicInformation";

// describe('Clinic Information tests', () => {

//   test('filterClinicsByIcb() return correct clinics list', () => {
//     let icb = "Participating ICB 1";

//     let clinicList = [{
//       "clinicName": "Phlebotomy Clinic 5",
//       "icbId": "Participating ICB 1"
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 6",
//       "icbId": "Participating ICB 1"
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 7",
//       "icbId": "Participating ICB 2"
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 8",
//       "icbId": "Participating ICB 3"
//     }]

//     let expected = [
//       {
//         "clinicName": "Phlebotomy Clinic 5",
//         "icbId": "Participating ICB 1"
//       },
//       {
//         "clinicName": "Phlebotomy Clinic 6",
//         "icbId": "Participating ICB 1"
//       }
//     ]
//     // Filter clinics list by provided icb
//     expect(filterClinicsByIcb(clinicList, icb)).toStrictEqual(expected);
//   });

//   test('filterClinicsNoAppointments() return clinics list including no appointments', () => {
//     let icb = "Participating ICB 1";

//     let clinicList = [{
//       "clinicName": "Phlebotomy Clinic 5",
//       "numberOfAppointmentsAvailable": 0,
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 6",
//       "numberOfAppointmentsAvailable": 5,
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 7",
//       "numberOfAppointmentsAvailable": 0,
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 8",
//       "numberOfAppointmentsAvailable": 10,
//     }]

//     let expectedFalse = [{
//       "clinicName": "Phlebotomy Clinic 6",
//       "numberOfAppointmentsAvailable": 5,
//     },
//     {
//       "clinicName": "Phlebotomy Clinic 8",
//       "numberOfAppointmentsAvailable": 10,
//     }]
//     // When false filter clinics list to have clinic with appointments only
//     expect(filterClinicsNoAppointments(clinicList, false)).toStrictEqual(expectedFalse);
//     // When true include clinics with no appointments
//     expect(filterClinicsNoAppointments(clinicList, true)).toStrictEqual(clinicList);
//   });
// });

describe('Clinic Information render', () => {

  const clinicInformation= <ClinicInformation />

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

  test('Change/cancel button renders', () => {
    render(clinicInformation)
    let button = screen.getByText('Change clinic');
    expect(button.innerHTML).toBe('Change clinic');
  })

});
