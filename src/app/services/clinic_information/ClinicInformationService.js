import axios from 'axios';

export function getClinicsByIcb(icbId) {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
  axios
    .get(
      `https://d20mwz3leg.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${icbId}`
    )
    .then((response) => {
      return response;
    });
};

export function getClinicDetails(clinicId, clinicName) {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
  axios
    .get(
      `https://d20mwz3leg.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
    )
    .then((response) => {
      return response;
    });
};
