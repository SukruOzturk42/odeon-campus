import { request, requestAll } from "../common/utils/Request";

export const getCampaignGoalsByCampaignId = (campaignId) => {
  const options = {
    method: "get",
    path: "campaign-goals",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const saveOrUpdateCampaignGoal = (data) => {
  const options = {
    method: "post",
    path: "campaign-goals",
    data: data,
  };

  return request(options);
};

export const deleteCampaignGoal = (data) => {
  const options = {
    method: "post",
    path: "campaign-goal",
    data: data,
  };

  return request(options);
};

export default { saveOrUpdateCampaignGoal, deleteCampaignGoal };