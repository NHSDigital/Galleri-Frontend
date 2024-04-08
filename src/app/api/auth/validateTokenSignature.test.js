// Import the function to be tested
import { validateTokenSignature } from "./validateTokenSignature";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Mock jwksClient
jest.mock("jwks-rsa", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("validateTokenSignature", () => {
  const idToken = "your-id-token";
  const jwksUri = "your-jwks-uri";

  test("should validate the token signature", async () => {
    // Mock getKey function
    const getKeyMock = jest.fn().mockImplementation((header, callback) => {
      callback(null, "your-public-key");
    });

    // Mock the client object returned by jwksClient
    const mockClient = {
      getSigningKey: jest.fn().mockImplementation((header, callback) => {
        getKeyMock(header, callback); // Call the mocked getKey function
      }),
    };

    // Provide the mock client to the jwksClient mock implementation
    jwksClient.mockImplementation(() => mockClient);

    // Mock jwt.verify function
    const verifyMock = jest
      .spyOn(jwt, "verify")
      .mockImplementation((token, getKey, callback) => {
        getKey({ kid: "your-kid" }, (err, key) => {
          if (err) {
            callback(err);
          } else {
            callback(null, { your: "decoded-token" });
          }
        });
      });

    // Call the function
    const result = await validateTokenSignature(idToken, jwksUri);

    // Assertions
    expect(jwksClient).toHaveBeenCalledWith({ jwksUri });
    expect(verifyMock).toHaveBeenCalledWith(
      idToken,
      expect.any(Function), // Ensure that getKey function is passed as expected
      expect.any(Function) // Ensure that jwt.verify callback function is passed as expected
    );
    expect(getKeyMock).toHaveBeenCalled();
    expect(result).toEqual({ your: "decoded-token" });

    // Clean up mocks
    verifyMock.mockRestore();
  });

  test("should throw error when getKey function fails", async () => {
    // Mock getKey function to simulate failure
    const getKeyMock = jest.fn().mockImplementation((header, callback) => {
      callback(new Error("Failed to fetch signing key"));
    });

    // Mock the client object returned by jwksClient
    const mockClient = {
      getSigningKey: jest.fn().mockImplementation((header, callback) => {
        getKeyMock(header, callback); // Call the mocked getKey function
      }),
    };

    // Provide the mock client to the jwksClient mock implementation
    jwksClient.mockImplementation(() => mockClient);

    // Call the function and expect it to throw an error
    await expect(validateTokenSignature(idToken, jwksUri)).rejects.toThrowError(
      "jwt malformed"
    );

    // Assertions
    expect(jwksClient).toHaveBeenCalledWith({ jwksUri });
  });

  test("should throw an error if jwt.verify fails", async () => {
    // Mock the client object returned by jwksClient
    const mockClient = {
      getSigningKey: jest.fn().mockImplementation((header, callback) => {
        callback(null, "your-public-key");
      }),
    };

    // Provide the mock client to the jwksClient mock implementation
    jwksClient.mockImplementation(() => mockClient);

    // Mock jwt.verify function to simulate an error
    const verifyMock = jest
      .spyOn(jwt, "verify")
      .mockImplementation((token, getKey, callback) => {
        callback(new Error("Failed to verify token"));
      });

    // Call the function and expect it to throw an error
    await expect(validateTokenSignature(idToken, jwksUri)).rejects.toThrow(
      "Failed to verify token"
    );

    // Clean up mocks
    verifyMock.mockRestore();
  });
  // Add more tests for error cases if needed
});
