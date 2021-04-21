import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@chakra-ui/react';

import Icons from '../../../helpers/Icons';

export default function CreateButton({ onClick, children }) {
  return (
    <Button
      size='lg'
      minHeight='20'
      fontSize='md'
      colorScheme='primary'
      leftIcon={<Icon as={Icons.components.AddBox} w={8} h={8} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
CreateButton.propTypes = {
  onClick: PropTypes.func
};
