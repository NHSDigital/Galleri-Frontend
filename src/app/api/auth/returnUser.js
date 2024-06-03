/**
 * Function to simply return the same response received from the backend authenticator Lambda.
 * The nested object name tokens cannot be changed as per Next-auth library
 * Originally as intended, it should have contained Oauth Tokens but since the token handling
 * was moved to backend the nested object tokens contains user authorization data instead of
 * Oauth tokens received from Identity Provider not sensitive User information.
 *
 * @param {Object} context - The context object containing user authorization details from the backend.
 * @param {Object} context.tokens - The user authorization details received from the authenticator Lambda.
 * @returns {Promise<Object>} - A promise that resolves to the tokens if present.
 * @throws {Error} - Throws an error if tokens are not found in the context.
 */
export default async function returnUser(context) {
  try {
    if (!context.tokens) {
      throw new Error("Tokens not found in the context");
    }
    return context.tokens;
  } catch (error) {
    console.error("ERROR ON RETURNING USER: ", error);
    throw error;
  }
}
