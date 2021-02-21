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

  return {
    formState,
    formErrors,
    setFormErrors,
    handleChange,
    handleSubmit
  };
}
