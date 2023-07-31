import * as ObjectUtils from '../../../../common/utils/ObjectUtils'

export const validate = (campaignParameter) => {
    const errors = {};

    if(!ObjectUtils.isNonUndefinedOrNonNull(campaignParameter) ||
        !ObjectUtils.isNonUndefinedOrNonNull(campaignParameter.structureId)) {
        errors.structureId = "Kampanya yapısı seçiniz.";
    }

    if(!ObjectUtils.isNonUndefinedOrNonNull(campaignParameter) ||
        !ObjectUtils.isNonUndefinedOrNonNull(campaignParameter.attributeId)) {
        errors.parameterId = "Parametre  seçiniz."
    }
    console.log(errors);
    return errors;
} 
