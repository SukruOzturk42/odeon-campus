import * as ObjectUtils from "../../../../common/utils/ObjectUtils";


export const validate = (ruleGroups) => {
    const errors = [];

    ruleGroups.map((item) => {
        const error = {};
        if (ObjectUtils.isEmptyProp(item.campaignTypeId)) {
            error.campaignTypeId = "Kampanya Tipi Seçiniz";
        }
        if (ObjectUtils.isEmptyProp(item.ruleName)) {
            error.ruleName = "Kural İsmi Giriniz";
        }
        if (ObjectUtils.isEmptyProp(item.conjunctionOperator)) {
            error.conjunctionOperator = "Kontrol Tipini Seçiniz";
        }
        let attributes = [];
        item.attributes && item.attributes.map((subItem) => {
            const subErrors = {};
            if (ObjectUtils.isEmptyProp(subItem.type)) {
                subErrors.type = "Parametre/Kural Tipi Seçiniz";
            }
            if (ObjectUtils.isEmptyProp(subItem.attributeId)) {
                subErrors.attributeId = "Parametre/Kural Seçimi Yapınız";
            }
            if (subItem.type && subItem.type === "PARAMETER") {
                if (ObjectUtils.isEmptyProp(subItem.operator)) {
                    subErrors.operator = "Operatör Seçimi Yapınız";
                }
                if (ObjectUtils.isEmptyProp(subItem.value)) {
                    subErrors.value = "Değer Seçiniz";
                }
            }
            attributes.push(subErrors);
        })
        if (!item.attributes || item.attributes.length === 0) {
            alert("Her Kural İçin En Az Bir Adet Parametre Tanımlaması Yapılmalıdır.");
            error.zeroAttribute = "Her Kural İçin En Az Bir Adet Parametre Tanımlaması Yapılmalıdır.";
        }
        if (!ObjectUtils.isEmptyObject(attributes))
            error.attributes = attributes;
        if (!ObjectUtils.isEmptyObject(error))
            errors.push(error);
    })
    if (!ruleGroups || ruleGroups.length === 0) {
        const error = {};
        alert("En Az Bir Kural Tanımlaması Yapılmalıdır.");
        error.zeroRuleGroups = "En Az Bir Kural Tanımlaması Yapılmalıdır.";
        errors.push(error);
    }
    let valid = true;

    errors.length > 0 && errors.map(error => {
        if (!ObjectUtils.isEmptyObject(error)) {
            error.attributes.length > 0 && error.attributes.map(attr => {
                if (!ObjectUtils.isEmptyObject(attr)) {
                    valid = false;
                }
            })
            if(error.conjunctionOperator !== undefined || error.ruleName !== undefined) {
                valid = false;
            }
        }
    })

    if (valid)
        return [];
    else
        return errors;
}