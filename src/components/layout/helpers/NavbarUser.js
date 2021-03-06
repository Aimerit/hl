import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../../config/colors';
import { staffMemberPropType } from '../../../utils/default-prop-types';
import accountViewModel from '../../../utils/view_models/account';

import { HStack, VStack, Avatar, Text, Menu, Icon, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import Icons from '../../helpers/Icons';
import IconContainer from '../../helpers/IconContainer';

function NavbarUser({ user = {}, onSignOut }) {
  return (
    <HStack cursor='pointer'>
      <Avatar size='md' rounded='full' src='https://bit.ly/broken-link' alt='Fluffybuns the destroyer' />
      <VStack alignItems='flex-start' spacing={0}>
        <Text fontSize='md' fontWeight={500}>
          {accountViewModel.getFullName(user)}
        </Text>
        <Text fontSize='sm' color={colors.gray}>
          {accountViewModel.getUsername(user)}
        </Text>
      </VStack>
      <Menu>
        <MenuButton as={IconButton} icon={<Icon as={Icons.components.ArrowKeyboardDown} />} variant='ghost' />
        <MenuList>
          <MenuItem fontSize='md' fontWeight={500} icon={<IconContainer icon={Icons.components.Logout} />} onClick={onSignOut}>
            Déconnexion
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}

NavbarUser.propTypes = {
  user: staffMemberPropType,
  onSignOut: PropTypes.func.isRequired
};

export default NavbarUser;
