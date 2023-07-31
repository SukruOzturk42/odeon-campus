import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export const validate = (campaignReason) => {
    const errors = {};

    if(ObjectUtils.isEmptyProp(campaignReason.decidingOrganization)) {
        errors.decidingOrganization = "Karar Alan Organizasyonu Giriniz.";
    }
    if(ObjectUtils.isEmptyProp(campaignReason.decisionDate)) {
        errors.decisionDate = "Karar Tarihini Seçiniz.";
    }

    return errors;
}