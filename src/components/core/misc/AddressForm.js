import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VStack, HStack } from '@chakra-ui/react';

import addressCitiesOptions from '../../../utils/select_options/address-cities';
import { addressPropType } from '../../../utils/default-prop-types';

import FormField from '../../helpers/FormField';

export default function AddressForm({ property, required = false, address = {}, formErrors = {}, onChange }) {
  const [formState, setFormState] = useState(address);

  function handleAddressChange({ name, value }) {
    const updatedFormState = { ...formState, [name]: value };
    setFormState(updatedFormState);
    onChange({ name: property, value: updatedFormState });
  }

  return (
    <VStack spacing={4}>
      <HStack spacing={4} width='100%'>
        <FormField type='select' name='city' label='Ville' options={addressCitiesOptions} defaultValue={address.city} error={formErrors.city} required={required} onChange={handleAddressChange} />
        <FormField type='text' name='neighborhood' label='Quartier' defaultValue={address.neighborhood} error={formErrors.neighborhood} required={required} onChange={handleAddressChange} />
      </HStack>
      <FormField type='text' name='indication' label='Indication' defaultValue={address.indication} error={formErrors.indication} onChange={handleAddressChange} />
    </VStack>
  );
}
AddressForm.propTypes = {
  property: PropTypes.string.isRequired,
  required: PropTypes.bool,
  address: addressPropType,
  formErrors: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired
};
