import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  filterClinicsByIcb,
  filterClinicsNoAppointments,
  sortDataOfPreviousInvitation
} from "./helper";


describe('Clinic Summary helper tests', () => {

  const icb = "Participating ICB 1";

  const clinicList = [{
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

  const expected = [
    {
      "clinicName": "Phlebotomy Clinic 5",
      "icbId": "Participating ICB 1"
    },
    {
      "clinicName": "Phlebotomy Clinic 6",
      "icbId": "Participating ICB 1"
    }
  ]

  test('filterClinicsByIcb() return correct clinics list', () => {
    expect(filterClinicsByIcb(clinicList, icb)).toStrictEqual(expected);
  });

});
