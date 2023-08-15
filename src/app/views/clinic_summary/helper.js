export function filterClinicsByIcb(clinicList, icb){
  if (clinicList !== undefined) {
    if(icb !== ''){
      return clinicList.filter((e) => {
        return e.icbId === icb;
      });
    }
  }
}
