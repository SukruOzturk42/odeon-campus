import * as ObjectUtils from "../../../../common/utils/ObjectUtils";


export const validate = (campaignContactGroup) => {
    const errors = {};

    if(!ObjectUtils.isNonUndefinedOrNonNull(campaignContactGroup) ||
        !ObjectUtils.isNonUndefinedOrNonNull(campaignContactGroup.groupName)) {
        errors.groupName = "Grup ismi giriniz.";
    }
    if(!ObjectUtils.isNonUndefinedOrNonNull(campaignContactGroup) ||
        !ObjectUtils.isNonUndefinedOrNonNull(campaignContactGroup.contactFile)) {
        errors.contactFile = "Müşteri dosyası ekleyiniz."
    }

    return errors;
} 