import axios from "axios";

export default async function getCIS2SignedJWT(apiID, env) {
  try {
    const response = await axios.get(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/cis2-signed-jwt`
    );
    return response.data;
  } catch (error) {
    console.error("ERROR ON GET USER ROLE: ", error);
    throw error;
  }
}
