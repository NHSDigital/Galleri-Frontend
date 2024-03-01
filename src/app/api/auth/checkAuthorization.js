import { signOut } from "next-auth/react";

export default async function checkAuthorization(session) {
  if (!session) return;
  // does not have the activity code or authentication assurance is not level 3
  if (!session?.user?.activityCodes.includes("B1824")) {
    await signOut({ redirect: false });
    window.location.href = "/autherror";
    // not active or user account does not exist
  } else if (session?.user?.accountStatus === "Inactive" || session?.user?.accountStatus === "User Not Found") {
    await signOut({ redirect: false });
    window.location.href = "/autherror";
    // Keeping this here in case we want to route different users to different pages for referrals repo
  } else if (
    session?.user?.role === "Invitation Planner" ||
    session?.user?.role === "Referring Clinician"
  ) {
    window.location.href = "/";
  } else {
    await signOut({ redirect: false });
    window.location.href = "/autherror";
  }
}
