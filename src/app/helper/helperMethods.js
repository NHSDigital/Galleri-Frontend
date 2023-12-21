export function setClinicDetails(response) {
  const weeklyCapacityData = response.data.WeekCommencingDate.M;
  const weeklyCapacityKeys = sortDate(
    Object.keys(response.data.WeekCommencingDate.M)
  );
  let weeklyCapacityList = [];
  weeklyCapacityKeys.forEach((key) => {
    weeklyCapacityList.push({
      date: key,
      value: weeklyCapacityData[key].N,
    });
  });

  const prevInviteDate = response.data.PrevInviteDate.S;
  const dateOfPrevInv = prevInviteDate ? prevInviteDate : "Not Available";
  const daysSincePrevInv = prevInviteDate
    ? calculateDaysSince(prevInviteDate)
    : "Not Available";

  const clinicInvitationHistory = {
    dateOfPrevInv,
    daysSincePrevInv,
    invSent: response.data.InvitesSent.N,
    appsRemaining: response.data.Availability.N,
  };

  const addressParts = response.data.Address.S.split(",");
  const [firstWordAfterComma] = addressParts[1].trim().split(" ");
  const displayViewAllPrevInvitations = prevInviteDate ? true : false;

  const lastSelectedRange = response.data.LastSelectedRange.N;
  const targetFillToPercentage = response.data.TargetFillToPercentage.N;

  return {
    lastSelectedRange: lastSelectedRange,
    targetFillToPercentage: targetFillToPercentage,
    addressParts: addressParts,
    firstWordAfterComma: firstWordAfterComma,
    weeklyCapacityList: weeklyCapacityList,
    clinicInvitationHistory: clinicInvitationHistory,
    displayViewAllPrevInvitations: displayViewAllPrevInvitations,
  };
}

function sortDate(weeklyArray) {
  const sortedWeeklyArray = weeklyArray
    .map((el) => {
      return Date.parse(el);
    })
    .sort();
  const convertSortedArrayToString = sortedWeeklyArray.map((el) => {
    const date = new Date(el);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  return convertSortedArrayToString;
}

function calculateDaysSince(date) {
  const unixTime = Date.parse(date);
  const now = Date.now();

  const diff = now - unixTime;

  return Math.floor(diff / 86400000);
}
