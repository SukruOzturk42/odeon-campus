import { request, requestAll } from "../common/utils/Request";

export const crateRewardProduct = (name) => {
  const options = {
    method: "post",
    path: "reward-gift-product",
    data: { name: name },
  };

  return request(options);
};
export const getRewardGiftProducts = () => {
  const options = {
    method: "get",
    path: "reward-gift-products",
  };

  return request(options);
};

export const startSenddGift = (campaignId) => {
  const options = {
    method: "get",
    path: "start-sale-reward-send-operation",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const stopSenddGift = (campaignId) => {
  const options = {
    method: "get",
    path: "stop-sale-reward-send-operation",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export const startResendGift = (campaignId) => {
  const options = {
    method: "get",
    path: "trigger-sale-reward-send-operation",
    params: ["campaignId"],
    values: [campaignId],
  };

  return request(options);
};

export default {
  crateRewardProduct,
  getRewardGiftProducts,
  startSenddGift,
  startResendGift,
  stopSenddGift,
};
