import React from 'react';
import { useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';
import { v1 as uuidV1 } from 'uuid';

import stockManagementIcon from '../../assets/images/stock-management.svg';
import staffMemberManagementIcon from '../../assets/images/staff-member-management.svg';
import homePageViewModel from '../../utils/view_models/home-page';

import Module from '../core/home/Module';

const dataSet = [
  {
    key: uuidV1(),
    variant: 'secondary',
    icon: stockManagementIcon,
    title: 'Gestion des stocks',
    description: 'Gérer vos produits, fournisseurs et diverses catégories',
    url: '/home/stock-management'
  },
  {
    key: uuidV1(),
    variant: 'primary',
    icon: staffMemberManagementIcon,
    title: 'Gestion du personnel',
    description: 'Gérer les différents membres de votre équipe; créer, activer et désactiver des comptes pour vos agents',
    url: '/home/staff-member-management'
  }
];

function Home() {
  homePageViewModel.init({ history: useHistory() });

  return (
    <SimpleGrid columns={4} spacing={10} padding={10}>
      {dataSet.map(({ key, variant, ...module }) => (
        <Module key={key} variant={variant} module={module} onModuleClick={(data) => homePageViewModel.handleModuleClick(data)} />
      ))}
    </SimpleGrid>
  );
}

export default Home;
