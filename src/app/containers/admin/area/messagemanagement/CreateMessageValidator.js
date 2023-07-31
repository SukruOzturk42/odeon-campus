import * as ObjectUtils from '../../../../common/utils/ObjectUtils'

export const validate = (message) => {
    const errors = {};

    if(!ObjectUtils.isNonUndefinedOrNonNull(message) ||
        !ObjectUtils.isNonUndefinedOrNonNull(message.code)) {
        errors.code = "Mesaj kodunu giriniz.";
    }

    if(!ObjectUtils.isNonUndefinedOrNonNull(message) ||
    !ObjectUtils.isNonUndefinedOrNonNull(message.key)) {
    errors.key = "Mesaj anahtarını giriniz.";
}

    if(!ObjectUtils.isNonUndefinedOrNonNull(message) ||
        !ObjectUtils.isNonUndefinedOrNonNull(message.description)) {
        errors.description = "Mesaj açıklamasını ekleyiniz."
    }

    return errors;
} 
