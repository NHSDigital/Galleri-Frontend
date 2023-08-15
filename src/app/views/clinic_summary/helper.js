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
