import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import supplierActions from '../../../../store/actions/suppliers';
import dialogActions from '../../../../store/actions/ui/dialog';
import { supplierFormTitles } from '../../../../utils/form-titles';
import formValidation from '../../../../utils/form_validation';
import { supplierFormFields } from '../../../../utils/form_fields';
import { dialogVariants } from '../../../../utils/enums';
import { isDeeplyEqual } from '../../../../utils';
import { supplierMessages, sharedMessages } from '../../../../utils/messages';
import supplierViewModel from '../../../../utils/view_models/supplier';
import entitiesUtils from '../../../../utils/entities';

import { NotificationContext } from '../../../providers/Notification';
import Table from '../../../helpers/Table';
import Icons from '../../../helpers/Icons';
import Drawer from '../../../helpers/Drawer';
import { Text, StatCard, InnerContent } from '../../../library';
import CreateButton from '../../../core/home/helpers/CreateButton';
import SupplierForm from '../../../core/home/stock_management/suppliers/SupplierForm';
import useDisclosure from '../../../hooks/useDisclosure';
import useForm from '../../../hooks/useForm';

function Suppliers() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { suppliers, suppliersAnalytics, requesting } = useSelector((state) => state.suppliersState);
  const { shown, title, setTitle, handleShow, handleHide } = useDisclosure({ initialTitle: supplierFormTitles.CREATE });
  const { formState, formErrors, setFormErrors, handleChange, handleSubmit, updateFormState, resetFormState } = useForm(handleSaveSupplier);
  const [selectedSupplier, setSelectedSupplier] = useState();

  useEffect(() => {
    dispatch(supplierActions.getSuppliers());
    dispatch(supplierActions.getSuppliersAnalytics());
  }, [dispatch]);

  function handleShowCreateSupplierForm() {
    resetFormState();
    setSelectedSupplier({});
    setTitle(supplierFormTitles.CREATE);
    handleShow();
  }

  function handleShowUpdateSupplierForm(supplier) {
    resetFormState();
    setSelectedSupplier(supplier);
    updateFormState(supplier);
    setTitle(supplierFormTitles.UPDATE);
    handleShow();
  }

  function handleShowDeleteSupplierForm(supplier) {
    dispatch(
      dialogActions.showConfirmationDialog({
        variant: dialogVariants.DELETE,
        title: 'Confirmation',
        message: `Confirmez-vous la suppression du fournisseur <${supplier.companyName}> ?`,
        onConfirm: () => deleteSupplier(supplier)
      })
    );
  }

  function handleSaveSupplier() {
    return {
      [supplierFormTitles.CREATE]: createSupplier,
      [supplierFormTitles.UPDATE]: updateSupplier
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
    if (validationResult.validForm && !isDeeplyEqual(formState, selectedSupplier)) {
      dispatch(supplierActions.updateSupplier({ supplierId: selectedSupplier.id, supplierData: formState, notification, onSuccess: handleHide }));
    }
  }

  function deleteSupplier(supplier) {
    dispatch(supplierActions.deleteSupplier({ supplierId: supplier.id, notification }));
  }

  function handleSearch({ searchString }) {
    dispatch(supplierActions.searchSuppliers({ searchData: { searchString } }));
  }

  function handleResetSearch() {
    dispatch(supplierActions.getSuppliers());
  }

  return (
    <>
      <InnerContent>
        <InnerContent.Header>
          <StatCard title={entitiesUtils.formatStatValue(suppliersAnalytics.suppliersCount)} subTitle='Nombre total de fournisseurs' />
          <StatCard title={entitiesUtils.formatStatValue(suppliersAnalytics.usedSuppliersCount)} subTitle='Nombre total de fournisseurs utilisés' />
          <CreateButton onClick={handleShowCreateSupplierForm}>Créer un fournisseur</CreateButton>
        </InnerContent.Header>

        <InnerContent.Main>
          <Table
            columns={[
              {
                title: 'Code',
                key: 'code',
                dataIndex: 'code',
                dataType: 'code',
                sortable: true,
                textStyles: { weight: 500 }
              },
              {
                title: 'Nom commercial',
                key: 'companyName',
                dataIndex: 'companyName',
                sortable: true,
                textStyles: { weight: 500 }
              },
              {
                title: 'Date de création',
                key: 'createdAt',
                dataIndex: 'createdAt',
                sortable: true,
                dataType: 'datetime'
              },
              {
                title: 'Adresse email',
                key: 'email',
                dataIndex: 'email',
                defaultValue: sharedMessages.NOT_PROVIDED.FR.FEMININE
              },
              {
                title: 'Numéro de téléphone',
                key: 'phone',
                dataIndex: 'phone',
                dataType: 'phone',
                defaultValue: sharedMessages.NOT_PROVIDED.FR.MASCULINE
              },
              {
                title: 'Adresse du siège',
                key: 'officeAddress',
                dataIndex: 'officeAddress',
                dataType: 'address'
              },
              {
                title: 'Nombre de produits',
                key: 'productsCount',
                dataIndex: 'productsCount',
                styles: { width: 'calc(100% / 8)' },
                render: ({ productsCount }) => (
                  <Text colorScheme='primary' weight={500}>
                    {productsCount}
                  </Text>
                )
              }
            ]}
            dataSource={suppliers}
            requesting={requesting}
            noDataMessage={supplierMessages.NO_PROVIDER_SAVED.FR}
            actions={[
              { icon: Icons.components.Edit, label: 'Modifier', onClick: handleShowUpdateSupplierForm },
              { icon: Icons.components.Delete, label: 'Supprimer', isDeletable: supplierViewModel.isSupplierDeletable, onClick: handleShowDeleteSupplierForm }
            ]}
            searchableDataIndexes={['code', 'companyName', 'email', 'phone']}
            onSearch={handleSearch}
            onResetSearch={handleResetSearch}
          />
        </InnerContent.Main>
      </InnerContent>

      <Drawer title={title} shown={shown} onHide={handleHide} onSubmit={handleSubmit}>
        <SupplierForm supplier={formState} formErrors={formErrors} onChange={handleChange} />
      </Drawer>
    </>
  );
}

export default Suppliers;
