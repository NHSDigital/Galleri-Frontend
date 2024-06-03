/**
 * Function to validate the Authorization check for Oauth/CIS2 Users
 * returned from the Backend and also checks authorization for users
 * logged in via local auth.
 * @function checkAuthorization
 * @async
 * @param {Object} user - The user object containing user details.
 * @param {Object} account - The account object containing account details.
 * @param {string} galleriActivityCode - The activity code required for authorization.
 * @returns {Promise<boolean|string>} - Returns true if authorized, false if not authorized, or a string with the error URL if there's an issue.
 */

export async function checkAuthorization(user, account, galleriActivityCode) {
  // OAuth Sign In Check Result from Backend Authenticator
  if (account.type === "oauth") {
    return user?.isAuthorized;
  }
  // For Local auth below as no need to check all the Token claims as above
  else {
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
    // Local Auth role check Below
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
