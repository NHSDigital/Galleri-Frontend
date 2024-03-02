import { signOut } from "next-auth/react";

// export default async function checkAuthorization(session) {
//   if (!session) return;
//   // does not have the activity code or authentication assurance is not level 3
//   if (!session?.user?.activityCodes.includes("B1824")) {
//     await signOut({ redirect: false });
//     window.location.href = "/autherror";
//     // not active or user account does not exist
//   } else if (session?.user?.accountStatus !== "Inactive" || session?.user?.accountStatus === "User Not Found") {
//     await signOut({ redirect: false });
//     window.location.href = "/autherror";
//     // Keeping this here in case we want to route different users to different pages for referrals repo
//   } else if (
//     session?.user?.role === "Invitation Planner" ||
//     session?.user?.role === "Referring Clinician"
//   ) {
//     window.location.href = "/";
//   } else {
//     await signOut({ redirect: false });
//     window.location.href = "/autherror";
//   }
// }

export default async function checkAuthorization(user, account) {

  // does not have the activity code or authentication assurance is not level 3
  // TODO: After moving to INT env change the check below to see if authentication_assurance_level is level 3
  if (account.accessToken) {
    const idTokenPayload = await extractClaims(account.id_token);
    if (!user.activityCodes.includes("B1824") || idTokenPayload.authentication_assurance_level !== "1") {
      return false;
    }
  } else {
    if (!user.activityCodes.includes("B1824")) {
      return false;
    }
  }
  // not active or user account does not exist
  if (
    user.accountStatus === "Inactive" ||
    user.accountStatus === "User Not Found"
  ) {
    return false;
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
