import React from 'react';

import Logo from '../helpers/Logo';
import NavbarContainer from './helpers/NavbarContainer';

function Navbar() {
  return (
    <NavbarContainer>
      <Logo size='small' />
    </NavbarContainer>
  );
}

export default Navbar;
