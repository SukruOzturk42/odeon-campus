import _ from "lodash";

export const isNonUndefinedOrNonNull = (object) => {
  return _.isArray(object)
    ? object !== undefined &&
        object !== null &&
        object.length > 0 &&
      (!_.some(object, "null") || !_.some(object,""))
    : object !== undefined && object !== null;
};

export const isNoneEmptyString = (object) => {
  return object !== "";
};

export const isEmptyObject = (object) => {
  return _.isEmpty(object);
};

export const removeKeyFromObject = (object, key) => {
  return _.omit(object, [key]);
};

export const isEmptyProp = (propValue) => {
  return !isNonUndefinedOrNonNull(propValue) || !isNoneEmptyString(propValue);
};

export const removeEmptyObjects = (obj) => {
  return _(obj)
    .pickBy(_.isObject)
    .mapValues(removeEmptyObjects)
    .omitBy(_.isEmpty)
    .assign(_.omitBy(obj, _.isObject))
    .value();
};
