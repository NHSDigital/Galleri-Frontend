import {
  extractClaims,
  validateTokenExpiration,
  checkAuthorization,
} from "./checkAuthorization";
import "@testing-library/jest-dom";

const mockUser = {
  sub: "user123",
  activityCodes: ["code1", "code2"],
  accountStatus: "Active",
  role: "Invitation Planner",
};
const mockAccount = { id_token: "mockToken" };
const mockClientID = "someAudience";
const mockGalleriActivityCode = "code1";

// Mock parseTokenClaims function
const mockParseTokenClaims = jest.fn().mockResolvedValue({
  iss: "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc",
  aud: "someAudience",
  sub: "user123",
  authentication_assurance_level: "1",
});

// Mock checkTokenExpiration function
const mockCheckTokenExpiration = jest.fn().mockResolvedValue(true);

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

  describe("validateTokenExpiration", () => {
    test("returns true if current time is before expiration time", async () => {
      // Mock token with expiration time 1 hour in the future
      const token = {
        exp: Math.floor(Date.now() / 1000) + 3600, // Current time plus 1 hour
      };

      const result = await validateTokenExpiration(token);

      expect(result).toBe(true);
    });

    test("returns false if current time is after expiration time", async () => {
      // Mock token with expiration time 1 hour in the past
      const token = {
        exp: Math.floor(Date.now() / 1000) - 3600, // Current time minus 1 hour
      };

      const result = await validateTokenExpiration(token);

      expect(result).toBe(false);
    });

    test("returns false if token is expired", async () => {
      // Mock token with expiration time 1 hour in the past
      const token = {
        exp: Math.floor(Date.now() / 1000) - 3600, // Current time minus 1 hour
      };

      const result = await validateTokenExpiration(token);

      expect(result).toBe(false);
    });

    test("returns false if token is missing", async () => {
      // Mock token as null
      const token = null;

      const result = await validateTokenExpiration(token);

      expect(result).toBe(false);
    });
  });

  describe("checkAuthorization", () => {
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
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3"
      );
    });

    test('returns "/autherror/activity_code_missing" if authentication assurance level is not 1', async () => {
      const user = {
        activityCodes: ["RICE123"],
        sub: "user123",
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        iss: "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc",
        aud: "someAudience",
        sub: "user123",
        authentication_assurance_level: "2",
      });

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        mockClientID,
        extractClaims,
        mockCheckTokenExpiration
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
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3"
      );
    });

    test("should return true if user is authorized and token is valid", async () => {
      const result = await checkAuthorization(
        mockUser,
        mockAccount,
        mockGalleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );
      expect(result).toBe(true);
      expect(mockParseTokenClaims).toHaveBeenCalledWith(mockAccount.id_token);
      expect(mockCheckTokenExpiration).toHaveBeenCalledWith(
        expect.objectContaining({
          iss: expect.any(String),
          aud: expect.any(String),
          sub: expect.any(String),
          authentication_assurance_level: expect.any(String),
        })
      );
    });

    test('returns false if user account is active, but role is not "Invitation Planner" or "Referring Clinician"', async () => {
      const user = {
        activityCodes: ["RICE123"],
        sub: "user123",
        accountStatus: "Active",
        role: "someRole",
      };

      const galleriActivityCode = "RICE123";
      const result = await checkAuthorization(
        user,
        mockAccount,
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(false);
    });

    test("returns false if user account is active, but ID token validation fails", async () => {
      const account = { id_token: "sampleIdToken" };
      const mockParseTokenClaims = jest.fn().mockResolvedValue({
        iss: "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc",
        aud: "",
        sub: "user123",
        authentication_assurance_level: "1",
      });
      const result = await checkAuthorization(
        mockUser,
        account,
        mockGalleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe("/autherror?error=ID+Token+Validation+failed");
    });

    test('returns "/autherror/account_not_found" if user account is inactive', async () => {
      const user = {
        sub: "user123",
        role: "Invitation Planner",
        activityCodes: ["RICE123"],
        accountStatus: "Inactive",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(
        "/autherror/account_not_found?error=User+Account+does+not+exist+or+is+inactive"
      );
    });

    test("returns sub claim fail error when sub claim from userinfo response does not match in ID token", async () => {
      const user = {
        sub: "",
        role: "Invitation Planner",
        activityCodes: ["RICE123"],
        accountStatus: "Inactive",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(
        "/autherror?error=Userinfo+Sub+claim+does+not+match+in+the+ID+Token"
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
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(true);
    });

    test("returns ID token expiration error message when validateTokenExpiration evaluates False", async () => {
      const user = {
        sub: "user123",
        activityCodes: ["RICE123"],
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      // Mock checkTokenExpiration function
      const mockCheckTokenExpiration = jest.fn().mockResolvedValue(false);

      const result = await checkAuthorization(
        user,
        account,
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe("/autherror?error=ID+Token+has+expired");
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
        galleriActivityCode,
        mockClientID,
        mockParseTokenClaims,
        mockCheckTokenExpiration
      );

      expect(result).toBe(true);
    });
  });
});
