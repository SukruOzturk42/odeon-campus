import * as ObjectUtils from "../../../../common/utils/ObjectUtils";


export const validate = (campaignBudget) => {
    const errors = {};

    if(ObjectUtils.isEmptyProp(campaignBudget.budgetItemId)) {
        errors.budgetItemId = "Bütçe Kalemi Seçiniz.";
    }
    if(ObjectUtils.isEmptyProp(campaignBudget.budgetAmount)) {
        errors.budgetAmount = "Bütçe Tutarı Giriniz."
    }

    return errors;
} 