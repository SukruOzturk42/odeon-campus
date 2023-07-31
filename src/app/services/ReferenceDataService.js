import { request, requestAll } from "../common/utils/Request";

export const getCampaignTypes = () => {
  const options = {
    method: "get",
    path: "campaign-types",
  };

  return request(options);
};

export const getCampaignTypesByCompanyId = (companyId) => {
  const options = {
    method: "get",
    path: "campaign-types/" + companyId,
  };

  return request(options);
};

export const getCampaignVersions = (campaignId) => {
  const options = {
    method: "get",
    path: "campaign-versions",
    params: ["id"],
    values: [campaignId],
  };

  return request(options);
};

export const getCampaignGroupTypes = () => {
  const options = {
    method: "get",
    path: "campaign-group",
  };

  return request(options);
};

export const getCampaignGoalTypes = () => {
  const options = {
    method: "get",
    path: "goal-type",
  };

  return request(options);
};

export const getCampaignStatusTypes = () => {
  const options = {
    method: "get",
    path: "campaign-status",
  };

  return request(options);
};

export const getCampaignSearchStatusTypes = () => {
  const options = {
    method: "get",
    path: "campaign-search-status",
  };

  return request(options);
};

export const getCampaignSearchApprovalTypes = () => {
  const options = {
    method: "get",
    path: "campaign-search-approval",
  };

  return request(options);
};

export const getCampaignApprovalStatusTypes = () => {
  const options = {
    method: "get",
    path: "campaign-search-approval",
  };

  return request(options);
};

export const getCampaignSaleChannelTypes = () => {
  const options = {
    method: "get",
    path: "sale-channel-type",
  };

  return request(options);
};

export const getReferenceDataByParameterId = (parameterId) => {
  const options = {
    method: "get",
    path: "param-reference-data",
    params: ["parameterId"],
    values: [parameterId],
  };

  return request(options);
};

export const getOperatorsByParameterId = (parameterId) => {
  const options = {
    method: "get",
    path: "attribute-operator",
    params: ["campaign-attributeId"],
    values: [parameterId],
  };

  return request(options);
};

export const getOperatorsByAttributeId = (attributeId) => {
  const options = {
    method: "get",
    path: "attribute-operator-id",
    params: ["attributeId"],
    values: [attributeId],
  };

  return request(options);
};

export const getAttributes = () => {
  const options = {
    method: "get",
    path: "attributes",
  };

  return request(options);
};

export const getAttributesByCampaignTypeId = (campaignTypeId) => {
  const options = {
    method: "get",
    path: "attribute-campaign-type",
    params: ["campaignTypeId", "structureName"],
    values: [campaignTypeId, "state"],
  };

  return request(options);
};

export const getRewardGiftTypes = () => {
  const options = {
    method: "get",
    path: "reward-gift-types",
  };

  return request(options);
};

export const getRewardDeliveryStartType = (campaignTypeId) => {
  const options = {
    method: "get",
    path: "reward-gift-delivery-start-types",
    params: ["campaignTypeId"],
    values: [campaignTypeId],
  };

  return request(options);
};

export const getRewardGiftSendMethodTypes = () => {
  const options = {
    method: "get",
    path: "reward-send-method-types",
  };

  return request(options);
};

export const getRewardRoleTypes = () => {
  const options = {
    method: "get",
    path: "reward-role-type",
  };

  return request(options);
};

export const getRewardGiftDeliveryTypes = () => {
  const options = {
    method: "get",
    path: "reward-gift-delivery-types",
  };

  return request(options);
};

export const getRoleActions = (data) => {
  const options = {
    method: "post",
    path: "role-authorization-action",
    data: data,
  };

  return request(options);
};

export const getRoleAuthorizations = (data) => {
  const options = {
    method: "post",
    path: "role-authorization",
    data: data,
  };

  return request(options);
};

export const getRules = () => {
  const options = {
    method: "get",
    path: "rules",
  };

  return request(options);
};
export const getRulesByCampaignTypeId = (campaignTypeId) => {
  const options = {
    method: "get",
    path: "get-rules-by-campaignTypeId",
    params: ["campaignTypeId"],
    values: [campaignTypeId],
  };

  return request(options);
};

export const getReferenceTypeByAttributeId = (id) => {
  const options = {
    method: "get",
    path: "attribute-reference-type",
    params: ["attributeId"],
    values: [id],
  };

  return request(options);
};

export const getReferenceTypeByAttributeNameAndCampaignType = (
  name,
  campaignTypeId
) => {
  const options = {
    method: "get",
    path: "campaign-type-attribute-reference-type",
    params: ["attributeName", "campaignTypeId"],
    values: [name, campaignTypeId],
  };

  return request(options);
};

export const getReferenceTypeByCampaignAttributeId = (id) => {
  const options = {
    method: "get",
    path: "campaign-attribute-reference-type",
    params: ["campaignAttributeId"],
    values: [id],
  };

  return request(options);
};
export const getCampaignStructureParams = (
  campaignStructureId,
  campaignTypeId,
  attributeTypeId
) => {
  const options = {
    method: "get",
    path: "campaign-attributes",
    params: ["campaignStructureId", "campaignTypeId", "attributeTypeId"],
    values: [campaignStructureId, campaignTypeId, attributeTypeId],
  };

  return request(options);
};
export const getSubProductParams = (attributeId) => {
  const options = {
    method: "get",
    path: "campaign-parent-attribute",
    params: ["parentId"],
    values: [attributeId],
  };

  return request(options);
};

export const getCampaignRuleGroups = (campaignId) => {
  const options = {
    method: "get",
    path: "company-rule-group",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const getCampaignCodeTypes = () => {
  const options = {
    method: "get",
    path: "code-type",
    params: [],
    values: [],
  };

  return request(options);
};

export const getCampaignCodeKinds = () => {
  const options = {
    method: "get",
    path: "code-kind",
    params: [],
    values: [],
  };

  return request(options);
};

export const getCampaignCodeSendTypes = () => {
  const options = {
    method: "get",
    path: "code-send-type",
    params: [],
    values: [],
  };

  return request(options);
};

export const getCampaignRewardTypes = (campaignId) => {
  const options = {
    method: "get",
    path: "campaign-rewards",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const getCampaignAttribute = (campaignAttributeId) => {
  const options = {
    method: "get",
    path: "campaign-attribute",
    params: ["id"],
    values: [campaignAttributeId],
  };

  return request(options);
};

export const getAttribute = (campaignAttributeId) => {
  const options = {
    method: "get",
    path: "attribute",
    params: ["id"],
    values: [campaignAttributeId],
  };

  return request(options);
};

export const getRelatableCampaignsForCodeCreation = () => {
  const options = {
    method: "get",
    path: "suitable-campaigns",
    params: [],
    values: [],
  };

  return request(options);
};

export const getCampaignRuleGroupsByCampaignIdAndNotUsedForCode = (
  campaignId
) => {
  const options = {
    method: "get",
    path: "campaign-code-rule-group",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const getRewardCompanyInformation = () => {
  const options = {
    method: "get",
    path: "reward-companies-information",
  };

  return request(options);
};

export const getRewardCustomerPaymentTypes = () => {
  const options = {
    method: "get",
    path: "reward-gift-payment-types",
  };

  return request(options);
};

export const getRewardGiftTicketTypes = () => {
  const options = {
    method: "get",
    path: "reward-gift-tickets",
  };

  return request(options);
};

export const getPolicyTypes = () => {
  const options = {
    method: "get",
    path: "campaign-policy-type",
  };

  return request(options);
};

export default {
  getCampaignTypes,
  getCampaignGroupTypes,
  getCampaignStatusTypes,
  getCampaignRuleGroups,
  getCampaignApprovalStatusTypes,
  getReferenceDataByParameterId,
  getOperatorsByParameterId,
  getCampaignStructureParams,
  getAttributes,
  getRules,
  getPolicyTypes,
  getReferenceTypeByAttributeId,
  getReferenceTypeByCampaignAttributeId,
  getRoleActions,
  getCampaignSearchStatusTypes,
  getCampaignSearchApprovalTypes,
  getRoleAuthorizations,
  getCampaignGoalTypes,
  getRewardGiftTypes,
  getRewardGiftDeliveryTypes,
  getCampaignSaleChannelTypes,
  getSubProductParams,
  getCampaignCodeTypes,
  getCampaignCodeKinds,
  getCampaignCodeSendTypes,
  getCampaignRewardTypes,
  getRelatableCampaignsForCodeCreation,
  getCampaignRuleGroupsByCampaignIdAndNotUsedForCode,
  getCampaignVersions,
  getRewardDeliveryStartType: getRewardDeliveryStartType,
  getRewardCompanyInformation,
  getRewardCustomerPaymentTypes,
  getRewardRoleTypes,
  getRewardGiftTicketTypes,
  getAttributesByCampaignTypeId,
  getOperatorsByAttributeId,
  getRewardGiftSendMethodTypes,
  getRulesByCampaignTypeId,
  getCampaignAttribute,
  getAttribute,
  getCampaignTypesByCompanyId,
  getReferenceTypeByAttributeNameAndCampaignType,
};
