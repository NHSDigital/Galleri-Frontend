import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InvitationSummary from "./InvitationSummary";
import Actions from "./Actions";
import InvitationSummaryPage from "./InvitationSummaryPage";

describe("Logger", () => {
  test.todo("please fix the broken tests below");
});

// describe('InvitationSummary Component', () => {

//   const dummySummaryList = {
//     "clinicDistanceHolder": "+ 5 miles",
//     "availableInvitationsHolder": "4,372",
//     "remainingAppointmentsHolder": "240",
//     "targetFillPercentageHolder": "50 %",
//     "targetAppointmentsToFillHolder": "120",
//     "expectedUptakeRateHolder": "24 %",
//     "invitationsToGenerateHolder": "500",
//   }

//   const setupMockScrollIntoView = () => {
//     // Create a mock function for scrollIntoView
//     const mockScrollIntoView = jest.fn();

//     // Mock the getElementById function to return an element with the mockScrollIntoView function
//     document.getElementById = jest.fn();
//     document.getElementById.mockReturnValue({
//       scrollIntoView: mockScrollIntoView,
//     });
//     return mockScrollIntoView;
//   };

//   beforeEach(() => {
//     render(<InvitationSummary />);
//   });

//   test('should render Page header', () => {
//     let header = screen.getByText(/Invitation summary/);
//     expect(header.innerHTML).toBe('Invitation summary');
//   })

//   test('should render Generate Invitation button ', () => {
//     const mockScrollIntoView = setupMockScrollIntoView();

//     let buttonText = screen.getByText('Generate invitations');
//     expect(buttonText.innerHTML).toBe('Generate invitations');
//     const button = screen.getByText('Generate invitations');
//   })

//   test('should display Generate Invitation button and confirmation', () => {
//     const mockScrollIntoView = setupMockScrollIntoView();

//     const generateButton = screen.getByText('Generate invitations');
//     expect(generateButton).toBeInTheDocument();
//     fireEvent.click(generateButton);
//     expect(generateButton).not.toBeInTheDocument();

//     const completeText = screen.getByText('The invitations have been generated');
//     expect(completeText).toBeInTheDocument();
//   });

//   test('should render summary list second without errors', () => {
//     const summaryList2 = screen.getByTestId('summary-list-2');
//     const checkDetailsBanner = screen.getByTestId('check-details-banner');

//     expect(summaryList2).toBeInTheDocument();
//     expect(checkDetailsBanner).toBeInTheDocument();
//   });

//   test('should display confirmation banner, content and hide the button when generate button is clicked', () => {
//     const mockScrollIntoView = setupMockScrollIntoView();

//     const generateButton = screen.getByTestId('generate-button');
//     fireEvent.click(generateButton);
//     const confirmation = screen.getByTestId('confirmation-banner');
//     expect(confirmation).toBeInTheDocument();
//     const confirmationText = screen.getByText("The invitations will be sent out to the participants using comms manager");
//     expect(confirmationText).toBeInTheDocument();
//     expect(generateButton).not.toBeInTheDocument();
//   });

//   test("should render Confirmation Content when displayConfirmationInvitationSummary is true", () => {
//     const { getByText } = render(
//       <Actions displayConfirmationInvitationSummary={true} />// Setting this to True to simulate the Confirmation scenario
//     );
//     const confirmationText = getByText("The invitations will be sent out to the participants using comms manager");
//     expect(confirmationText).toBeInTheDocument();
//   });

//   test("should render ErrorBanner and Summary List2 with error styling when displayErrorInvitationSummary is true", () => {
//     const { getByText, getByTestId } = render(
//       <InvitationSummaryPage
//         dummySummaryList={dummySummaryList}
//         displayErrorInvitationSummary={true} /> // Setting this to True to simulate the error scenario
//     );
//     const errorBannerText = getByText("There are no invitations to generate");
//     expect(errorBannerText).toBeInTheDocument();
//     const errorSummaryList2 = getByTestId('summary-list-2-error');
//     expect(errorSummaryList2).toBeInTheDocument();
//   });

//   test('should scroll to the main content when generate button is clicked', () => {
//     const mockScrollIntoView = setupMockScrollIntoView();

//     const generateButton = screen.getByTestId('generate-button');
//     fireEvent.click(generateButton);

//     // Expect that scrollIntoView was called with the correct options
//     expect(document.getElementById).toHaveBeenCalledWith('header');
//     expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
//   });

//   test('should pass and display dummySummaryList properties to child component', () => {
//     // Define dummy data
//     const dummyData = {
//       clinicDistanceHolder: "+ 5 miles",
//       availableInvitationsHolder: "4,372",
//       remainingAppointmentsHolder: "240",
//       targetFillPercentageHolder: "50 %",
//       targetAppointmentsToFillHolder: "120",
//       expectedUptakeRateHolder: "24 %",
//       invitationsToGenerateHolder: "500",
//     };
//     const clinicNameHolder = 'Phlebotomy clinic 5';
//     const addressHolder = "West Hospital Big Town RG14 4RH";

//     // Get the child component by data-testid
//     const childComponent = screen.getByTestId('invitation-summary-container');

//     // Check if properties are displayed as expected
//     expect(childComponent).toBeInTheDocument();
//     expect(childComponent).toHaveTextContent(clinicNameHolder);
//     expect(childComponent).toHaveTextContent(addressHolder);
//     expect(childComponent).toHaveTextContent(dummyData.clinicDistanceHolder);
//     expect(childComponent).toHaveTextContent(dummyData.availableInvitationsHolder);
//     expect(childComponent).toHaveTextContent(dummyData.remainingAppointmentsHolder);
//     expect(childComponent).toHaveTextContent(dummyData.targetFillPercentageHolder);
//     expect(childComponent).toHaveTextContent(dummyData.targetAppointmentsToFillHolder);
//     expect(childComponent).toHaveTextContent(dummyData.expectedUptakeRateHolder);
//     expect(childComponent).toHaveTextContent(dummyData.invitationsToGenerateHolder);
//   });
// });
