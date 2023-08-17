export function filterClinicsByIcb(clinicList, icb) {
  let filteredList = [];
  if (clinicList !== undefined && icb !== '') {
    clinicList.forEach((e) => {
      if (e.icbId === icb) {
        filteredList.push(e)
      }
    });
  }
  return filteredList;
}

export function filterClinicsNoAppointments(clinicList, displayClinicsNoApp) {
  let filteredList = [];
  if (clinicList !== undefined) {
    clinicList.forEach((e) => {
      if(displayClinicsNoApp === false) {
        if (e.numberOfAppointmentsAvailable > 0) {
          filteredList.push(e)
        }
      } else {
        filteredList.push(e)
      }
    });
  }
  return filteredList;
}

export function sortDataOfPreviousInvitation(mostRecent){
  return console.log('sorted');
}

