import * as ObjectUtils from "../../../../../common/utils/ObjectUtils";

export const validate = (campaignInformation) => {
  const errors = {};
  if (ObjectUtils.isEmptyProp(campaignInformation.campaignName)) {
    errors.campaignName = "Kampanya Adını Giriniz";
  }
  if (ObjectUtils.isEmptyProp(campaignInformation.campaignTypeId)) {
    errors.campaignTypeId = "Kampanya Tipini Seçiniz";
  }
  if (!ObjectUtils.isEmptyProp(campaignInformation.hasCustomerLimit)) {
    if (campaignInformation.hasCustomerLimit) {
      if (ObjectUtils.isEmptyProp(campaignInformation.customerLimitSize)) {
        errors.customerLimitSize = "Kampanya Limit Sayısını Giriniz";
      }
    }
  }
  return errors;
};
