import { useState, useCallback } from 'react';

export default function (onSubmit) {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [formDisabledFields, setFormDisabledFields] = useState([]);

  const handleChange = useCallback(({ name, value }) => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [name]: value
    }));
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(evt);
  }

  function updateFormState(formStateUpdates = {}) {
    const clonedStateUpdates = { ...formStateUpdates };
    const fieldsToDelete = ['id', 'created', 'updated', 'deleted', 'deletedAt'];
    fieldsToDelete.forEach((field) => delete clonedStateUpdates[field]);
    setFormState((currentFormState) => ({ ...currentFormState, ...clonedStateUpdates }));
  }

  function resetFormState() {
    setFormState({});
    setFormErrors({});
  }

  return {
    formState,
    formErrors,
    formDisabledFields,
    setFormErrors,
    setFormDisabledFields,
    handleChange,
    handleSubmit,
    updateFormState,
    resetFormState
  };
}
