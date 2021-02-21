import React from 'react';
import PropTypes from 'prop-types';

import FormContainer from '../../../../helpers/FormContainer';
import FormField from '../../../../helpers/FormField';

function SupplierForm({ onChange }) {
  return (
    <FormContainer>
      <FormField type='text' name='companyName' label='Nom du fournisseur' onChange={onChange} />
      <FormField type='email' name='email' label='Adresse email' onChange={onChange} />
      <FormField type='tel' name='phone' label='Téléphone' onChange={onChange} />
      <FormField type='text' name='officeAddress' label='Adresse du siège' onChange={onChange} />
    </FormContainer>
  );
}

SupplierForm.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SupplierForm;
