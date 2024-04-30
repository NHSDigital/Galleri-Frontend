import returnUser from "./returnUser";

describe("returnUser", () => {
  // Test case for successful scenario
  test("should return the tokens from the context", async () => {
    const context = {
      tokens: { access_token: "abc123", refresh_token: "def456" },
    };

    const result = await returnUser(context);
    expect(result).toEqual({ access_token: "abc123", refresh_token: "def456" });
  });

  // Test case for failure scenario
  test("should handle error and log it", async () => {
    // Mock console.error method to capture logs
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock context object without tokens
    const context = {};

    // Call the function and assert that it logs the error
    await expect(returnUser(context)).rejects.toThrow(
      "Tokens not found in the context"
    );

    // Assert that console.error was called with the error message
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "ERROR ON RETURNING USER: ",
      expect.anything()
    );

    // Restore the original console.error method
    consoleErrorMock.mockRestore();
  });
});
