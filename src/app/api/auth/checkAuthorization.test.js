import {
  extractClaims,
  validateTokenExpirationWithAuthTime,
  checkAuthorization,
} from "./checkAuthorization";
// import { validateTokenSignature } from "../validateTokenSignature";
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
  iss: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare",
  aud: "someAudience",
  sub: "user123",
  authentication_assurance_level: "3",
});

// Mock parseTokenClaims function
const mockvalidateTokenSign = jest.fn().mockResolvedValue({
  iss: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare",
  aud: "someAudience",
  sub: "user123",
  authentication_assurance_level: "3",
});

// Mock checkTokenExpiration function
const mockCheckTokenExpirationWithAuthTime = jest.fn().mockResolvedValue(true);

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

  describe("validateTokenExpirationWithAuthTime", () => {
    test("validates token expiration and authentication time", async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = currentTime + 3600; // Set expiration time to be 1 hour from current time
      const authTime = currentTime - 5 * 60; // Set authentication time to be 5 minutes ago

      const token = {
        exp: expirationTime,
        auth_time: authTime,
      };
      const result = await validateTokenExpirationWithAuthTime(token);
      expect(result).toBe(true);
    });

    test("fails when expiration time is missing", async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const authTime = currentTime - 5 * 60; // Set authentication time to be 5 minutes ago

      const token = { auth_time: authTime };
      const result = await validateTokenExpirationWithAuthTime(token);
      expect(result).toBe(false);
    });

    test("fails when authentication time is missing", async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = currentTime + 3600; // Set expiration time to be 1 hour from current time

      const token = { exp: expirationTime };
      const result = await validateTokenExpirationWithAuthTime(token);
      expect(result).toBe(false);
    });

    test("fails when expiration time is invalid", async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = currentTime - 3600; // Set expiration time to be 1 hour ago
      const authTime = currentTime - 5 * 60; // Set authentication time to be 5 minutes ago

      const token = { exp: expirationTime, auth_time: authTime };

      const result = await validateTokenExpirationWithAuthTime(token);
      expect(result).toBe(false);
    });

    test("fails when authentication time is invalid", async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = currentTime + 3600; // Set expiration time to be 1 hour from current time
      const authTime = currentTime - 20 * 60; // Set authentication time to be 20 minutes ago

      const token = { exp: expirationTime, auth_time: authTime };
      const result = await validateTokenExpirationWithAuthTime(token);
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
      );

      expect(result).toBe(
        "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3"
      );
    });

    test('returns "/autherror/activity_code_missing" if authentication assurance level is not 3', async () => {
      const user = {
        activityCodes: ["RICE123"],
        sub: "user123",
        accountStatus: "Active",
        role: "Invitation Planner",
      };
      const account = { id_token: "sampleIdToken" };
      const galleriActivityCode = "RICE123";
      const extractClaims = jest.fn().mockResolvedValue({
        iss: "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare",
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
      );
      expect(result).toBe(true);
      expect(mockParseTokenClaims).toHaveBeenCalledWith(mockAccount.id_token);
      expect(mockCheckTokenExpirationWithAuthTime).toHaveBeenCalledWith(
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
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
        mockCheckTokenExpirationWithAuthTime
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
      );

      expect(result).toBe(
        "/autherror?error=Userinfo+sub+claim+does+not+match+in+the+ID+Token"
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
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
        mockCheckTokenExpiration,
        mockvalidateTokenSign
      );

      expect(result).toBe("/autherror?error=Token+session+has+expired");
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
        mockCheckTokenExpirationWithAuthTime,
        mockvalidateTokenSign
      );

      expect(result).toBe(true);
    });
  });
});
