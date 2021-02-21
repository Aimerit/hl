import React from 'react';
import { Button } from '@chakra-ui/react';

import dataGenerator from '../../../../utils/data-generator';
import { supplierDrawerTitles } from '../../../../utils/drawer-titles';

import Table from '../../../helpers/Table';
import Icons from '../../../helpers/Icons';
import Drawer from '../../../helpers/Drawer';
import InnerContent from '../../../core/home/InnerContent';
import SupplierForm from '../../../core/home/stock_management/suppliers/SupplierForm';
import useDisclosure from '../../../hooks/useDisclosure';
import useForm from '../../../hooks/useForm';

function Suppliers() {
  const { shown, title, setTitle, handleShow, handleHide } = useDisclosure({ initialTitle: supplierDrawerTitles.CREATE });
  const { formState, handleChange, handleSubmit } = useForm(handleSaveSupplier);

  function handleOpenCreateSupplierDrawer() {
    setTitle(supplierDrawerTitles.CREATE);
    handleShow();
  }

  function handleSaveSupplier() {
    console.log(formState);
  }

  return (
    <>
      <InnerContent
        title='Fournisseurs'
        actions={
          <Button colorScheme='primary' onClick={handleOpenCreateSupplierDrawer}>
            Créer un fournisseur
          </Button>
        }
      >
        <Table
          columns={[
            {
              title: 'Nom commercial',
              key: 'companyName',
              dataIndex: 'companyName'
            },
            {
              title: 'Date de création',
              key: 'createdAt',
              dataIndex: 'createdAt',
              dataType: 'date'
            },
            {
              title: 'Adresse email',
              key: 'email',
              dataIndex: 'email'
            },
            {
              title: 'Numéro de téléphone',
              key: 'phone',
              dataIndex: 'phone'
            },
            {
              title: 'Adresse du siège',
              key: 'address',
              dataIndex: 'address'
            }
          ]}
          dataSource={dataGenerator.generateSuppliers()}
          actions={[
            { icon: Icons.components.Edit, label: 'Modifier', onActionClick: () => {} },
            { icon: Icons.components.Delete, label: 'Supprimer', onActionClick: () => {} }
          ]}
          onSearch={() => {}}
        />
      </InnerContent>

      <Drawer title={title} shown={shown} onHide={handleHide} onSubmit={handleSubmit}>
        <SupplierForm onChange={handleChange} />
      </Drawer>
    </>
  );
}

export default Suppliers;
