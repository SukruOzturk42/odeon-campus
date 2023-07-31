import { request, requestAll } from "../common/utils/Request";

export const getAllCampaigns = () => {
  const options = {
    method: "get",
    path: "campaigns",
  };

  return request(options);
};

export const getCampaignInformationById = (id) => {
  const options = {
    method: "get",
    path: "campaign-information/" + id,
  };

  return request(options);
};

export const getCampaignRuleGroups = (campaignId) => {
  const options = {
    method: "get",
    path: "campaign-rule-group",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const getCustomerCampaignById = (id) => {
  const options = {
    method: "get",
    path: "customer-campaign",
    params: ["id"],
    values: [id],
  };

  return request(options);
};

export const getRuleGroupNamesByCustomerCampaignId = (id) => {
  const options = {
    method: "get",
    path: "campaign-rule-groups",
    params: ["campaignId"],
    values: [id],
  };

  return request(options);
}

export const getCampaignById = (id) => {
  const options = {
    method: "get",
    path: "campaign",
    params: ["id"],
    values: [id],
  };

  return request(options);
};

export const getCampaignByVersion = (id, version) => {
  const options = {
    method: "get",
    path: "version-campaign",
    params: ["id", "version"],
    values: [id, version],
  };

  return request(options);
};

export const getCampaignActionDescriptionByCampaign = (id) => {
  const options = {
    method: "get",
    path: "campaign-action-description",
    params: ["id"],
    values: [id],
  };

  return request(options);
};

export const createCampaignCustomers = (data) => {
  const options = {
    method: "post",
    path: "campaign",
    data: data,
    responseType: "arraybuffer",
  };

  return request(options);
};

export const createCampaign = (data) => {
  const options = {
    method: "post",
    path: "campaign",
    data: data,
  };

  return request(options);
};

export const updateCampaign = (id, data) => {
  const options = {
    method: "put",
    path: "campaign",
    data: data,
    params: ["id"],
    values: [id],
  };

  return request(options);
};
export const filteredCampaignList = (data) => {
  const options = {
    method: "get",
    path: "campaign-search",
    params: ["campaignSearchStatusEnum", "campaignTypeId"],
    values: [data.campaignSearchStatusEnum, data.campaignTypeId],
  };

  return request(options);
};

export const exportCustomerCampaigns = (data) => {
  const options = {
    method: "get",
    path: "campaign-search-excel-export",
    params: ["campaignSearchStatusEnum", "campaignTypeId"],
    values: [data.campaignSearchStatusEnum, data.campaignTypeId],
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
};

export const exportApprovalCampaigns = (data) => {
  const options = {
    method: "get",
    path: "approval-campaign-search-excel-export",
    params: ["approvalCampaignSearchStatusEnum", "campaignTypeId"],
    values: [data.approvalCampaignSearchStatusEnum, data.campaignTypeId],
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
};

export const filteredApprovalCampaignList = (data) => {
  const options = {
    method: "get",
    path: "approval-campaign-search",
    params: ["approvalCampaignSearchStatusEnum", "campaignTypeId"],
    values: [data.approvalCampaignSearchStatusEnum, data.campaignTypeId],
  };

  return request(options);
};

export const getReferenceCampaign = () => {
  const options = {
    method: "get",
    path: "get-reference-campaign",
  };

  return request(options);
};

export const getSaleCampaigns = () => {
  const options = {
    method: "get",
    path: "sale-campaigns",
  };

  return request(options);
};

export const getSaleCampaignInformation = (data,pageContent) => {
  const options = {
    method: "post",
    path: "sale-information/page",
    data: data,
    params: ["page", "size"],
    values: [pageContent.page, pageContent.size],
  };

  return request(options);
};

export const getAllSaleCampaignInformation = (data) => {
  const options = {
    method: "post",
    path: "sale-information",
    data: data,
  };

  return request(options);
};

export const getSaleCampaignSummary = (campaignId) => {
  const options = {
    method: "get",
    path: "sale-campaign-summary",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};
export default {
  getAllCampaigns,
  createCampaign,
  getCampaignById,
  getCampaignRuleGroups,
  exportCustomerCampaigns,
  exportApprovalCampaigns,
  getCampaignActionDescriptionByCampaign,
  getCampaignByVersion,
  getCustomerCampaignById,
  getReferenceCampaign,
  getSaleCampaigns,
  getSaleCampaignInformation,
  getSaleCampaignSummary
};
