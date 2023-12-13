import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { sumQuintiles } from "./helper";
import InvitationPlanningPage from "./InvitationPlanningPage";
import InvitationPlanning from "./InvitationPlanning";
import QuintileTargetTable from "./QuintileTargetTable";

window.HTMLElement.prototype.scrollIntoView = function() {};

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

const invitationPlanning = (
  <InvitationPlanningPage
    quintileValues={{}}
    quintileValuesAux={{}}
    enableFillEdit={false}
    lastUpdatedQuintile={"lastUpdated"}
    userName={"lastUpdated"}
    isCorrectTotal={true}
    nationalUptakePercentage={100}
    enableUptakeEdit={true}
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
    onKeyUp={() => {}}
  />
);

describe("Invitation planning render", () => {

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

describe("Error Scenarios", () => {
  test("National Forecast Uptake error when forecast value is not between 1 and 100", () => {
    const { container } = render(<InvitationPlanning />);
    const button = screen.getByText('Amend forecast uptake');
    expect(button.innerHTML).toBe('Amend forecast uptake');
    fireEvent.click(button);
    const myInputElement = container.querySelector(`input[id="national-forecast-uptake"]`);
    expect(myInputElement).toBeInTheDocument();

    fireEvent.change(myInputElement, {target: {value: '230'}});
    let savebutton = screen.getByText("Save changes");
    expect(savebutton.innerHTML).toBe("Save changes");

    fireEvent.click(savebutton);
    let error = screen.getAllByText("The uptake percentage must be between 1% and 100%");
    expect(error[0].innerHTML).toBe('The uptake percentage must be between 1% and 100%');
  });

  const quintileTable = (
    <QuintileTargetTable
        quintileValues={{}}
        quintileValuesAux={{}}
        enableFillEdit={true}
        isCorrectTotal={false}
        onQuintileChangeHandler={() => {}}
        sumQuintiles={() => {}}
    />
  );

  test("Quintile fill target error when values dont add to 100", () => {
    render(quintileTable);
    let error = screen.getAllByText("The fill targets must add up to 100%");
    expect(error[0].innerHTML).toBe('The fill targets must add up to 100%');
  });
});
