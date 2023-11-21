// Clinic Summary model
export class Clinic {
  constructor(
    availability,
    clinicId,
    invitesSent,
    icbCode,
    prevInviteDate,
    clinicName,
    DaysSincePrevInvite
  ) {
    this.availability = availability,
      this.clinicId = clinicId,
      this.invitesSent = invitesSent,
      this.icbCode = icbCode,
      this.prevInviteDate = prevInviteDate,
      this.clinicName = clinicName,
      this.DaysSincePrevInvite = DaysSincePrevInvite;
  }
}
