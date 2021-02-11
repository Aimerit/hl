import React from 'react';

import GreetingContainer, { GreetingBody, GreetingFooter, GreetingTitle, GreetingSubTitle } from './helpers/GreetingContainer';

function Greeting() {
  return (
    <GreetingContainer>
      <GreetingBody>
        <GreetingTitle>
          Bienvenue sur la plateforme d{"'"}administration de l{"'"} hôtel résidence les grâces
        </GreetingTitle>
        <GreetingSubTitle>
          L{"'"}accès à cette page est uniquement réservé aux comptes administrateurs. Si vous n{"'"}en disposez pas d{"'"}un, veuillez demander un
          accès au superviseur à l{"'"}adresse superviseur@hotelresidencelesgraces.com
        </GreetingSubTitle>
      </GreetingBody>

      <GreetingFooter>Copyright &copy; 2021 Hôtel Résidence les Grâces, Tous droits réservés.</GreetingFooter>
    </GreetingContainer>
  );
}

export default Greeting;
