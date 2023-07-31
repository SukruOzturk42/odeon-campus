import { request, requestAll } from "../common/utils/Request";

export const getCampaignReasonsByCampaignId = (campaignId) => {
    const options = {
      method: "get",
      path: "campaign-reasons",
      params: ["campaignId"],
      values: [campaignId],
    };
  
    return request(options);
  };
  
  export const saveOrUpdateCampaignReason = (data) => {
    const options = {
      method: "post",
      path: "campaign-reasons",
      data: data,
    };
  
    return request(options);
  };
  
  export const deleteCampaignReason = (data) => {
    const options = {
      method: "post",
      path: "campaign-reason",
      data: data,
    };
  
    return request(options);
  };
  
  export default { saveOrUpdateCampaignReason, deleteCampaignReason };