import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@chakra-ui/react';

import Icons from '../../../helpers/Icons';
import dimensions from '../../../../config/dimensions';

export default function CreateButton({ onClick, children }) {
  return (
    <Button
      width='100%'
      size='lg'
      minHeight={dimensions.header.height}
      fontSize='md'
      colorScheme='primary'
      leftIcon={<Icon as={Icons.components.AddBox} w={10} h={10} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
CreateButton.propTypes = {
  onClick: PropTypes.func
};
