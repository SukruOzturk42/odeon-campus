import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export const validate = (campaignCode, selectedCodeType) => {
    const errors = {};

    if (!ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeGroupName)) {
        errors.codeGroupName = "Kod Kümesi İsmini Giriniz.";
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeTypeId)) {
        errors.codeTypeId = "Kod Tipi Seçiniz.";
    }
    if (ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeTypeId) &&
        selectedCodeType[0] && selectedCodeType[0].name === "SINGLE_USE_CODE") {
        if (!ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeCharacterLength)) {
            errors.codeCharacterLength = "Kod Karakter Sayısı Giriniz.";
        }
        if (!ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeGenerationCount)) {
            errors.codeGenerationCount = "Oluşturulacak Kod Sayısı Giriniz.";
        }
    } else if (ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeTypeId) &&
        selectedCodeType[0] && selectedCodeType[0].name === "THIRD_PARTY_CODE") {
            
    } else if (ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeTypeId)) {
        if (!ObjectUtils.isNonUndefinedOrNonNull(campaignCode.code)) {
            errors.code = "Oluşturulmak İstenen Kodu Giriniz.";
        }
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(campaignCode.codeExpirationDate)) {
        errors.codeExpirationDate = "Kod Geçerlilik Tarihi Giriniz.";
    }


    return errors;
}