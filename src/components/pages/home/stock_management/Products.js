import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import productActions from '../../../../store/actions/products';
import categoryActions from '../../../../store/actions/categories';
import supplierActions from '../../../../store/actions/suppliers';
import dialogActions from '../../../../store/actions/ui/dialog';
import productViewModel from '../../../../utils/view_models/product';
import { productFormTitles } from '../../../../utils/form-titles';
import formValidation from '../../../../utils/form_validation';
import { productFormFields } from '../../../../utils/form_fields';
import { isDeeplyEqual } from '../../../../utils';
import { dialogVariants } from '../../../../utils/enums';
import { productMessages, sharedMessages } from '../../../../utils/messages';
import entitiesUtils from '../../../../utils/entities';

import { NotificationContext } from '../../../providers/Notification';
import Table from '../../../helpers/Table';
import Icons from '../../../helpers/Icons';
import Drawer from '../../../helpers/Drawer';
import { Text, StatCard, InnerContent } from '../../../library';
import CreateButton from '../../../core/home/helpers/CreateButton';
import ProductForm from '../../../core/home/stock_management/products/ProductForm';
import useDisclosure from '../../../hooks/useDisclosure';
import useForm from '../../../hooks/useForm';

function Products() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { products, productsAnalytics, requesting } = useSelector((state) => state.productsState);
  const { categories } = useSelector((state) => state.categoriesState);
  const { suppliers } = useSelector((state) => state.suppliersState);
  const { shown, title, setTitle, handleShow, handleHide } = useDisclosure({ initialTitle: productFormTitles.CREATE });
  const { formState, formErrors, formDisabledFields, setFormErrors, handleChange, handleSubmit, updateFormState, resetFormState } = useForm(handleSaveProduct);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    dispatch(productActions.getProducts());
    dispatch(productActions.getProductsAnalytics());
    dispatch(categoryActions.getCategories({ options: { withAnalytics: false } }));
    dispatch(supplierActions.getSuppliers({ options: { withAnalytics: false } }));
  }, [dispatch]);

  function handleShowCreateProductForm() {
    resetFormState();
    setSelectedProduct({});
    setTitle(productFormTitles.CREATE);
    handleShow();
  }

  function handleShowUpdateProductForm(product) {
    resetFormState();
    setSelectedProduct(product);
    updateFormState(product);
    setTitle(productFormTitles.UPDATE);
    handleShow();
  }

  function handleShowDeleteProductForm(product) {
    dispatch(
      dialogActions.showConfirmationDialog({
        variant: dialogVariants.DELETE,
        title: 'Confirmation',
        message: `Confirmez-vous la suppression dub produit <${product.name}> ?`,
        onConfirm: () => deleteProduct(product)
      })
    );
  }

  function handleSaveProduct() {
    return {
      [productFormTitles.CREATE]: createProduct,
      [productFormTitles.UPDATE]: updateProduct
    }[title]();
  }

  function createProduct() {
    const { formattedFormState } = productViewModel.formatFormState(formState);
    const validationResult = formValidation.validateForm(formState, productFormFields);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm) {
      dispatch(productActions.createProduct({ productData: formattedFormState, notification, onSuccess: handleHide }));
    }
  }

  function updateProduct() {
    const { formattedFormState, options } = productViewModel.formatFormState(formState);
    const validationResult = formValidation.validateForm(formState, productFormFields);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm && !isDeeplyEqual(formattedFormState, selectedProduct)) {
      dispatch(productActions.updateProduct({ productId: selectedProduct.id, productData: formattedFormState, options, notification, onSuccess: handleHide }));
    }
  }

  function deleteProduct(product) {
    dispatch(productActions.deleteProduct({ productId: product.id, notification }));
  }

  function handleSearch({ searchString }) {
    dispatch(productActions.searchProducts({ searchData: { searchString } }));
  }

  function handleResetSearch() {
    dispatch(productActions.getProducts());
  }

  return (
    <>
      <InnerContent>
        <InnerContent.Header>
          <StatCard title={entitiesUtils.formatStatValue(productsAnalytics.productsCount)} subTitle='Nombre total de produits' />
          <StatCard title={entitiesUtils.formatStatValue(productsAnalytics.availableProductsCount)} subTitle='Nombre total de produits disponibles' />
          <CreateButton onClick={handleShowCreateProductForm}>Créer un produit</CreateButton>
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
                title: 'Nom',
                key: 'name',
                dataIndex: 'name',
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
                title: 'Marque',
                key: 'brand',
                dataIndex: 'brand',
                sortable: true
              },
              {
                title: 'Quantité',
                key: 'quantity',
                dataIndex: 'quantity',
                defaultValue: 0,
                sortable: true,
                styles: { width: '8%' }
              },
              {
                title: "Prix d'achat",
                key: 'unitBuyingPrice',
                dataIndex: 'unitBuyingPrice',
                dataType: 'price',
                sortable: true,
                styles: { width: '10%' }
              },
              {
                title: "Date d'expiration",
                key: 'expirationDate',
                dataIndex: 'expirationDate',
                dataType: 'date',
                defaultValue: sharedMessages.NOT_PROVIDED.FR.FEMININE,
                sortable: productViewModel.isExpirationDateColumnSortable(products)
              },
              {
                title: 'Catégorie',
                key: 'category',
                dataIndex: 'category',
                render: ({ category }) => <Text colorScheme='gray'>{productViewModel.formatCategory(category)}</Text>
              }
            ]}
            dataSource={products}
            requesting={requesting}
            noDataMessage={productMessages.NO_PRODUCT_SAVED.FR}
            actions={[
              { icon: Icons.components.Edit, label: 'Modifier', onClick: handleShowUpdateProductForm },
              { icon: Icons.components.Delete, label: 'Supprimer', onClick: handleShowDeleteProductForm }
            ]}
            searchableDataIndexes={['code', 'name', 'brand']}
            onSearch={handleSearch}
            onResetSearch={handleResetSearch}
          />
        </InnerContent.Main>
      </InnerContent>

      <Drawer title={title} shown={shown} onHide={handleHide} onSubmit={handleSubmit}>
        <ProductForm
          product={formState}
          formErrors={formErrors}
          formData={{ categoryOptions: productViewModel.formatCategoryOptions(categories), supplierOptions: productViewModel.formatSupplierOptions(suppliers) }}
          formDisabledFields={formDisabledFields}
          onChange={handleChange}
        />
      </Drawer>
    </>
  );
}

export default Products;
