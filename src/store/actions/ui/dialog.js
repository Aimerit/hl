import { SHOW_CONFIRMATION_DIALOG, HIDE_DIALOG } from '../../types/ui/dialog';
import { dialogVariants } from '../../../utils/enums';

function showConfirmationDialog({ variant = dialogVariants.INFO, title, message, onConfirm }) {
  return {
    type: SHOW_CONFIRMATION_DIALOG,
    payload: { variant, title, message, onConfirm }
  };
}

function hideDialog() {
  return { type: HIDE_DIALOG };
}

export default { showConfirmationDialog, hideDialog };
