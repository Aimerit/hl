import React from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Button
} from '@chakra-ui/react';

export default function Dialog({ shown = false, title, message, confirmColorScheme, onClose, onConfirm }) {
  const confirmButtonRef = React.useRef();

  function handleConfirm() {
    onClose();
    onConfirm();
  }

  return (
    <AlertDialog leastDestructiveRef={confirmButtonRef} onClose={onClose} isOpen={shown}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button variant='ghost' onClick={onClose}>
              Annuler
            </Button>
            <Button colorScheme={confirmColorScheme} ml={3} ref={confirmButtonRef} onClick={handleConfirm}>
              Confirmer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

Dialog.propTypes = {
  shown: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmColorScheme: PropTypes.oneOf(['red', 'primary', 'gray']),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
};
