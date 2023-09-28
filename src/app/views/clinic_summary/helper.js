// When receiving data from AWS, it is formatted
// using the format below, hence following this
// convention as it will lead to more uniformity
// across the codebase
export function daysSinceLastInvite(clinicList) {
  const todayDateUnix = Date.now();
  const dayInUnix = 86400000;
  clinicList.forEach((el) => {
    const inviteDateString = el.PrevInviteDate?.S;
    const inviteDateUnix = Date.parse(inviteDateString);
    const daysSinceLastInvite = Math.floor(
      (todayDateUnix - inviteDateUnix) / dayInUnix
    );
    el.DaySincePrevInvite = {
      N: String(daysSinceLastInvite),
    };
  });
  return clinicList;
}

export function filterClinicsByIcb(clinicList, icb) {
  let filteredList = [];
  if (clinicList !== undefined && icb !== "") {
    clinicList.forEach((e) => {
      console.log(e);
      if (String(e.ICBCode?.S) === icb) {
        filteredList.push(e);
      }
    });
  }
  return filteredList;
}

export function filterClinicsNoAppointments(clinicList, displayClinicsNoApp) {
  let filteredList = [];
  if (clinicList !== undefined) {
    clinicList.forEach((e) => {
      if (displayClinicsNoApp === false) {
        if (e.Availability?.N > 0) {
          console.log(e);
          filteredList.push(e);
        }
      } else {
        filteredList.push(e);
      }
    });
  }
  return filteredList;
}
