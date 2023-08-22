import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  filterClinicsByIcb,
  filterClinicsNoAppointments
} from "./helper";

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
      "numberOfAppointmentsAvailable" : 0,
    },
    {
      "clinicName": "Phlebotomy Clinic 6",
      "numberOfAppointmentsAvailable" : 5,
    },
    {
      "clinicName": "Phlebotomy Clinic 7",
      "numberOfAppointmentsAvailable" : 0,
    },
    {
      "clinicName": "Phlebotomy Clinic 8",
      "numberOfAppointmentsAvailable" : 10,
    }]

    let expectedFalse = [{
        "clinicName": "Phlebotomy Clinic 6",
        "numberOfAppointmentsAvailable" : 5,
      },
      {
        "clinicName": "Phlebotomy Clinic 8",
        "numberOfAppointmentsAvailable" : 10,
    }]
    // When false filter clinics list to have clinic with appointments only
    expect(filterClinicsNoAppointments(clinicList, false)).toStrictEqual(expectedFalse);
    // When true include clinics with no appointments
    expect(filterClinicsNoAppointments(clinicList, true)).toStrictEqual(clinicList);
  });
});
