import { request, requestAll } from "../common/utils/Request";

export const createRewardGiftTicket = (name) => {
  const options = {
    method: "post",
    path: "reward-gift-ticket-type",
    data: { name: name },
  };

  return request(options);
};

export const createRewardCompanyInformation = (name) => {
  const options = {
    method: "post",
    path: "reward-companies-information",
    data: { name: name },
  };

  return request(options);
}

export const getAllGiftCodeInformation = () => {
  const options = {
    method: "get",
    path: "gift-code-information",
  };

  return request(options);
};

export const getAllActiveDiscountCodeInformation = () => {
  const options = {
    method: "get",
    path: "active-discount-code-information",
  };

  return request(options);
};

export const getCampaignsByGiftCodeInformationId = (giftCodeInformationId) => {
  const options = {
    method: "get",
    path: "gift-code-information-campaign",
    params: ["giftCodeInformationId"],
    values: [giftCodeInformationId],
  };

  return request(options);
}

export const saveGiftCodeInformation = (code) => {
  const options = {
    method: "post",
    path: "gift-code-information",
    data: code,
  };

  return request(options);
};

export const getExcelExportOfCodesByGiftCodeInformationId = (giftCodeInformationId) => {
  const options = {
    method: "get",
    path: "gift-code-information-excel",
    params: ["giftCodeInformationId"],
    values: [giftCodeInformationId],
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  }

  return request(options);
}

export const getGiftCodeTempExcel = () => {
  const options = {
    method: "get",
    path: "gift-code-information-template-excel",
    headers: {
      accept: "*/*",
    },
    responseType: "blob",
  };

  return request(options);
}

export const getAllGiftCodes = () => {
  const options = {
    method: "get",
    path: "gift-codes",
  }

  return request(options);
}


export default { createRewardGiftTicket };
