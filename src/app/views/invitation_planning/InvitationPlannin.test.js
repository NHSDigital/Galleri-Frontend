import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { sumQuintiles } from "./helper";
import InvitationPlanningPage from "./InvitationPlanningPage";

describe("Clinic Summary helper tests", () => {
  test("sumQuitiles returns correct sum", () => {
    const value = {
      a: "50",
      b: "25",
      c: "25",
    };

    const expected = 100;
    expect(sumQuintiles(value)).toStrictEqual(expected);
  });
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
      sumQuintiles={() => {}}
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
