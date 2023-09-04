import { QuintileTarget } from "./../../models/invitation_planning/QuintileTarget";
import { NationalForecastUptake } from "@/app/models/invitation_planning/NationalForecastUptake";
import mockInvitationPlanningParam from "./../invitation_planning/mockInvitationPlanningParam.json";

export function getInvitationPlanningData() {
  const parameters = new QuintileTarget(
    mockInvitationPlanningParam.quintileValues,
    mockInvitationPlanningParam.lastUpdated,
    mockInvitationPlanningParam.userName
  );
  return parameters;
}

export function getNationalForecastData() {
  const parameters = new NationalForecastUptake(
    mockInvitationPlanningParam.uptakeValue,
    mockInvitationPlanningParam.lastUpdated,
    mockInvitationPlanningParam.userName
  );
  return parameters;
}
