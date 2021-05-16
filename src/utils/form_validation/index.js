import { isValidValue } from '..';
import { isNullish, isEmailValid } from '../data_validation';

function validateForm(formState = {}, formFields = []) {
  return formFields.reduce(
    ({ validForm, formErrors }, { property, label, type, fields, ...restProps }) => {
      const value = formState[property];
      if (type === 'object') {
        const fieldValidationResult = validateForm(value, fields);
        validForm = validForm && fieldValidationResult.validForm;
        if (!validForm) formErrors[property] = fieldValidationResult.formErrors;
      } else {
        const { validField, errorMessage } = validateFieldValue(value, { type, ...restProps });
        validForm = validForm && validField;
        if (!validField) formErrors[property] = `${label} ${errorMessage}`;
      }

      return { validForm, formErrors };
    },
    { validForm: true, formErrors: {} }
  );
}

function validateFieldValue(value, field = {}) {
  const fieldValidation = { validField: true, errorMessage: '' };
  const { type, dataType, pattern, required = false } = field;

  validateValueRequirement(value, required, fieldValidation);
  if (!fieldValidation.validField || !isValidValue(value)) return fieldValidation;

  if (type) validateValueType(value, type, fieldValidation);
  if (dataType) validateValueDataType(value, dataType, fieldValidation);
  if (pattern) validateValuePattern(value, pattern, fieldValidation);

  return fieldValidation;
}

function validateValueRequirement(value, required, fieldValidation) {
  if (required && isNullish(value)) {
    fieldValidation.validField = false;
    fieldValidation.errorMessage = 'est obligatoire';
  }
}

function validateValueType(value, type, fieldValidation) {
  if (typeof value !== type) {
    fieldValidation.validField = false;
    fieldValidation.errorMessage = `est non valide`;
  }
}

function validateValueDataType(value, dataType, fieldValidation) {
  const dataTypeValidationStrategies = { email: isEmailValid };
  if (!dataType || !Object.keys(dataTypeValidationStrategies).includes(dataType)) return;
  if (!dataTypeValidationStrategies[dataType](value)) {
    fieldValidation.validField = false;
    fieldValidation.errorMessage = `est non valide`;
  }
}

function validateValuePattern(value, pattern, fieldValidation) {
  if (pattern && !pattern.test(value)) {
    fieldValidation.validField = false;
    fieldValidation.errorMessage = `est non valide`;
  }
}

export default { validateForm };
