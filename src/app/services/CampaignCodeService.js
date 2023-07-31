import { request, requestAll } from "../common/utils/Request";

export const saveOrUpdateCampaignCode = (data) => {
  const options = {
    method: "post",
    path: "discount-code-information",
    data: data,
  };

  return request(options);
};

export const getCampaignCodeByCampaignId = () => {
  const options = {
    method: "get",
    path: "discount-code-information",
  };

  return request(options);
};

export const getCampaignsByDiscountCodeInformationId = (discountCodeInformationId) => {
  const options = {
    method: "get",
    path: "discount-code-information-campaign",
    params: ["discountCodeInformationId"],
    values: [discountCodeInformationId],
  };

  return request(options);
}

export const getAllActiveDiscountCodeInformation = () => {
  const options = {
    method: "get",
    path: "discount-code-information-active",
  };

  return request(options);
};

export const getExcelExportOfCodesByDiscountCodeInformation = (
  discountCodeInformationId
) => {
  const options = {
    method: "get",
    path: "discount-code-information-excel",
    params: ["discountCodeInformationId"],
    values: [discountCodeInformationId],
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
};

export const getDiscountCodeTempExcel = () => {
  const options = {
    method: "get",
    path: "discount-code-information-template-excel",
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
}

export const getThirdPartyDiscountCodeTempExcel = () => {
  const options = {
    method: "get",
    path: "third-party-discount-code-information-template-excel",
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
}

export const getAllDiscountCodes = () => {
  const options = {
    method: "get",
    path: "discount-codes",
  }

  return request(options);
}

export default {
  saveOrUpdateCampaignCode,
  getCampaignCodeByCampaignId,
  getAllActiveDiscountCodeInformation,
  getDiscountCodeTempExcel,
  getThirdPartyDiscountCodeTempExcel
};
