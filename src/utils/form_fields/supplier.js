import addressFormFields from './address';

export default [
  {
    property: 'companyName',
    label: 'Nom du fournisseur',
    type: 'string',
    required: true
  },
  {
    property: 'email',
    label: 'Adresse email',
    type: 'string',
    dataType: 'email'
  },
  {
    property: 'phone',
    label: 'Téléphone',
    type: 'string'
  },
  {
    property: 'officeAddress',
    type: 'object',
    fields: addressFormFields
  }
];
