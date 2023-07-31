import { request, requestAll } from "../common/utils/Request";

export const createPolicySaleRewardCampaign = (data) => {
  const options = {
    method: "post",
    path: "policy-sale-reward-campaign",
    data: data,
  };

  return request(options);
};
export const getPolicySaleGiftCodeInformation = () => {
  const options = {
    method: "get",
    path: "policy-sale-gift-code-information",
  };

  return request(options);
};

export const getAllPolicySaleRewardCampaigns = () => {
  const options = {
    method: "get",
    path: "policy-sale-reward-campaigns",
  };

  return request(options);
};

export const getPolicySaleCampaignCustomerList = (campaignId) => {
  const options = {
    method: "get",
    path: "policy-sale-campaign-customer-list",
    params: ["campaignId"],
    values: [campaignId],
  };
  return request(options);
};

export const getPolicySaleCampaignDetail = (campaignId) => {
  const options = {
    method: "get",
    path: "policy-sale-campaign-detail",
    params: ["campaignId"],
    values: [campaignId],
  };
  return request(options);
};

export const distributeCodeToEntity = (campaignId) => {
  const options = {
    method: "get",
    path: "distribute-code-to-customer",
    params: ["campaignId"],
    values: [campaignId],
  };
  return request(options);
};
export default {
  createPolicySaleRewardCampaign,
  getPolicySaleGiftCodeInformation,
  getAllPolicySaleRewardCampaigns,
  getPolicySaleCampaignCustomerList,
  getPolicySaleCampaignDetail,
  distributeCodeToEntity,
};
