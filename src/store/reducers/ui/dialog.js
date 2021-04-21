import { SHOW_CONFIRMATION_DIALOG, HIDE_DIALOG } from '../../types/ui/dialog';
import { dialogTypes } from '../../../utils/enums';

function initState() {
  return {
    shown: false
  };
}

export default function (state = initState(), action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_CONFIRMATION_DIALOG:
      return {
        shown: true,
        type: dialogTypes.CONFIRMATION,
        variant: payload.variant,
        title: payload.title,
        message: payload.message,
        onConfirm: payload.onConfirm
      };

    case HIDE_DIALOG:
      return initState();

    default:
      return state;
  }
}
