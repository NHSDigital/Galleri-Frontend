import axios from 'axios';

export function getClinicsByIcb(icbId) {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios
    .get(
      `https://zd0fbo8qia.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${icbId}`
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
      `https://zd0fbo8qia.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
    )
    .then((response) => {
      return response;
    });
};
