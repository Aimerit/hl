import React from 'react';
import PropTypes from 'prop-types';

import categoryViewModel from '../../../../../utils/view_models/category';
import { optionsPropType, supplierPropType } from '../../../../../utils/default-prop-types';

import FormContainer from '../../../../helpers/FormContainer';
import FormField from '../../../../helpers/FormField';

function CategoryForm({ category = {}, formErrors, formData, formDisabledFields, onChange }) {
  const { parentOptions } = formData;

  return (
    <FormContainer>
      {category.code && <FormField type='text' name='code' label='Code' defaultValue={category.code} disabled />}
      <FormField type='text' name='name' label='Nom' defaultValue={category.name} error={formErrors.name} required onChange={onChange} />
      <FormField type='textarea' name='description' label='Description' defaultValue={category.description} error={formErrors.description} onChange={onChange} />
      {categoryViewModel.canShowParentField(parentOptions) && (
        <FormField
          type='select'
          name='parent'
          label='Catégorie parent'
          options={parentOptions}
          disabled={categoryViewModel.isParentFieldDisabled(formDisabledFields)}
          selectFirstOptionOnMount={false}
          defaultValue={categoryViewModel.formatParentSelectDefaultValue(category)}
          onChange={onChange}
        />
      )}
    </FormContainer>
  );
}

CategoryForm.propTypes = {
  supplier: supplierPropType,
  formErrors: PropTypes.shape({}).isRequired,
  formData: PropTypes.shape({
    parentOptions: optionsPropType
  }).isRequired,
  formDisabledFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default CategoryForm;
