import React from "react";
import { queryByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
/ import ClinicSummaryPage from "./ClinicSummaryPage";
import InvitationPlanningPage from "./InvitationPlanningPage";

describe("Clinic Summary helper tests", () => {
  test("filterClinicsByIcb() return correct clinics list", () => {
    let icb = "Participating ICB 1";

    let clinicList = [
      {
        clinicName: "Phlebotomy Clinic 5",
        icbId: "Participating ICB 1",
      },
      {
        clinicName: "Phlebotomy Clinic 6",
        icbId: "Participating ICB 1",
      },
      {
        clinicName: "Phlebotomy Clinic 7",
        icbId: "Participating ICB 2",
      },
      {
        clinicName: "Phlebotomy Clinic 8",
        icbId: "Participating ICB 3",
      },
    ];

    let expected = [
      {
        clinicName: "Phlebotomy Clinic 5",
        icbId: "Participating ICB 1",
      },
      {
        clinicName: "Phlebotomy Clinic 6",
        icbId: "Participating ICB 1",
      },
    ];
    // Filter clinics list by provided icb
    expect(filterClinicsByIcb(clinicList, icb)).toStrictEqual(expected);
  });

//   test("filterClinicsNoAppointments() return clinics list including no appointments", () => {
//     let icb = "Participating ICB 1";

//     let clinicList = [
//       {
//         clinicName: "Phlebotomy Clinic 5",
//         numberOfAppointmentsAvailable: 0,
//       },
//       {
//         clinicName: "Phlebotomy Clinic 6",
//         numberOfAppointmentsAvailable: 5,
//       },
//       {
//         clinicName: "Phlebotomy Clinic 7",
//         numberOfAppointmentsAvailable: 0,
//       },
//       {
//         clinicName: "Phlebotomy Clinic 8",
//         numberOfAppointmentsAvailable: 10,
//       },
//     ];

//     let expectedFalse = [
//       {
//         clinicName: "Phlebotomy Clinic 6",
//         numberOfAppointmentsAvailable: 5,
//       },
//       {
//         clinicName: "Phlebotomy Clinic 8",
//         numberOfAppointmentsAvailable: 10,
//       },
//     ];
//     // When false filter clinics list to have clinic with appointments only
//     expect(filterClinicsNoAppointments(clinicList, false)).toStrictEqual(
//       expectedFalse
//     );
//     // When true include clinics with no appointments
//     expect(filterClinicsNoAppointments(clinicList, true)).toStrictEqual(
//       clinicList
//     );
//   });
});

describe("Invitation planning render", () => {
  const invitationPlanning = (
    <InvitationPlanningPage
      quintileValues={{}}
      quintileValuesAux={{}}
      enableFillEdit={false}
      lastUpdatedQuintile={"lastUpdated"}
      userName={"lastUpdated"}
      isCorrectTotal={true}
      nationalUptakePercentage={100}
      enableUptakeEdit={false}
      isCorrectUptakeTotal={true}
      onQuintileChangeHandler={() => {}}
      onAmendFillHandler={() => {}}
      onCancelSaveFillHandler={() => {}}
      onAmendForecastHandler={() => {}}
      onUptakeChangeHandler={() => {}}
      onCancelSaveForecastHandler={() => {}}
      onSaveForecastHandler={() => {}}
      onSaveFillHandler={() => {}}
    />
  );

  test("Page header renders", () => {
    render(invitationPlanning);
    let header = screen.getByText(/Invitation variables/);
    expect(header.innerHTML).toBe("Invitation variables");
  });

  test("Page summary renders", () => {
    render(invitationPlanning);
    let summary = screen.getByText(
      /The forecasted national uptake and quintile fill targets can be amended if necessary./
    );
    expect(summary.innerHTML).toBe(
      "The forecasted national uptake and quintile fill targets can be amended if necessary."
    );
  });

  test("National forecast uptake renders", () => {
    render(invitationPlanning);
    let label = screen.getByText("National forecast uptake");
    expect(label.innerHTML).toBe("National forecast uptake<br>");
  });

  test("Quintile fill target renders", () => {
    render(invitationPlanning);
    let label = screen.getByText("Quintile fill target");
    expect(label.innerHTML).toBe("Quintile fill target<br>");
  });
});
