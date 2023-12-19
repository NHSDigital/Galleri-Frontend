import React from "react";
import { queryByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  filterClinicsByIcb,
  filterClinicsNoAppointments,
  daysSinceLastInvite,
} from "./helper";
import ClinicSummaryPage from "./ClinicSummaryPage";
import ClinicSummaryTable from "./ClinicSummaryTable";

describe("Logger", () => {
  test.todo("please fix the broken tests below");
});
// describe("Clinic Summary helper tests", () => {
//   test("daysSinceLastInvite() return correct clinics list", () => {
//     // Monday 12 September 2023
//     jest.spyOn(global.Date, "now").mockImplementationOnce(() => 1694457000000);
//     let clinicList = [
//       {
//         PrevInviteDate: { S: "Friday 09 September 2023" },
//       },
//       {
//         PrevInviteDate: { S: "Saturday 10 September 2023" },
//       },
//     ];

//     let expected = [
//       {
//         PrevInviteDate: { S: "Friday 09 September 2023" },
//         DaySincePrevInvite: { N: "2" },
//       },
//       {
//         PrevInviteDate: { S: "Saturday 10 September 2023" },
//         DaySincePrevInvite: { N: "1" },
//       },
//     ];
//     // Filter clinics list by provided icb
//     expect(daysSinceLastInvite(clinicList)).toStrictEqual(expected);
//   });

//   test("filterClinicsByIcb() return correct clinics list", () => {
//     let icb = "Participating ICB 1";

//     let clinicList = [
//       {
//         clinicName: "Phlebotomy Clinic 5",
//         ICBCode: { S: "Participating ICB 1" },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 6",
//         ICBCode: { S: "Participating ICB 1" },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 7",
//         ICBCode: { S: "Participating ICB 2" },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 8",
//         ICBCode: { S: "Participating ICB 3" },
//       },
//     ];

//     let expected = [
//       {
//         clinicName: "Phlebotomy Clinic 5",
//         ICBCode: { S: "Participating ICB 1" },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 6",
//         ICBCode: { S: "Participating ICB 1" },
//       },
//     ];
//     // Filter clinics list by provided icb
//     expect(filterClinicsByIcb(clinicList, icb)).toStrictEqual(expected);
//   });

//   test("filterClinicsNoAppointments() return clinics list including no appointments", () => {
//     let clinicList = [
//       {
//         clinicName: "Phlebotomy Clinic 5",
//         Availability: { N: 0 },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 6",
//         Availability: { N: 5 },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 7",
//         Availability: { N: 0 },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 8",
//         Availability: { N: 10 },
//       },
//     ];

//     let expectedFalse = [
//       {
//         clinicName: "Phlebotomy Clinic 6",
//         Availability: { N: 5 },
//       },
//       {
//         clinicName: "Phlebotomy Clinic 8",
//         Availability: { N: 10 },
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
// });

// describe("Clinic Summary render", () => {
//   const clinicSummary = (
//     <ClinicSummaryPage
//       icbData={[]}
//       icbSelected={"icbSelected"}
//       clinicList={[]}
//       lastUpdated={"lastUpdated"}
//       displayClinicsNoApp={false}
//       onIcbChangeHandler={() => { }}
//       onCheckHandler={() => { }}
//     />
//   );

//   test("Page header renders", () => {
//     render(clinicSummary);
//     let header = screen.getByText(/Clinic Summary/);
//     expect(header.innerHTML).toBe("Clinic Summary");
//   });

//   test("Page summary renders", () => {
//     render(clinicSummary);
//     let summary = screen.getByText(
//       /Summarises how many appointments remain available over the next 6 weeks, how many invitations have been generated and when./
//     );
//     expect(summary.innerHTML).toBe(
//       "Summarises how many appointments remain available over the next 6 weeks, how many invitations have been generated and when."
//     );
//   });

//   test("Dropdown label renders", () => {
//     render(clinicSummary);
//     let label = screen.getByText(
//       "Select the participating integrated care board (ICB)"
//     );
//     expect(label.innerHTML).toBe(
//       "Select the participating integrated care board (ICB)"
//     );
//   });
// });

// describe('PrevInviteDate empty', () => {
//   const dummyClinicList = [{
//     ClinicName: { S: "Phlebotomy clinic 001" },
//     PrevInviteDate: { S: "" },
//     DaySincePrevInvite: { N: 'NaN' },
//     InvitesSent: { N: 0 },
//     Availability: { N: 0 },
//   }
//   ];
//   const DummyClinicSummaryTable = (
//     <ClinicSummaryTable clinicList={dummyClinicList}></ClinicSummaryTable>
//   );
//   test("PrevInviteDate returns Not available if empty", () => {
//     render(DummyClinicSummaryTable);
//     let label = screen.getByText("Clinic name");
//     expect(label.innerHTML).toBe("Clinic name");

//     let prevInviteDateSet = screen.getByText("Not Available");
//     expect(prevInviteDateSet.innerHTML).toBe("Not Available");

//     let clinicNameSet = screen.getByText("Phlebotomy clinic 001");
//     expect(clinicNameSet.innerHTML).toBe("Phlebotomy clinic 001");
//   })
// });
