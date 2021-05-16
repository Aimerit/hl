import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex, Button } from '@chakra-ui/react';

import { childrenPropType } from '../../utils/default-prop-types';

import Form from './Form';

function AppDrawer({ title, shown, children, onHide, onSubmit }) {
  return (
    <Drawer isOpen={shown} placement='right' onClose={onHide} size='md'>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>
            <Form noValidate onSubmit={onSubmit}>
              {children}

              <Flex justifyContent='flex-end' marginY={8}>
                <Button type='button' variant='ghost' mr={3} onClick={onHide}>
                  Annuler
                </Button>
                <Button colorScheme='primary' type='submit'>
                  Enregistrer
                </Button>
              </Flex>
            </Form>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  title: PropTypes.string.isRequired,
  shown: PropTypes.bool.isRequired,
  children: childrenPropType.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AppDrawer;
