import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import supplierActions from '../../../../store/actions/suppliers';
import dialogActions from '../../../../store/actions/ui/dialog';
import { supplierDrawerTitles } from '../../../../utils/drawer-titles';
import formValidation from '../../../../utils/form_validation';
import { supplierFormFields } from '../../../../utils/form_fields';
import entitiesUtils from '../../../../utils/entities';

import { NotificationContext } from '../../../providers/Notification';
import Table from '../../../helpers/Table';
import Icons from '../../../helpers/Icons';
import Drawer from '../../../helpers/Drawer';
import Text from '../../../helpers/Text';
import InnerContent from '../../../core/home/helpers/InnerContent';
import CreateButton from '../../../core/home/helpers/CreateButton';
import SupplierForm from '../../../core/home/stock_management/suppliers/SupplierForm';
import useDisclosure from '../../../hooks/useDisclosure';
import useForm from '../../../hooks/useForm';

function Suppliers() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { suppliers, requesting } = useSelector((state) => state.suppliersState);
  const { shown, title, setTitle, handleShow, handleHide } = useDisclosure({ initialTitle: supplierDrawerTitles.CREATE });
  const { formState, formErrors, setFormErrors, handleChange, handleSubmit, updateFormState, resetFormState } = useForm(handleSaveSupplier);
  const [selectedSupplier, setSelectedSupplier] = useState();

  useEffect(() => {
    dispatch(supplierActions.getSuppliers());
  }, [dispatch]);

  function handleCreateSupplier() {
    resetFormState();
    setTitle(supplierDrawerTitles.CREATE);
    handleShow();
  }

  function handleUpdateSupplier(supplier) {
    resetFormState();
    setSelectedSupplier(supplier);
    updateFormState(supplier);
    setTitle(supplierDrawerTitles.UPDATE);
    handleShow();
  }

  function handleDeleteSupplier(supplier) {
    dispatch(
      dialogActions.showConfirmationDialog({
        title: 'Confirmation',
        message: `Confirmez-vous la suppression du fournisseur <${supplier.companyName}> ?`,
        onConfirm: function () {
          dispatch(supplierActions.deleteSupplier({ supplierId: supplier.id, notification }));
        }
      })
    );
  }

  function handleSaveSupplier() {
    return {
      [supplierDrawerTitles.CREATE]: createSupplier,
      [supplierDrawerTitles.UPDATE]: updateSupplier
    }[title]();
  }

  function createSupplier() {
    const validationResult = formValidation.validateForm(formState, supplierFormFields);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm) dispatch(supplierActions.createSupplier({ supplierData: formState, notification, onSuccess: handleHide }));
  }

  function updateSupplier() {
    const validationResult = formValidation.validateForm(formState, supplierFormFields);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm) {
      dispatch(supplierActions.updateSupplier({ supplierId: selectedSupplier.id, supplierData: formState, notification, onSuccess: handleHide }));
    }
  }

  return (
    <>
      <InnerContent actions={<CreateButton onClick={handleCreateSupplier}>Créer un fournisseur</CreateButton>}>
        <Table
          columns={[
            {
              title: 'Code',
              key: 'code',
              dataIndex: 'code',
              dataType: 'code',
              render: ({ code }) => <Text weight={500}>{entitiesUtils.formatCode(code)}</Text>
            },
            {
              title: 'Nom commercial',
              key: 'companyName',
              dataIndex: 'companyName',
              render: ({ companyName }) => <Text weight={500}>{companyName}</Text>
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
              dataIndex: 'phone',
              dataType: 'phone'
            },
            {
              title: 'Adresse du siège',
              key: 'officeAddress',
              dataIndex: 'officeAddress',
              dataType: 'address'
            }
          ]}
          dataSource={suppliers}
          requesting={requesting}
          noDataMessage='Aucun fournisseur enregistré'
          actions={[
            { icon: Icons.components.Edit, label: 'Modifier', onActionClick: handleUpdateSupplier },
            { icon: Icons.components.Delete, label: 'Supprimer', onActionClick: handleDeleteSupplier }
          ]}
          onSearch={() => {}}
        />
      </InnerContent>

      <Drawer title={title} shown={shown} onHide={handleHide} onSubmit={handleSubmit}>
        <SupplierForm supplier={formState} formErrors={formErrors} onChange={handleChange} />
      </Drawer>
    </>
  );
}

export default Suppliers;
