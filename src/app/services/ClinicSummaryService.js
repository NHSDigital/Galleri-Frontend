import { Clinic } from "../models/Clinic";
import { ClinicList } from "../models/ClinicList";
/*
  Clinic Summary Service functions:
  Get the list of clinics in a participating integrated care board (ICB)
  and when this list was last updated.
*/
function getParticipatingClinics(data) {
  let participatingClinicList = new ClinicList(
    data.lastUpdated,
    []
  )
  data.forEach(clinic => {
    participatingClinicList.clinicList.push(
      new Clinic(
        /*
        icb.clinicName...
        ...
        */
      )
    )
  });
  return participatingClinicList;
}
