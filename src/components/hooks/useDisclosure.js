import { useState } from 'react';

export default function ({ initialTitle = '' }) {
  const [shown, setShown] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  function handleShow() {
    setShown(true);
  }

  function handleHide() {
    setShown(false);
  }

  return {
    shown,
    title,
    setTitle,
    handleShow,
    handleHide
  };
}
