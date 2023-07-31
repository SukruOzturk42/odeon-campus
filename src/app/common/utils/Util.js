import _ from "lodash";
import moment from "moment";

export const convertDtoObjectToSelectObject = (value, modelObject) => {
  if (value && modelObject) {
    if (Array.isArray(value)) {
      return value.map((item) => mapToSelectModel(item, modelObject));
    } else {
      return mapToSelectModel(value, modelObject);
    }
  }
};
export const customSelectOptionFilter = (option, searchText) => {
  return option.data.label
    ? option.data.label
        .toString()
        .turkishToLower()
        .includes(searchText.toString().turkishToLower()) ||
        option.data.label
          .toString()
          .turkishToUpper()
          .includes(searchText.toString().turkishToUpper())
    : false;
};

export const convertResponseArrayToSelectArray = (data, modelObject) => {
  if (data && modelObject) {
    return data.map(function(item) {
      return { label: item[modelObject.label], value: item[modelObject.value] };
    });
  }
};

// eslint-disable-next-line no-extend-native
String.prototype.turkishToUpper = function() {
  let string = this;
  let letters = { i: "İ", ş: "Ş", ğ: "Ğ", ü: "Ü", ö: "Ö", ç: "Ç", ı: "I" };
  string = string.replace(/(([iışğüçö]))/g, function(letter) {
    return letters[letter];
  });
  return string.toUpperCase();
};

// eslint-disable-next-line no-extend-native
String.prototype.turkishToLower = function() {
  let string = this;
  let letters = { İ: "i", I: "ı", Ş: "ş", Ğ: "ğ", Ü: "ü", Ö: "ö", Ç: "ç" };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};

function mapToSelectModel(value, modelObject) {
  return {
    label: !_.isUndefined(value[modelObject.label])
      ? value[modelObject.label]
      : value.label,
    value: !_.isUndefined(value[modelObject.value])
      ? value[modelObject.value]
      : value.value,
  };
}

export const datatableDateFormatter = (cell, row) => {
  return cell ? moment(cell).format("DD/MM/YYYY") : "";
};

export const dateFormatWithHour = (cell, row) => {
  return cell ? moment(cell).format("DD-MM-YYYY HH:mm") : "";
};

export const dateFormat = (cell, row) => {
  return cell ? moment(cell).format("DD-MM-YYYY") : "";
};

export const currencyFormat = (cell, row) => {
  return cell ? cell.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
};

export const removeProperty = (obj, propertyName) => {
  let newObj = { ...obj };
  delete newObj[propertyName];
  return newObj;
};

export const getUid = () => {
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const getEmptyObjectHasId = () => {
  return { id: getUid() };
};

export const getInitialRuleParameter = () => {
  return { id: getUid(), type: "PARAMETER" };
};

export const getInitialRule = () => {
  return {
    id: getUid(),
    conjunctionOperator: "AND",
    attributes: [{ type: "PARAMETER", id: getUid() }],
    children: [],
  };
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });

export const prepareDocumentAttributes = ({
  key,
  value,
  required,
  representative,
  size,
  max,
  min,
  textSearchable,
}) => {
  return {
    key: key,
    value: value,
    required: required,
    representative: representative,
    size: size,
    max: max,
    min: min,
    textSearchable: textSearchable,
  };
};

export const cmCreatedDateFormat = () => {
  return moment(new Date()).format("YYYY-MM-DD HH:mm:ss.ms");
};
