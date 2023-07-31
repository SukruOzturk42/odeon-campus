import { request, requestAll } from "../common/utils/Request";

export const getCampaignDetailsByCampaignId = (campaignId) => {
  const options = {
    method: "get",
    path: "campaign-details",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const saveOrUpdateCampaignDetail = (data) => {
  const options = {
    method: "post",
    path: "campaign-details",
    data: data,
  };

  return request(options);
};

export const deleteCampaignDetail = (data) => {
  const options = {
    method: "post",
    path: "campaign-detail",
    data: data,
  };

  return request(options);
};

export const getCampaignImageByCampaignDetailId = (campaignDetailId) => {
  const options = {
    method: "get",
    path: "campaign-image",
    params: ["campaignDetailId"],
    values: [campaignDetailId],
  };

  return request(options);
}

export default { saveOrUpdateCampaignDetail, deleteCampaignDetail, getCampaignImageByCampaignDetailId };