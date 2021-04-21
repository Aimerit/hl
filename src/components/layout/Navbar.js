import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import authActions from '../../store/actions/auth';
import dialogActions from '../../store/actions/ui/dialog';

import { NotificationContext } from '../providers/Notification';
import Logo from '../helpers/Logo';
import NavbarContainer from './helpers/NavbarContainer';
import NavbarUser from './helpers/NavbarUser';
import NavbarInnerContainer from './helpers/NavbarInnerContainer';
import NavbarTitle from './helpers/NavbarTitle';

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const notification = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authState);

  function handleSignOut() {
    dispatch(
      dialogActions.showConfirmationDialog({
        title: 'Déconnexion',
        message: 'Vous êtes sur le point de terminer votre session, confirmez-vous cette action ?',
        onConfirm: () => {
          dispatch(authActions.signOut({ history, notification }));
        }
      })
    );
  }

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <Logo size='small' />
        <NavbarTitle>Espace d&apos;administration</NavbarTitle>
      </NavbarInnerContainer>
      <NavbarUser user={user} onSignOut={handleSignOut} />
    </NavbarContainer>
  );
}

export default Navbar;
