import moment from 'moment';
import { isValidValue } from '.';

function formatDate(date) {
  return isValidValue(date) ? moment(date).format('DD/MM/YYYY') : date;
}

function formatDateTime(date) {
  return isValidValue(date) ? moment(date).format('DD/MM/YYYY - HH:MM') : date;
}

function today() {
  return moment().toDate();
}

export default { formatDate, formatDateTime, today };
