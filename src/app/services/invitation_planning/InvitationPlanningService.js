import { QuintileTarget } from './../../models/invitation_planning/QuintileTarget'
import mockInvitationPlanningParam from './../invitation_planning/mockInvitationPlanningParam.json'

export function getInvitationPlanningData() {
  const parameters = new QuintileTarget(
    mockInvitationPlanningParam
  )
  return parameters.quintile
}
