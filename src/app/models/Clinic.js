// Clinic Summary model
export class Clinic {
  constructor(
    clinicName,
    dateOfPreviousInvitations,
    daysSincePreviousInvitations,
    numberOfInvitationsSent,
    numberOfAppointmentsAvailable
  ) {
    this.clinicName = clinicName,
      this.dateOfPreviousInvitations = dateOfPreviousInvitations,
      this.daysSincePreviousInvitations = daysSincePreviousInvitations,
      this.numberOfInvitationsSent = numberOfInvitationsSent,
      this.numberOfAppointmentsAvailable = numberOfAppointmentsAvailable
  }
}
