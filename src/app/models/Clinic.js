// Clinic Summary model
export class Clinic {
  constructor(
    clinicName,
    dateOfPreviousInvitations,
    daysSincePreviousInvitations,
    numberOfInvitationsSent,
    numberOfAppointmentsAvailable,
    icbId
  ) {
    this.clinicName = clinicName,
      this.dateOfPreviousInvitations = dateOfPreviousInvitations,
      this.daysSincePreviousInvitations = daysSincePreviousInvitations,
      this.numberOfInvitationsSent = numberOfInvitationsSent,
      this.numberOfAppointmentsAvailable = numberOfAppointmentsAvailable,
      this.icbId = icbId
  }
}
