// Function to validate the Authorization check for CIS2 Users
// returned from the Backend and also checks authorization for user
// logged in via local auth
export async function checkAuthorization(user, account, galleriActivityCode) {
  // OAuth Sign In Check Result from Backend Authenticator
  if (account.type === "oauth") {
    return user?.isAuthorized;
  } else {
    // For Local auth below as no need to check all the Token claims as above
    if (!user.activityCodes.includes(galleriActivityCode)) {
      return "/autherror/activity_code_missing?error=Galleri+activity+code+missing+or+authentication+is+not+L3";
    }
    // not active or user account does not exist
    if (
      user.accountStatus === "Inactive" ||
      user.accountStatus === "User Not Found"
    ) {
      return "/autherror/account_not_found?error=User+Account+does+not+exist+or+is+inactive";
      // Keeping this here in case we want to route different users to different pages for referrals repo
    }
    // Local Auth Checks Below
    else if (
      user.role === "Invitation Planner" ||
      user.role === "Referring Clinician"
    ) {
      return true;
    } else {
      return false;
    }
  }
}
