import React from 'react';

import Logo from '../helpers/Logo';
import NavbarContainer from './helpers/NavbarContainer';
import NavbarUser from './helpers/NavbarUser';

function Navbar() {
  return (
    <NavbarContainer>
      <Logo size='small' />
      <NavbarUser></NavbarUser>
    </NavbarContainer>
  );
}

export default Navbar;
