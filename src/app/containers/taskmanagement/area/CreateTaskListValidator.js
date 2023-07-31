import * as ObjectUtils from '../../../common/utils/ObjectUtils';
import moment from 'moment';

export const validate = (task) => {
    const errors = {};

    if (!ObjectUtils.isNonUndefinedOrNonNull(task) ||
        !ObjectUtils.isNonUndefinedOrNonNull(task.name)) {
        errors.name = "Lütfen liste ismi giriniz!";
    }

    if (!ObjectUtils.isNonUndefinedOrNonNull(task) ||
        !ObjectUtils.isNonUndefinedOrNonNull(task.taskTypeId)) {
        errors.taskTypeId = "Lütfen liste ismi seçiniz!";
    }

    if (!ObjectUtils.isNonUndefinedOrNonNull(task) ||
        !ObjectUtils.isNonUndefinedOrNonNull(task.text)) {
        errors.text = "Lütfen görev metni giriniz!";
    }

    if (task.startDate) {
        if (moment(task.endDate).isBefore(task.startDate)) {
            errors.startDate = "Başlangıç tarihi bitiş tarihinden sonra olamaz."
        }
    } else {
        errors.startDate = "Lütfen başlangıç tarihi giriniz!";
    }

    if (task.endDate) {
        if (moment(task.endDate).isBefore(task.startDate)) {
            errors.endDate = "Bitiş tarihi başlangıç tarihinden önce olamaz."
        }
    } else {
        errors.endDate = "Lütfen bitiş tarihi giriniz!";
    }

    return errors;
} 