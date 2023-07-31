import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export const validate = (campaignDetail) => {
  const errors = {};
  const urlChecker = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );
  if (!ObjectUtils.isNonUndefinedOrNonNull(campaignDetail.referenceTypeId)) {
    errors.referenceTypeId = "Kanal Parametresi Seçiniz.";
  }
  if (!ObjectUtils.isEmptyProp(campaignDetail.campaignLink)) {
    if (!urlChecker.test(campaignDetail.campaignLink)) {
      errors.campaignLink = "Kampanya Linkini Uygun Formatta Giriniz.";
    }
  }

  if (
    ObjectUtils.isEmptyProp(campaignDetail.file) &&
    campaignDetail.fileName === null
  ) {
    errors.file = "Dosya Seçiniz.";
  }

  if (!ObjectUtils.isNonUndefinedOrNonNull(campaignDetail.campaignText)) {
    errors.campaignText = "Metin giriniz.";
  }

  return errors;
};
