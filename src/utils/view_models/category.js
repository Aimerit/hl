import { RESET_VALUE } from '../constants';
import { cloneDeep, isDeeplyEqual, isString, isValidJSONObject, isValidValue } from '../';
import { categoryUpdatedParentModes } from '../enums';
import { sharedMessages } from '../messages';

function formatParent(parent = {}) {
  return parent.name || sharedMessages.NOT_PROVIDED.FR.FEMININE;
}

function formatParentOptions(categories = [], selectedCategory = {}) {
  const parentOptions = categories
    .filter(({ id, parent = {} }) => {
      if (!isValidJSONObject(selectedCategory)) return true;
      const isDifferent = id !== selectedCategory.id;
      const isItsChild = parent.id === selectedCategory.id;

      return isDifferent && !isItsChild;
    })
    .map(resetIgnoredFieldsForOptions)
    .map((category) => ({ label: category.name, value: JSON.stringify(category) }));
  parentOptions.unshift({ label: 'Aucune', value: RESET_VALUE });

  return parentOptions;
}

function resetIgnoredFieldsForOptions(category) {
  return { ...category, subCategoriesCount: 0, productsCount: 0 };
}

function canShowParentField(parentOptions) {
  return parentOptions.length > 1;
}

function formatParentSelectDefaultValue(category) {
  return isValidJSONObject(category.parent) ? JSON.stringify(category.parent) : RESET_VALUE;
}

function formatFormState(formState = {}) {
  const options = {};
  const formattedFormState = cloneDeep(formState);
  if (formattedFormState.parent === RESET_VALUE) {
    delete formattedFormState.parent;
    options.resetParent = true;
  } else if (isValidValue(formattedFormState.parent)) {
    formattedFormState.parent = isString(formattedFormState.parent) ? JSON.parse(formattedFormState.parent) : formattedFormState.parent;
  }

  return { formattedFormState, options };
}

function isParentFieldDisabled(formFieldsDisabled) {
  return formFieldsDisabled.includes('parent');
}

function isCategoryDeletable(category = {}) {
  return category.subCategoriesCount === 0 && category.productsCount === 0;
}

function getUpdatedParentMode(originalCategory, updatedCategory) {
  if (!isValidJSONObject(originalCategory.parent) && isValidJSONObject(updatedCategory.parent)) return categoryUpdatedParentModes.ADDED;
  if (isValidJSONObject(originalCategory.parent) && !isValidJSONObject(updatedCategory.parent)) return categoryUpdatedParentModes.REMOVED;
  if (isValidJSONObject(originalCategory.parent) && isValidJSONObject(updatedCategory.parent) && !isDeeplyEqual(originalCategory.parent, updatedCategory.category)) {
    return categoryUpdatedParentModes.UPDATED;
  }

  return categoryUpdatedParentModes.NONE;
}

function getUpdatedParents(originalCategory, updatedCategory) {
  return { originalParent: originalCategory.parent, updatedParent: updatedCategory.parent };
}

export default {
  formatParent,
  formatFormState,
  formatParentOptions,
  canShowParentField,
  formatParentSelectDefaultValue,
  isParentFieldDisabled,
  isCategoryDeletable,
  getUpdatedParentMode,
  getUpdatedParents
};
