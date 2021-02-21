import moment from 'moment';

/**
 *
 * @param {Date} date
 */
function formatDate(date) {
  return moment(date).format('DD/MM/YYYY');
}

export default { formatDate };
