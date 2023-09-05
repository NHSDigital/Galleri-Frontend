import axios from 'axios';
import { ClinicDetail } from '@/app/models/clinic_information/ClinicDetail';

export function getClinicInformation(clinicId, clinicName) {
  // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios
    .get(
      "https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/non-prod-tf/clinic-information"
    )
    .then((response) => {
      return response;
    });
};
