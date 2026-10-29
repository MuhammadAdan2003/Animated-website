/**
 * Backward compatibility barrel re-export.
 * Individual page components now reside in dedicated files:
 * - Product.jsx
 * - Solutions.jsx
 * - Customers.jsx
 * - Pricing.jsx
 * - About.jsx
 * - Journal.jsx
 * - Contact.jsx
 */
export { default as ProductPage, PRODUCT_CAPABILITIES } from './Product.jsx';
export { default as SolutionsPage } from './Solutions.jsx';
export { default as CustomersPage, CASES } from './Customers.jsx';
export { default as PricingPage } from './Pricing.jsx';
export { default as AboutPage } from './About.jsx';
export { default as JournalPage, POSTS } from './Journal.jsx';
export { default as ContactPage } from './Contact.jsx';
export { default as NotFoundPage } from './NotFound.jsx';
