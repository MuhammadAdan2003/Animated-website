import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';

import RootLayout from './layouts/RootLayout.jsx';
import HomePage from './pages/Home.jsx';
import ProductPage from './pages/Product.jsx';
import SolutionsPage from './pages/Solutions.jsx';
import CustomersPage from './pages/Customers.jsx';
import PricingPage from './pages/Pricing.jsx';
import AboutPage from './pages/About.jsx';
import JournalPage from './pages/Journal.jsx';
import ContactPage from './pages/Contact.jsx';
import NotFoundPage from './pages/NotFound.jsx';

// 1. Define Root Route with Master Layout & 404 Fallback
const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

// 2. Define Dedicated Routes for Every Page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: ProductPage,
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions',
  component: SolutionsPage,
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customers',
  component: CustomersPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/journal',
  component: JournalPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

// 3. Assemble Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  solutionsRoute,
  customersRoute,
  pricingRoute,
  aboutRoute,
  journalRoute,
  contactRoute,
]);

// 4. Create and Export TanStack Router Instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

export default router;

