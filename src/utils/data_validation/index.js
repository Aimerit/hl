import emailValidator from 'email-validator';

function isNullish(value) {
  return [undefined, null, ''].includes(value);
}

function isEmailValid(value) {
  return emailValidator.validate(value);
}

export { isNullish, isEmailValid };
