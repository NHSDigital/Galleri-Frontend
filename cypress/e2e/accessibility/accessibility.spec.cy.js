// Import the axe-core library to run accessibility checks
import "cypress-axe";

describe("Accessibility tests", () => {
  beforeEach(() => {
    // Navigate to the page you want to test
    cy.visit("http://localhost:3003");

    // Inject the aXe plugin for accessibility testing
    cy.injectAxe();
  });

  it("Has no detectable a11y violations on load", () => {
    // Check for accessibility violations on initial page load
    cy.checkA11y();
  });

  it("Has no a11y violations after interacting with dropdown", () => {
    // Perform some action (e.g., open a dropdown and select an option)
    cy.get("#select-icb").select("Participating ICB 1"); // Replace with the actual ID and option value of your dropdown
    cy.get("#select-icb").select("Participating ICB 2");
    cy.get("#select-icb").select("Participating ICB 3");
    cy.get("#select-icb").select("Participating ICB 4");

    // Check for accessibility violations after the action
    cy.checkA11y();
  });
});
