import loadable from '@loadable/component';
import { v1 as uuidV1 } from 'uuid';

const LoginPage = loadable(() => import('./components/pages/Login'));
const MainLayout = loadable(() => import('./components/layout/Main'));
const HomePage = loadable(() => import('./components/pages/Home'));
const StockManagementPage = loadable(() => import('./components/pages/home/StockManagement'));
const SuppliersPage = loadable(() => import('./components/pages/home/stock_management/Suppliers'));
const CategoriesPage = loadable(() => import('./components/pages/home/stock_management/Categories'));
const ProductsPage = loadable(() => import('./components/pages/home/stock_management/Products'));

export const publicRoutes = [
  { key: uuidV1(), path: '/login', component: LoginPage },
  { key: uuidV1(), path: '/', component: MainLayout }
];

export const privateRoutes = [
  { key: uuidV1(), path: '/home', extactPath: true, component: HomePage },
  { key: uuidV1(), path: '/home/stock-management', extactPath: true, component: StockManagementPage },
  { key: uuidV1(), path: '/home/stock-management/suppliers', component: SuppliersPage },
  { key: uuidV1(), path: '/home/stock-management/categories', component: CategoriesPage },
  { key: uuidV1(), path: '/home/stock-management/products', component: ProductsPage }
];
