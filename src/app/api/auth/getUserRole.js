import axios from "axios";

const GET_USER_ROLE = process.env.NEXT_PUBLIC_GET_USER_ROLE;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

export default async function getUserRole(uuid) {
  try {
    const response = await axios.get(
      `https://${GET_USER_ROLE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/get-user-role/?uuid=${uuid}`
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
