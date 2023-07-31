import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export const validate = (code, codes) => {
    const errors = {};

    if (!ObjectUtils.isNonUndefinedOrNonNull(code.companyInformationId)) {
        errors.companyInformationId = "Şirket Bilgisini Giriniz.";
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(code.rewardGiftTicketTypeId)) {
        errors.rewardGiftTicketTypeId = "Müşteriye Sağlanacak Faydayı Giriniz";
    }
    if (!ObjectUtils.isNonUndefinedOrNonNull(code.campaignFile)) {
        errors.campaignFile = "Kod Excelini Giriniz.";
        alert("Kod Excelini Giriniz.");
    }
    if (codes && codes.filter(item => item.rewardGiftTicketTypeId === code.rewardGiftTicketTypeId
        && item.companyInformationId === code.companyInformationId).length > 0) {
        if (code.id === undefined || code.id === null) {
            errors.sameCode = "Aynı fayda";
        }
    }

    return errors;
}