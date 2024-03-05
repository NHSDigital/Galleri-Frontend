import { extractClaims, checkAuthorization } from "./checkAuthorization";
import "@testing-library/jest-dom";

describe("All Test", () => {
  describe("extractClaims", () => {
    test("should correctly extract claims from the ID token", async () => {
      const extractClaims = jest.fn().mockResolvedValue({
        sub: 1234567890,
        name: "John Doe",
        iat: 1516239022,
      });
      // Expected claims from the ID token
      const expectedClaims = {
        sub: 1234567890,
        name: "John Doe",
        iat: 1516239022,
      };

      // Call the function
      const claims = await extractClaims();

      // Assertions
      expect(claims).toEqual(expectedClaims);
    });

    test("should throw an error if the ID token is invalid", async () => {
      // Mock invalid ID token
      const idToken = "invalidToken";

      // Call the function and expect test to throw an error
      await expect(extractClaims(idToken)).rejects.toThrow();
    });
  });

  describe("checkAuthorization", () => {
    // Define test cases
    test('returns "/autherror/activity_code_missing" if activity code is missing', async () => {
      const user = {
        activityCodes: [],
        accountStatus: "Active",
        role: "SomeRole",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "B1825";
      const extractClaims = jest.fn().mockResolvedValue({
        authentication_assurance_level: "1",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        extractClaims
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri activity code missing or authentication is not L3"
      );
    });

    test('returns "/autherror/activity_code_missing" if authentication assurance level is not 1', async () => {
      const user = {
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "SomeRole",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        authentication_assurance_level: "2",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        extractClaims
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri activity code missing or authentication is not L3"
      );
    });

    test('returns "/autherror/account_not_found" if user account is inactive', async () => {
      const user = {
        activityCodes: ["RICE123"],
        accountStatus: "Inactive",
        role: "SomeRole",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        authentication_assurance_level: "1",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        extractClaims
      );

      expect(result).toBe(
        "/autherror/account_not_found?error=User Account does not exist or is inactive"
      );
    });

    test('returns true if user role is "Invitation Planner"', async () => {
      const user = {
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        authentication_assurance_level: "1",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        extractClaims
      );

      expect(result).toBe(true);
    });

    test('returns true if user role is "Referring Clinician"', async () => {
      const user = {
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "Referring Clinician",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        authentication_assurance_level: "1",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        extractClaims
      );

      expect(result).toBe(true);
    });

    test("returns false if none of the conditions are met", async () => {
      const user = {
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "SomeRole",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        authentication_assurance_level: "1",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        extractClaims
      );

      expect(result).toBe(false);
    });
  });
});
