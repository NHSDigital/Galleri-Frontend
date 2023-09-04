import axios from 'axios';
/*
  API:
  Service class to perform network requests
  - ClinicInformationService(clinicId, clinicName)
    - Get clinic details via clinicId and clinicName.
*/
class ClinicInformationService {
  async getClinicInformation(clinicId, clinicName) {
    axios.defaults.baseURL = 'https://qkmfok9fq5.execute-api.eu-west-2.amazonaws.com/non-prod/clinic-invitations';
    try {
      axios.get('/', {
        params: {
          clinicId: clinicId,
          clinicName: clinicName
        }
      })
        .then(function (response) {
          console.log(response);
          return response;
        })
        .catch(function (error) {
          console.log(error);
          return error;
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      return error;
    }
  }
}
export default new ClinicInformationService()
