import React from 'react';
import { useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';
import { v1 as uuidV1 } from 'uuid';

import Icons from '../helpers/Icons';
import Module from '../core/home/helpers/Module';

const dataSet = [
  {
    key: uuidV1(),
    variant: 'primary',
    icon: Icons.stockManagementIcon,
    title: 'Gestion des stocks',
    description: 'Gérer vos produits, fournisseurs et diverses catégories',
    url: '/home/stock-management'
  },
  {
    key: uuidV1(),
    variant: 'primary',
    icon: Icons.staffMemberManagementIcon,
    title: 'Gestion du personnel',
    description: 'Gérer les différents membres de votre équipe; créer, activer et désactiver des comptes pour vos agents',
    url: '/home/staff-member-management'
  }
];

function Home() {
  const history = useHistory();

  function handleModuleClick({ url }) {
    history.push(url);
  }

  return (
    <SimpleGrid columns={4} spacing={10} padding={10}>
      {dataSet.map(({ key, variant, ...moduleItem }) => (
        <Module key={key} variant={variant} module={moduleItem} onModuleClick={handleModuleClick} />
      ))}
    </SimpleGrid>
  );
}

export default Home;
