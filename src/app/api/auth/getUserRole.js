import axios from "axios";

export default async function getUserRole(uuid, apiID, env) {
  try {
    const response = await axios.get(
      `https://${apiID}.execute-api.eu-west-2.amazonaws.com/${env}/get-user-role/?uuid=${uuid}`
    );
    return {
      accountStatus: response.data.Status,
      role: response.data.Role,
      otherUserInfo: response.data,
    };
  } catch (error) {
    return {
      accountStatus: "User Not Found",
      role: "",
      otherUserInfo: {},
    };
  }
}
