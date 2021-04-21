import { useState, useCallback } from 'react';

export default function (onSubmit) {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});

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
    delete clonedStateUpdates.id;
    delete clonedStateUpdates.createdAt;
    delete clonedStateUpdates.updatedAt;
    delete clonedStateUpdates.deleted;
    setFormState((currentFormState) => ({ ...currentFormState, ...clonedStateUpdates }));
  }

  function resetFormState() {
    setFormState({});
    setFormErrors({});
  }

  return {
    formState,
    formErrors,
    setFormErrors,
    handleChange,
    handleSubmit,
    updateFormState,
    resetFormState
  };
}
