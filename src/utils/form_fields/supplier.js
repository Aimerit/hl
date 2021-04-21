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
    dataType: 'email',
    required: true
  },
  {
    property: 'phone',
    label: 'Téléphone',
    type: 'string',
    required: true
  },
  {
    property: 'officeAddress',
    type: 'object',
    fields: addressFormFields
  }
];
