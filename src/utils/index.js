import _ from 'lodash';

function cloneDeep(object = {}) {
  return _.cloneDeep(object);
}

function isDeeplyEqual(target, source, ignoredFields = []) {
  const sourceClone = cloneDeep(source);
  const defaultIngoredFields = ['id', 'deleted', 'deletedAt', 'createdAt', 'updatedAt', ...ignoredFields];
  defaultIngoredFields.forEach((field) => delete sourceClone[field]);

  return _.isEqual(target, sourceClone);
}

function isValidValue(value) {
  return ![undefined, null, ''].includes(value);
}

function isValidJSONObject(value) {
  return value && typeof value === 'object' && Object.keys(value).length > 0;
}

function isString(value) {
  return value && typeof value === 'string';
}

function joinClassNames(...classNames) {
  return classNames.join(' ');
}

function isDateValue(value) {
  return !Number.isNaN(Date.parse(value));
}

export { cloneDeep, isDeeplyEqual, isValidValue, isValidJSONObject, isString, joinClassNames, isDateValue };
