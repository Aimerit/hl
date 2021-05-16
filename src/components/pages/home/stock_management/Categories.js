import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import categoryActions from '../../../../store/actions/categories';
import dialogActions from '../../../../store/actions/ui/dialog';
import categoryViewModel from '../../../../utils/view_models/category';
import { categoryFormTitles } from '../../../../utils/form-titles';
import formValidation from '../../../../utils/form_validation';
import { categoryFormFields } from '../../../../utils/form_fields';
import { dialogVariants } from '../../../../utils/enums';
import { isDeeplyEqual } from '../../../../utils';
import { categoryMessages } from '../../../../utils/messages';
import entitiesUtils from '../../../../utils/entities';

import { NotificationContext } from '../../../providers/Notification';
import Table from '../../../helpers/Table';
import Icons from '../../../helpers/Icons';
import Drawer from '../../../helpers/Drawer';
import { Text, StatCard, InnerContent } from '../../../library';
import CreateButton from '../../../core/home/helpers/CreateButton';
import CategoryForm from '../../../core/home/stock_management/categories/CategoryForm';
import useDisclosure from '../../../hooks/useDisclosure';
import useForm from '../../../hooks/useForm';

function Categories() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { categories, allCategories, categoriesAnalytics, requesting } = useSelector((state) => state.categoriesState);
  const { shown, title, setTitle, handleShow, handleHide } = useDisclosure({ initialTitle: categoryFormTitles.CREATE });
  const { formState, formErrors, formDisabledFields, setFormErrors, setFormDisabledFields, handleChange, handleSubmit, updateFormState, resetFormState } = useForm(handleSaveCategory);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    dispatch(categoryActions.getCategories());
    dispatch(categoryActions.getCategoriesAnalytics());
  }, [dispatch]);

  function handleShowCreateCategoryForm() {
    resetFormState();
    setSelectedCategory({});
    setFormDisabledFields([]);
    setTitle(categoryFormTitles.CREATE);
    handleShow();
  }

  function handleShowUpdateCategoryForm(category) {
    resetFormState();
    setSelectedCategory(category);
    updateFormState(category);
    setFormDisabledFields([]);
    setTitle(categoryFormTitles.UPDATE);
    handleShow();
  }

  function handleShowCreateSubCategoryForm(category) {
    resetFormState();
    setSelectedCategory({});
    updateFormState({ parent: category });
    setFormDisabledFields([...formDisabledFields, 'parent']);
    setTitle(categoryFormTitles.CREATE_SUB_CATEGORY);
    handleShow();
  }

  function handleShowDeleteCategoryForm(category) {
    dispatch(
      dialogActions.showConfirmationDialog({
        variant: dialogVariants.DELETE,
        title: 'Confirmation',
        message: `Confirmez-vous la suppression de la catégorie <${category.name}> ?`,
        onConfirm: () => deleteCategory(category)
      })
    );
  }

  function handleSaveCategory() {
    return {
      [categoryFormTitles.CREATE]: createCategory,
      [categoryFormTitles.UPDATE]: updateCategory,
      [categoryFormTitles.CREATE_SUB_CATEGORY]: createCategory
    }[title]();
  }

  function createCategory() {
    const validationResult = formValidation.validateForm(formState, categoryFormFields);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm) {
      const { formattedFormState } = categoryViewModel.formatFormState(formState);
      dispatch(categoryActions.createCategory({ categoryData: formattedFormState, notification, onSuccess: handleHide }));
    }
  }

  function updateCategory() {
    const { formattedFormState, options } = categoryViewModel.formatFormState(formState);
    const validationResult = formValidation.validateForm(formattedFormState, categoryFormFields);
    setFormErrors(validationResult.formErrors);
    if (validationResult.validForm && !isDeeplyEqual(formattedFormState, selectedCategory, ['subCategoriesCount'])) {
      dispatch(
        categoryActions.updateCategory({ categoryId: selectedCategory.id, categoryData: formattedFormState, categoryOriginalData: selectedCategory, options, notification, onSuccess: handleHide })
      );
    }
  }

  function deleteCategory(category) {
    dispatch(categoryActions.deleteCategory({ categoryId: category.id, notification }));
  }

  function handleSearch({ searchString }) {
    dispatch(categoryActions.searchCategories({ searchData: { searchString } }));
  }

  function handleResetSearch() {
    dispatch(categoryActions.getCategories());
  }

  return (
    <>
      <InnerContent>
        <InnerContent.Header>
          <StatCard title={entitiesUtils.formatStatValue(categoriesAnalytics.categoriesCount)} subTitle='Nombre total de catégories' />
          <StatCard title={entitiesUtils.formatStatValue(categoriesAnalytics.usedCategoriesCount)} subTitle='Nombre total de catégories utilisées' />
          <CreateButton onClick={handleShowCreateCategoryForm}>Créer une catégorie</CreateButton>
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
                title: 'Catégorie parent',
                key: 'parent',
                dataIndex: 'parent',
                render: ({ parent }) => <Text colorScheme='gray'>{categoryViewModel.formatParent(parent)}</Text>
              },
              {
                title: 'Nombre de sous-catégories',
                key: 'subCategoriesCount',
                dataIndex: 'subCategoriesCount',
                styles: { width: 'calc(100% / 7)' },
                render: ({ subCategoriesCount }) => (
                  <Text colorScheme='primary' weight={500}>
                    {subCategoriesCount}
                  </Text>
                )
              },
              {
                title: 'Nombre de produits',
                key: 'productsCount',
                dataIndex: 'productsCount',
                styles: { width: 'calc(100% / 7)' },
                render: ({ productsCount }) => (
                  <Text colorScheme='primary' weight={500}>
                    {productsCount}
                  </Text>
                )
              }
            ]}
            dataSource={categories}
            requesting={requesting}
            noDataMessage={categoryMessages.NO_CATEGORY_SAVED.FR}
            actions={[
              { icon: Icons.components.Add, label: 'Créer une sous-catégorie', onClick: handleShowCreateSubCategoryForm },
              { icon: Icons.components.Edit, label: 'Modifier', onClick: handleShowUpdateCategoryForm },
              { icon: Icons.components.Delete, label: 'Supprimer', onClick: handleShowDeleteCategoryForm, isDeletable: categoryViewModel.isCategoryDeletable }
            ]}
            searchableDataIndexes={['code', 'name']}
            onSearch={handleSearch}
            onResetSearch={handleResetSearch}
          />
        </InnerContent.Main>
      </InnerContent>

      <Drawer title={title} shown={shown} onHide={handleHide} onSubmit={handleSubmit}>
        <CategoryForm
          category={formState}
          formErrors={formErrors}
          formData={{ parentOptions: categoryViewModel.formatParentOptions(allCategories, selectedCategory) }}
          formDisabledFields={formDisabledFields}
          onChange={handleChange}
        />
      </Drawer>
    </>
  );
}

export default Categories;
