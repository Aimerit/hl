function roundNumberToTwoDecimal(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

function reverseString(value = '') {
  return value.split('').reverse().join('');
}

function extractAndFormatIntegerPart(priceParts) {
  let integerPart = priceParts[0];
  if (integerPart.length > 3) {
    const reversedIntegerPart = reverseString(integerPart);
    const threeDigitsGroups = reversedIntegerPart.match(/\d{3}/g);
    const restWithoutThreeDigitsGroups = reversedIntegerPart.substring(threeDigitsGroups.join('').length);
    integerPart = reverseString(restWithoutThreeDigitsGroups);
    threeDigitsGroups.reverse().forEach((group) => {
      integerPart += `,${reverseString(group)}`;
    });
  }

  return integerPart;
}

function extractAndFormatDecimalPart(priceParts) {
  return priceParts.length > 1 ? `.${priceParts[1]}` : '';
}

/**
 *
 * @param {Number} price
 */
function formatPrice(price) {
  const roundedPrice = roundNumberToTwoDecimal(price);
  const priceParts = String(roundedPrice).split('.');

  const integerPart = extractAndFormatIntegerPart(priceParts);
  const decimalPart = extractAndFormatDecimalPart(priceParts);

  return `${integerPart}${decimalPart} €`.trim();
}

export default { formatPrice };
