import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import dialogActions from '../../store/actions/ui/dialog';
import { dialogTypes, dialogVariants } from '../../utils/enums';

import Dialog from './Dialog';

export default function ConfirmationDialog() {
  const dispatch = useDispatch();
  const { shown, type, variant, title, message, onConfirm } = useSelector((state) => state.ui.dialogState);

  function handleClose() {
    dispatch(dialogActions.hideDialog());
  }

  return (
    <Dialog
      shown={shown && type === dialogTypes.CONFIRMATION}
      title={title}
      message={message}
      confirmColorScheme={getConfirmColorScheme(variant)}
      onClose={handleClose}
      onConfirm={onConfirm}
    />
  );
}

function getConfirmColorScheme(variant) {
  return { [dialogVariants.INFO]: 'gray', [dialogVariants.DELETE]: 'red' }[variant] || 'gray';
}
