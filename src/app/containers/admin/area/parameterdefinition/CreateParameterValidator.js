import * as ObjectUtils from '../../../../common/utils/ObjectUtils'

export const validateParameter = (attribute, campaignTypeId, attributes) => {
    const errors = {};

    if (!ObjectUtils.isNonUndefinedOrNonNull(attribute) ||
        !ObjectUtils.isNonUndefinedOrNonNull(attribute.name)) {
        errors.name = "Parametre adı giriniz.";
    }
    else {
        if (attributes.filter(item => item.name === attribute.name).length !== 0) {
            errors.name = "Daha önce aynı isime sahip parametre tanımlanmış."
        }
    }

    if (!ObjectUtils.isNonUndefinedOrNonNull(attribute) ||
        !ObjectUtils.isNonUndefinedOrNonNull(attribute.description)) {
        errors.description = "Parametre açıklaması giriniz.";
    }
    else {
        if (attributes.filter(item => item.description === attribute.description).length !== 0) {
            errors.description = "Daha önce aynı açıklamaya sahip parametre tanımlanmış."
        }
    }

    if (!ObjectUtils.isNonUndefinedOrNonNull(attribute) ||
        !ObjectUtils.isNonUndefinedOrNonNull(attribute.dataType)) {
        errors.dataType = "Parametre data tipi seçiniz."
    }

    if (!ObjectUtils.isNonUndefinedOrNonNull(campaignTypeId)) {
        errors.campaignTypeId = "Parametre Kampanya tipi seçiniz."
    }
    return errors;
} 