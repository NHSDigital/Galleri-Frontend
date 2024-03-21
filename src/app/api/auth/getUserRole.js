import axios from "axios";

export default async function getUserRole(uuid, apiID, env) {
  try {
    console.log("START TO GET THE USER ROLE");
    const response = await axios.get(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/get-user-role/?uuid=${uuid}`
    );
    console.log("GET USER ROLE: ", response);
    return {
      accountStatus: response.data.Status,
      role: response.data.Role,
      otherUserInfo: response.data,
    };
  } catch (error) {
    console.log("ERROR ON GET USER ROLE: ", error);
    return {
      accountStatus: "User Not Found",
      role: "",
      otherUserInfo: {},
    };
  }
}
