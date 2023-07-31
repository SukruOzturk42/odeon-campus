import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export const validate = (policySaleRewardCode) => {
    const errors = {};

    if (!ObjectUtils.isNonUndefinedOrNonNull(policySaleRewardCode.campaignName)) {
        errors.campaignName = "Kampanya Adını giriniz";
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(policySaleRewardCode.giftSendMethodTypeId)) {
        errors.giftSendMethodTypeId = "Gönderim Yönetimini Seçiniz";
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(policySaleRewardCode.policySaleGiftCodeInformationId)) {
        errors.policySaleGiftCodeInformationId = "Kod Kümesini Seçiniz";
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(policySaleRewardCode.campaignFile)) {
        errors.campaignFile = "Müşteri Excelini Giriniz.";
    }


    return errors;
}