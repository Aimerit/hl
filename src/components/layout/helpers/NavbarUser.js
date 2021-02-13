import React from 'react';

import colors from '../../../config/colors';

import { HStack, VStack, Avatar, Text, Menu, Icon, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';

function NavbarUser() {
  return (
    <HStack cursor='pointer'>
      <Avatar size='md' rounded='full' src='https://bit.ly/broken-link' alt='Fluffybuns the destroyer' />
      <VStack alignItems='flex-start' spacing={0}>
        <Text fontSize='md' fontWeight={500}>
          Damien Dieudonne
        </Text>
        <Text fontSize='sm' color={colors.gray}>
          damien.dieudonne
        </Text>
      </VStack>
      <Menu>
        <MenuButton as={IconButton} icon={<Icon as={MdKeyboardArrowDown} />} variant='ghost' />
        <MenuList>
          <MenuItem fontSize='md' fontWeight={600} icon={<Icon as={BiLogOut} w={6} h={6} color={colors.black} />}>
            Déconnexion
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}

export default NavbarUser;
