export function sortDate(weeklyArray) {
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

export function calculateDaysSince(date) {
  const unixTime = Date.parse(date);
  const now = Date.now();

  const diff = now - unixTime;

  return Math.floor(diff / 86400000);
}

export function setClinicDetails(response) {
  const weeklyCapacityData = response.data.WeekCommencingDate.M;
  const weeklyCapacityKeys = this.sortDate(
    Object.keys(response.data.WeekCommencingDate.M)
  );
  let weeklyCapacityValue = 0;
  let weeklyCapacityList = [];
  weeklyCapacityKeys.forEach((key) => {
    weeklyCapacityList.push({
      date: key,
      value: weeklyCapacityData[key].N,
    });
    weeklyCapacityValue += Number(weeklyCapacityData[key].N);
  });

  const prevInviteDate = response.data.PrevInviteDate.S;
  const dateOfPrevInv = prevInviteDate ? prevInviteDate : "Not Available";
  const daysSincePrevInv = prevInviteDate
    ? this.calculateDaysSince(prevInviteDate)
    : "Not Available";

  const clinicInvitationHistory = {
    dateOfPrevInv,
    daysSincePrevInv,
    invSent: response.data.InvitesSent.N,
    appsRemaining: weeklyCapacityValue,
  };

  const addressParts = response.data.Address.S.split(",");
  const [firstWordAfterComma] = addressParts[1].trim().split(" ");
  const displayViewAllPrevInvitations = prevInviteDate ? true : false;

  const lastSelectedRange = response.data.LastSelectedRange.N;
  const targetFillToPercentage = response.data.TargetFillToPercentage.N;

  // Set component state
  this.setState({
    rangeSelection: lastSelectedRange,
    targetFillToInputValue: targetFillToPercentage,
    appsToFill: Math.floor(
      this.context.state.recentInvitationHistory.appsRemaining *
        (this.state.targetFillToInputValue / 100)
    ),
  });

  // Set global state
  this.context.setState({
    clinicId: response.data.ClinicId.S,
    clinicName: response.data.ClinicName.S,
    // address1: response.data.Address.S,
    address1: addressParts[0].trim(),
    address2: firstWordAfterComma,
    postcode: response.data.PostCode.S,
    weeklyCapacity: weeklyCapacityList,
    recentInvitationHistory: clinicInvitationHistory,
    displayViewAllPrevInvitations: displayViewAllPrevInvitations,
  });
}
