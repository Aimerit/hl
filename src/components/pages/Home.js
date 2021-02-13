import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { v1 as uuidV1 } from 'uuid';

import stockManagementIcon from '../../assets/images/stock-management.svg';
import staffMemberManagementIcon from '../../assets/images/staff-member-management.svg';

import Module from '../core/home/Module';

const dataSet = [
  {
    key: uuidV1(),
    variant: 'secondary',
    icon: stockManagementIcon,
    title: 'Gestion des stocks',
    description: 'Gérer vos produits, fournisseurs et diverses catégories',
    to: '/stock-management'
  },
  {
    key: uuidV1(),
    variant: 'primary',
    icon: staffMemberManagementIcon,
    title: 'Gestion du personnel',
    description: 'Gérer les différents membres de votre équipe; créer, activer et désactiver des comptes pour vos agents',
    to: '/staff-member-management'
  }
];

function Home() {
  function handleModuleClick() {}

  return (
    <SimpleGrid columns={4} spacing={10} padding={10}>
      {dataSet.map(({ key, variant, ...module }) => (
        <Module key={key} variant={variant} module={module} onModuleClick={handleModuleClick} />
      ))}
    </SimpleGrid>
  );
}

export default Home;
