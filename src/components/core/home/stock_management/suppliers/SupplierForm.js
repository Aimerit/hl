import React from 'react';
import PropTypes from 'prop-types';

import { supplierPropType } from '../../../../../utils/default-prop-types';

import FormContainer from '../../../../helpers/FormContainer';
import FormField from '../../../../helpers/FormField';
import AddressForm from '../../../misc/AddressForm';

function SupplierForm({ supplier = {}, formErrors, onChange }) {
  return (
    <FormContainer>
      {supplier.code && <FormField type='text' name='code' label='Code' defaultValue={supplier.code} disabled />}
      <FormField
        type='text'
        name='companyName'
        label='Nom du fournisseur'
        defaultValue={supplier.companyName}
        error={formErrors.companyName}
        onChange={onChange}
      />
      <FormField type='email' name='email' label='Adresse email' defaultValue={supplier.email} error={formErrors.email} onChange={onChange} />
      <FormField type='tel' name='phone' label='Téléphone' defaultValue={supplier.phone} error={formErrors.phone} onChange={onChange} />
      <AddressForm property='officeAddress' address={supplier.officeAddress} formErrors={formErrors.officeAddress} onChange={onChange} />
    </FormContainer>
  );
}

SupplierForm.propTypes = {
  supplier: supplierPropType,
  formErrors: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SupplierForm;
