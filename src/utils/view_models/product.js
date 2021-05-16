import { isValidJSONObject, isValidValue, cloneDeep, isString } from '..';
import { RESET_VALUE } from '../constants';
import { sharedMessages } from '../messages';

function formatCategory(category) {
  return isValidJSONObject(category) ? category.name : sharedMessages.NOT_PROVIDED.FR.FEMININE;
}

function formatSupplier(supplier) {
  return isValidJSONObject(supplier) ? supplier.name : sharedMessages.NOT_PROVIDED.FR.MASCULINE;
}

function formatAvailable(available) {
  return available ? 'Disponible' : 'Non disponible';
}

function canShowCategoryField(categoryOptions) {
  return categoryOptions.length > 0;
}

function canShowSupplierField(supplierOptions) {
  return supplierOptions.length > 0;
}

function formatCategoryOptions(categories = []) {
  const categoryOptions = categories.map((category) => ({ label: category.name, value: JSON.stringify(category) }));
  categoryOptions.unshift({ label: 'Aucune', value: RESET_VALUE });

  return categoryOptions;
}

function formatSupplierOptions(suppliers = []) {
  const supplierOptions = suppliers.map((supplier) => ({ label: supplier.companyName, value: JSON.stringify(supplier) }));
  supplierOptions.unshift({ label: 'Aucun', value: RESET_VALUE });

  return supplierOptions;
}

function formatCategorySelectDefaultValue(product) {
  return isValidJSONObject(product.category) ? JSON.stringify(product.category) : RESET_VALUE;
}

function formatSupplierSelectDefaultValue(product) {
  return isValidJSONObject(product.supplier) ? JSON.stringify(product.supplier) : RESET_VALUE;
}

function formatFormState(formState = {}) {
  const options = {};
  const formattedFormState = cloneDeep(formState);
  // category
  if (formattedFormState.category === RESET_VALUE) {
    delete formattedFormState.category;
    options.resetCategory = true;
  } else if (isValidValue(formattedFormState.category)) {
    formattedFormState.category = isString(formattedFormState.category) ? JSON.parse(formattedFormState.category) : formattedFormState.category;
  }
  // supplier
  if (formattedFormState.supplier === RESET_VALUE) {
    delete formattedFormState.supplier;
    options.resetSupplier = true;
  } else if (isValidValue(formattedFormState.supplier)) {
    formattedFormState.supplier = isString(formattedFormState.supplier) ? JSON.parse(formattedFormState.supplier) : formattedFormState.supplier;
  }

  return { formattedFormState, options };
}

function isExpirationDateColumnSortable(products) {
  return products.length > 0 && products.every((product) => isValidValue(product.expirationDate));
}

export default {
  formatCategory,
  formatSupplier,
  formatAvailable,
  canShowCategoryField,
  canShowSupplierField,
  formatCategorySelectDefaultValue,
  formatSupplierSelectDefaultValue,
  formatCategoryOptions,
  formatSupplierOptions,
  formatFormState,
  isExpirationDateColumnSortable
};
