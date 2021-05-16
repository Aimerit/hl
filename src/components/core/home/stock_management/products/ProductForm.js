import React from 'react';
import PropTypes from 'prop-types';

import productViewModel from '../../../../../utils/view_models/product';
import { optionsPropType, supplierPropType } from '../../../../../utils/default-prop-types';
import dateUtils from '../../../../../utils/date';

import FormContainer from '../../../../helpers/FormContainer';
import FormField from '../../../../helpers/FormField';

function ProductForm({ product = {}, formErrors, formData, onChange }) {
  const { categoryOptions, supplierOptions } = formData;

  return (
    <FormContainer>
      {product.code && <FormField type='text' name='code' label='Code' defaultValue={product.code} disabled />}
      <FormField type='text' name='name' label='Nom' defaultValue={product.name} error={formErrors.name} required onChange={onChange} />
      <FormField type='text' name='brand' label='Marque' defaultValue={product.brand} error={formErrors.brand} onChange={onChange} />
      <FormField type='textarea' name='description' label='Description' defaultValue={product.description} error={formErrors.description} onChange={onChange} />
      <FormField type='number' name='quantity' label='Quantité' defaultValue={product.quantity} error={formErrors.quantity} required onChange={onChange} />
      <FormField type='number' name='unitBuyingPrice' label="Prix d'achat unitaire" defaultValue={product.unitBuyingPrice} error={formErrors.unitBuyingPrice} required onChange={onChange} />
      <FormField type='date' name='expirationDate' label="Date d'expiration" defaultValue={product.expirationDate} min={dateUtils.today()} error={formErrors.expirationDate} onChange={onChange} />
      {productViewModel.canShowCategoryField(categoryOptions) && (
        <FormField
          type='select'
          name='category'
          label='Catégorie'
          options={categoryOptions}
          selectFirstOptionOnMount={false}
          defaultValue={productViewModel.formatCategorySelectDefaultValue(product)}
          onChange={onChange}
        />
      )}
      {productViewModel.canShowSupplierField(categoryOptions) && (
        <FormField
          type='select'
          name='supplier'
          label='Fournisseur'
          options={supplierOptions}
          selectFirstOptionOnMount={false}
          defaultValue={productViewModel.formatSupplierSelectDefaultValue(product)}
          onChange={onChange}
        />
      )}
    </FormContainer>
  );
}

ProductForm.propTypes = {
  supplier: supplierPropType,
  formErrors: PropTypes.shape({}).isRequired,
  formData: PropTypes.shape({
    categoryOptions: optionsPropType,
    supplierOptions: optionsPropType
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default ProductForm;
