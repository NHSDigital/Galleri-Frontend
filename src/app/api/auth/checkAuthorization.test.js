import { checkAuthorization } from "./checkAuthorization";
import "@testing-library/jest-dom";

describe("All Test", () => {
  describe("checkAuthorization", () => {
    test("should return true for authorized user with OAuth type account", async () => {
      // Mock user and account objects
      const user = { isAuthorized: true };
      const account = { type: "oauth" };

      // Call the function and assert the result
      const result = await checkAuthorization(
        user,
        account,
        "GALLERI_ACTIVITY_CODE"
      );
      expect(result).toBe(true);
    });

    test("should return error message for missing activity code", async () => {
      // Mock user and account objects
      const user = { activityCodes: [], accountStatus: "Active", role: "User" };
      const account = { type: "local" };

      // Call the function and assert the result
      const result = await checkAuthorization(
        user,
        account,
        "GALLERI_ACTIVITY_CODE"
      );
      expect(result).toEqual(
        "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3"
      );
    });

    test("should return error message for inactive or non-existing user account", async () => {
      // Mock user and account objects
      const user = {
        activityCodes: ["GALLERI_ACTIVITY_CODE"],
        accountStatus: "Inactive",
        role: "User",
      };
      const account = { type: "local" };

      // Call the function and assert the result
      const result = await checkAuthorization(
        user,
        account,
        "GALLERI_ACTIVITY_CODE"
      );
      expect(result).toEqual(
        "/autherror/account_not_found?error=User+Account+does+not+exist+or+is+inactive"
      );
    });
    test('returns "/autherror/activity_code_missing" if activity code is missing', async () => {
      const user = {
        activityCodes: [],
        sub: "user123",
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3"
      );
    });
    test('returns "/autherror/activity_code_missing" when ID Token is not present for local auth and activity code doe not match', async () => {
      const user = {
        activityCodes: [],
        sub: "user123",
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "" };
      const galleriActivityCode = "RICE123";

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3"
      );
    });

    test('returns true if user role is "Invitation Planner"', async () => {
      const user = {
        sub: "user123",
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode
      );

      expect(result).toBe(true);
    });

    test('returns true if user role is "Referring Clinician"', async () => {
      const user = {
        sub: "user123",
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "Referring Clinician",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode
      );

      expect(result).toBe(true);
    });
  });
});
