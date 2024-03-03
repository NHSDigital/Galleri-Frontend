
export default async function checkAuthorization(user, account, galleriActivityCode) {

  // does not have the activity code or authentication assurance is not level 3
  // TODO: After moving to INT env change the check below to see if authentication_assurance_level is level 3
  if (account.id_token) {
    const idTokenPayload = await extractClaims(account.id_token);
    if (!user.activityCodes.includes(galleriActivityCode) || idTokenPayload.authentication_assurance_level !== "1") {
      return "/autherror/activity_code_missing?error=Galleri activity code missing or authentication is not L3";
    }
  } else {
    if (!user.activityCodes.includes(galleriActivityCode)) {
      return "/autherror/activity_code_missing?error=Galleri activity code missing or authentication is not L3";
    }
  }
  // not active or user account does not exist
  if (
    user.accountStatus === "Inactive" ||
    user.accountStatus === "User Not Found"
  ) {
    return "/autherror/account_not_found?error=User Account does not exist or is inactive";
    // Keeping this here in case we want to route different users to different pages for referrals repo
  } else if (
    user.role === "Invitation Planner" ||
    user.role === "Referring Clinician"
  ) {
    return true;
  } else {
    return false;
  }
}

async function extractClaims(idToken) {
  // Split the ID token into its parts: header, payload, and signature
  const [header, payload, signature] = idToken.split(".");

  // Base64 decode the payload
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");

  // Parse the decoded payload as JSON to obtain the claims
  const claims = JSON.parse(decodedPayload);
  return claims;
}
