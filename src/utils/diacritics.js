import removeAccents from 'remove-accents';

function sanitize(value = '') {
  return removeAccents.remove(value).toLowerCase().trim();
}

export default { sanitize };
