import loadable from '@loadable/component';
import { v1 as uuidV1 } from 'uuid';

const LoginPage = loadable(() => import('./components/pages/Login'));
const MainLayout = loadable(() => import('./components/layout/Main'));

export const publicRoutes = [
  { key: uuidV1(), path: '/login', component: LoginPage },
  { key: uuidV1(), path: '/', component: MainLayout }
];
