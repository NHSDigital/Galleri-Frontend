import axios from "axios";
import getUserRole from "./getUserRole";

jest.mock("axios");

describe("getUserRole", () => {
  it("should return user role and account status when successful", async () => {
    // Mocked response data
    const mockResponseData = {
      Status: "Active",
      Role: "Admin",
    };

    // Mock axios.get to return a successful response with mockResponseData
    axios.get.mockResolvedValue({ data: mockResponseData });

    // Mock API ID and environment
    const apiID = "mock-api-id";
    const env = "mock-env";

    // Call getUserRole with mock UUID, API ID, and environment
    const uuid = "mockUUID";
    const result = await getUserRole(uuid, apiID, env);

    // Check if the result matches the expected data
    expect(result).toEqual({
      accountStatus: "Active",
      role: "Admin",
      otherUserInfo: mockResponseData,
    });

    // Check if axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/get-user-role/?uuid=${uuid}`
    );
  });

  it('should return "User Not Found" status when an error occurs', async () => {
    // Mock axios.get to throw an error
    axios.get.mockRejectedValue(new Error("Mock error"));

    // Mock API ID and environment
    const apiID = "mock-api-id";
    const env = "mock-env";

    // Call getUserRole with mock UUID, API ID, and environment
    const uuid = "mockUUID";
    const result = await getUserRole(uuid, apiID, env);

    // Check if the result matches the expected data
    expect(result).toEqual({
      accountStatus: "User Not Found",
      role: "",
      otherUserInfo: {},
    });

    // Check if axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/get-user-role/?uuid=${uuid}`
    );
  });
});
