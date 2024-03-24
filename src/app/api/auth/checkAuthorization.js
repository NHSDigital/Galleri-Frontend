export async function checkAuthorization(
  user,
  account,
  galleriActivityCode,
  clientID,
  parseTokenClaims,
  checkTokenExpiration
) {
  // Care Identity Authentication OpenID Provider's Issue identifier as specified in the OpenID Provider Configuration Document.
  const INT_iss =
    "https://am.nhsint.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare";
  const DEV_iss =
    "https://am.nhsdev.auth-ptl.cis2.spineservices.nhs.uk:443/openam/oauth2/realms/root/realms/oidc";

  const idTokenPayload = await parseTokenClaims(account.id_token);
  // ID Token claims Validation
  // TODO: After moving to INT env change the check for Integration iss URI
  if (account.id_token) {
    if (idTokenPayload?.iss !== DEV_iss || idTokenPayload?.aud !== clientID) {
      return "/autherror?error=ID+Token+Validation+failed";
    }

    // User Info claims Validation
    if (idTokenPayload?.sub !== user.sub) {
      return "/autherror?error=Userinfo+Sub+claim+does+not+match+in+the+ID+Token";
    }

    // Validate the token's expiration time
    const isValidTokenExpiration = await checkTokenExpiration(idTokenPayload);
    if (!isValidTokenExpiration) {
      return "/autherror?error=ID+Token+has+expired";
    }

    // does not have the activity code or authentication assurance is not level 3
    // TODO: After moving to INT env change the check below to see if authentication_assurance_level is level 3
    if (
      !user.activityCodes.includes(galleriActivityCode) ||
      idTokenPayload.authentication_assurance_level !== "1"
    ) {
      return "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3";
    }
  } else {
    // For Local auth below as no need to check all the Token claims as above
    if (!user.activityCodes.includes(galleriActivityCode)) {
      return "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3";
    }
  }

  // not active or user account does not exist
  if (
    user.accountStatus === "Inactive" ||
    user.accountStatus === "User Not Found"
  ) {
    return "/autherror/account_not_found?error=User+Account+does+not+exist+or+is+inactive";
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

// Function to extract the Token ID claims
export async function extractClaims(idToken) {
  // Split the ID token into its parts: header, payload, and signature
  const [header, payload, signature] = idToken.split(".");

  // Base64 decode the payload
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");

  // Parse the decoded payload as JSON to obtain the claims
  const claims = JSON.parse(decodedPayload);
  return claims;
}

// Function to validate the expiration time (exp claim)
export async function validateTokenExpiration(token) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const expirationTime = token?.exp; // Expiration time from the token's exp claim

  // Check if the current time is before the expiration time
  if (currentTime < expirationTime) {
    return true;
  } else {
    // Token has expired
    return false;
  }
}
