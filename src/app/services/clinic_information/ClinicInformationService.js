import axios from 'axios';
/*
  API:
  Service class to perform network requests
  - ClinicInformationService(clinicId, clinicName)
    - Get clinic details via clinicId and clinicName.
*/
export async function getClinicInformation(clinicId, clinicName){
  const url = "http://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/non-prod-tf/clinic-information";
  const res = await axios.get(url);
  return (res);
};
