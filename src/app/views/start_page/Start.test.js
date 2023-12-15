import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Start from "./Start";
import axios from "axios";

window.scrollTo = jest.fn();

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        "QJK",
        "QSL",
        "QE1",
        "QMJ",
        "QF7",
        "QH8",
        "QNX",
        "QMF",
        "QRV",
        "QNQ",
        "QM7",
        "QVV",
        "QOX",
        "QRL",
        "QHG",
        "QU9",
        "QR1",
        "QT6",
        "QXU",
        "QWO",
        "QOQ",
        "QUY",
        "QWE",
      ],
      headers: {
        "Access-Control-Allow-Headers":
          "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "Access-Control-Allow-Methods": "OPTIONS,GET",
        "Access-Control-Allow-Origin": "*",
        "X-Amzn-Trace-Id":
          "Root=1-657c6e7f-8b7378f1e8552beaf276e159;Sampled=0;lineage=69e1db65:0",
      },
    })
  ),
  defaults: {
    headers: {
      common: {
        // Mock any common headers your application might use
      },
      post: {
        "Content-Type": "application/json",
      },
      // Add other default headers if used in your application
    },
  },
  // Add any other axios methods or properties used by your component
}));

jest.mock("../../context/AppStateContext", () => {
  const mockContextValue = {
    state: {
      icbData: [" "], // as per your actual state
      icbSelected: "",
      clinicIdSelected: "",
      clinicNameSelected: "",
      lastUpdated: "14 July 2024, 1.00am",
      clinicList: [],
      displayClinicsNoApp: false,
      navigateToClinic: false,
      clinicIdNameList: [{ clinicId: "", clinicName: "" }],
      clinicId: "",
      clinicName: "",
      address1: "",
      address2: "",
      postcode: "",
      weeklyCapacity: [],
      cancelChangeText: "Change clinic",
      currentlySelectedClinicId: "",
      currentlySelectedClinic: "",
      participatingICBSelected: "",
      displayClinicSelector: false,
      displayViewAllPrevInvitations: false,
      recentInvitationHistory: {
        dateOfPrevInv: "Not available",
        daysSincePrevInv: "Not available",
        invSent: 0,
        appsRemaining: 0,
        isSubmit: false,
      },
      rangeSelection: 1,
      targetAppToFill: 0,
      targetPercentageToFill: 0,
      totalToInvite: 0,
      avgExpectedUptake: 0,
      noInviteToGenerate: 0,
      personIdentifiedToInvite: [],
      pageSize: 0,
      currentPage: 0,
    },
    setState: jest.fn(),
  };
  return {
    __esModule: true, // this is important for 'jest.mock' to work properly
    AppStateContext: React.createContext(mockContextValue), // use React.createContext
  };
});

describe("<Start />", () => {
  //   it("renders <StartPage /> initially", () => {
  //     render(<Start />);
  //     expect(screen.getByTestId("start-page")).toBeInTheDocument();
  //   });

  //   it("renders <ClinicSummary /> after start button is clicked", () => {
  //     render(<Start />);
  //     fireEvent.click(screen.getByTestId("start-button"));
  //     expect(screen.getByTestId("clinic-summary")).toBeInTheDocument();
  //   });

  it("renders <StartPage /> initially", async () => {
    await act(async () => {
      render(<Start />);
    });
    expect(screen.getByTestId("start-page")).toBeInTheDocument();
  });

  it("renders <ClinicSummary /> after start button is clicked", async () => {
    await act(async () => {
      render(<Start />);
      //   fireEvent.click(screen.getByTestId("start-button"));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("start-button"));
    });
    expect(screen.getByTestId("clinic-summary")).toBeInTheDocument();
  });
});
