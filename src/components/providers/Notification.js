import React, { createContext } from 'react';
import { useToast } from '@chakra-ui/react';

import { childrenPropType } from '../../utils/default-prop-types';

const NotificationContext = createContext();
const notificationSettings = {
  position: 'top',
  duration: 5000,
  closable: true,
  statuses: {
    SUCCESS: 'success',
    INFO: 'info',
    ERROR: 'error'
  }
};

export default function Notification({ children }) {
  const toast = useToast();

  function showToast(status, title, description) {
    toast({
      position: notificationSettings.position,
      title,
      description,
      status,
      duration: notificationSettings.duration,
      isClosable: notificationSettings.closable
    });
  }

  function showSuccessNotification({ title, message }) {
    showToast(notificationSettings.statuses.SUCCESS, title, message);
  }

  function showInfoNotification({ title, message }) {
    showToast(notificationSettings.statuses.INFO, title, message);
  }

  function showErrorNotification({ title, message }) {
    showToast(notificationSettings.statuses.ERROR, title, message);
  }

  return (
    <NotificationContext.Provider value={{ showSuccessNotification, showInfoNotification, showErrorNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

Notification.propTypes = {
  children: childrenPropType.isRequired
};
