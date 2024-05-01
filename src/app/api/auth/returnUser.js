// Function to simply return the same response received from the authenticator Lambda
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
