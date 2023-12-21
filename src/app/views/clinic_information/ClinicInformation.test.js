import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClinicInformation from "./ClinicInformation";
import axios from "axios";

window.scrollTo = jest.fn();

// jest.mock("axios");

// jest.mock("../../context/AppStateContext", () => {
//   const mockContextValue = {
//     state: {
//       icbData: [" "],
//       icbSelected: "",
//       clinicIdSelected: "",
//       clinicNameSelected: "",
//       lastUpdated: "14 July 2024, 1.00am",
//       clinicList: [],
//       displayClinicsNoApp: false,
//       navigateToClinic: false,
//       clinicIdNameList: [{ clinicId: "", clinicName: "" }],
//       clinicId: "",
//       clinicName: "",
//       address1: "",
//       address2: "",
//       postcode: "",
//       weeklyCapacity: [],
//       cancelChangeText: "Change clinic",
//       currentlySelectedClinicId: "",
//       currentlySelectedClinic: "",
//       participatingICBSelected: "",
//       displayClinicSelector: false,
//       displayViewAllPrevInvitations: false,
//       recentInvitationHistory: {
//         dateOfPrevInv: "Not available",
//         daysSincePrevInv: "Not available",
//         invSent: 0,
//         appsRemaining: 0,
//         isSubmit: false,
//       },
//       rangeSelection: 1,
//       targetAppToFill: 0,
//       targetPercentageToFill: 0,
//       totalToInvite: 0,
//       avgExpectedUptake: 0,
//       noInviteToGenerate: 0,
//       personIdentifiedToInvite: [],
//       pageSize: 0,
//       currentPage: 0,
//     },
//     setState: jest.fn(),
//   };
//   return {
//     __esModule: true,
//     AppStateContext: React.createContext(mockContextValue),
//   };
// });

describe("Logger", () => {
  test.todo("please fix the broken tests below");
});

// describe('Clinic Information render', () => {

//   const clinicInformation = <ClinicInformation />;

// test('renders the <ClinicInformation>', async () => {
//   await act(async () => {
//     render(clinicInformation);
//   });
//   let page = screen.getByTestId("clinic-information-page");
//   expect(page).toBeInTheDocument();
// });

// test('Page header renders', () => {
//   axios.get.mockResolvedValue({ data: {/* your mock data here */ } });
//   render(clinicInformation)
//   let header = screen.getByText(/Clinic Invitations/);
//   expect(header.innerHTML).toBe('Clinic Invitations');
// })

//   test('Page summary renders', () => {
//     render(clinicInformation)
//     let summary = screen.getByText(/View appointment availability, and set criteria to generate new invitations for a clinic./);
//     expect(summary.innerHTML).toBe('View appointment availability, and set criteria to generate new invitations for a clinic.');
//   })

//   test('Clinic weekly capacity table renders', () => {
//     render(clinicInformation)
//     let tableHeader = screen.getByText('Clinic Weekly Capacity');
//     expect(tableHeader.innerHTML).toBe('Clinic Weekly Capacity<div class=\"nhsuk-hint\" id=\"last-updated-hint\">Last Updated: 14 July 2024, 1.00am</div>');
//   })

//   test('Recent invitation history table renders', () => {
//     render(clinicInformation)
//     let tableHeader = screen.getByText('Recent Invitation History');
//     expect(tableHeader.innerHTML).toBe('Recent Invitation History');
//   })

//   test('LSOA Table renders', () => {
//     render(clinicInformation)
//     let tableHeader = screen.getByText('Select a distance from the clinic to find eligible people per lower layer super output area (LSOA)');
//     expect(tableHeader.innerHTML).toBe('Select a distance from the clinic to find eligible people per lower layer super output area (LSOA)');
//   })

//   test('Change/cancel button renders', () => {
//     const { container } = render(<ClinicInformation />);
//     let buttonText = screen.getByText('Change clinic');
//     expect(buttonText.innerHTML).toBe('Change clinic');
//     const button = container.querySelector(`a[id="changeCancelButtonId"]`);
//     fireEvent.click(button);
//     buttonText = screen.getByText('Cancel change');
//     expect(buttonText.innerHTML).toBe('Cancel change');
//   })

//   test('Clinic selector renders', () => {
//     const { container } = render(<ClinicInformation />);
//     const button = container.querySelector(`a[id="changeCancelButtonId"]`);
//     fireEvent.click(button);
//     const selector = container.querySelector(`select[id="clinic-selector"]`);
//     expect(selector).toBeTruthy();
//   })

//   test('Clinic invitation criteria header renders', () => {
//     render(clinicInformation)
//     let header = screen.getByText(/Clinic Invitation Criteria/);
//     expect(header.innerHTML).toBe('Clinic Invitation Criteria');
//   })

//   test('Target percentage header renders', () => {
//     render(clinicInformation)
//     let header = screen.getByText(/Set the target percentage of appointments to fill/);
//     expect(header.innerHTML).toBe('Set the target percentage of appointments to fill');
//   })

//   test('Target percentage input renders', () => {
//     render(clinicInformation)
//     let input = screen.getByTestId("input-target-percentage");
//     expect(input).toBeInTheDocument();
//   })

//   test('Summary list renders', () => {
//     render(clinicInformation)
//     let header = screen.getByText(/Target number of appointments to fill/);
//     expect(header.innerHTML).toBe('Target number of appointments to fill');
//   })

//   test('Target percentage update button renders', () => {
//     render(clinicInformation)
//     let button = screen.getByText('Update');
//     expect(button).toBeInTheDocument();
//   })

//   test('Calculate number to invite button renders', () => {
//     render(clinicInformation)
//     let button = screen.getByText(/Calculate number to invite/);
//     expect(button.innerHTML).toBe('Calculate number to invite');
//     expect(button).toBeInTheDocument();
//   })
// });
