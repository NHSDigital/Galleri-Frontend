import axios from "axios";
import getCIS2SignedJWT from "./getCIS2SignedJWT";

jest.mock("axios");

describe("getCIS2SignedJWT", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return CIS2 Signed JWT", async () => {
    const apiID = "your-api-id";
    const env = "your-environment";
    const expectedJWT = "your-expected-jwt";

    // Mocking axios.get to return a successful response
    axios.get.mockResolvedValueOnce({ data: expectedJWT });

    const jwt = await getCIS2SignedJWT(apiID, env);
    expect(axios.get).toHaveBeenCalledWith(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/cis2-signed-jwt`
    );
    expect(jwt).toEqual(expectedJWT);
  });

  it("should throw an error when axios.get fails", async () => {
    const apiID = "your-api-id";
    const env = "your-environment";
    const expectedError = new Error("Failed to fetch data");

    // Mocking axios.get to return a rejected promise
    axios.get.mockRejectedValueOnce(expectedError);

    // Expect the function to throw an error
    await expect(getCIS2SignedJWT(apiID, env)).rejects.toThrow(expectedError);

    // Expect axios.get to have been called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/cis2-signed-jwt`
    );
  });
});
