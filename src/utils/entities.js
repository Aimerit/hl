function formatAddress({ city, neighborhood, indication = '' }) {
  return [neighborhood, indication, city].filter((value) => !isNullish(value)).join(', ');
}

function isNullish(value) {
  return [null, undefined, ''].includes(value);
}

function formatCode(code) {
  return '#'.concat(code);
}

function formatPhoneNumber(phone) {
  if (/\d{9}/.test(phone)) {
    const threeGroupDigits = phone.match(/\d{3}/g);

    return threeGroupDigits.join('-');
  }

  return phone;
}

function formatStatValue(value) {
  return value || 0;
}

export default { formatAddress, formatCode, formatPhoneNumber, formatStatValue };
