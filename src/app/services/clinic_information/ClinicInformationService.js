import axios from 'axios';

export function getClinicsByIcb(icbId) {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios
    .get(
      `https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/trail/clinic-icb-list?participatingIcb=${icbId}`
    )
    .then((response) => {
      return response;
    });
};

export function getClinicDetails(clinicId, clinicName) {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios
    .get(
      `https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/trail/test-parameters?clinicId=${clinicId}&clinicName=${clinicName}`
    )
    .then((response) => {
      return response;
    });
};
