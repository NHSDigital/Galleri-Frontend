import { Icb } from "../models/Icb";
import { Clinic } from "../models/Clinic";
import { ClinicList } from "../models/ClinicList";
import mockClinicData from '../services/mockClinicData.json'
import mockIcbList from '../services/mockIcbList.json'
/*
  Clinic Summary Service functions:
  Get the list of clinics in a participating integrated care board (ICB)
  and when this list was last updated.
*/
export function getClinicData() {
  return new ClinicList(
    'last updated date',
    mockClinicData.clinicList.map(e => {
      return new Clinic(
        e.Availability,
        e.ClinicId,
        e.InvitesSent,
        e.ICBCode,
        e.PrevInviteDate,
        e.ClinicName
      )
    })
  )
}

export function getIcbData() {
  return mockIcbList.icbList.map(e => {
    return new Icb(
      e.icbCode,
      e.icbName
    )
  })
}
