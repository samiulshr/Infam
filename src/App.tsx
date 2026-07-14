/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StorefrontLayout } from './components/storefront/StorefrontLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { CartProvider } from './contexts/CartContext';

// Storefront Pages
import HomePage from './pages/storefront/HomePage';
import ShopPage from './pages/storefront/ShopPage';
import ProductPage from './pages/storefront/ProductPage';
import CartPage from './pages/storefront/CartPage';
import CheckoutPage from './pages/storefront/CheckoutPage';
import AuthPage from './pages/storefront/AuthPage';
import AccountPage from './pages/storefront/AccountPage';
import TrackOrderPage from './pages/storefront/TrackOrderPage';
import StaticPage from './pages/storefront/StaticPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminDiscounts from './pages/admin/AdminDiscounts';
import AdminReviews from './pages/admin/AdminReviews';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Storefront Routes */}
        <Route path="/" element={<StorefrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="category/:slug" element={<ShopPage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="register" element={<AuthPage />} />
          <Route path="account/*" element={<AccountPage />} />
          <Route path="track-order" element={<TrackOrderPage />} />
          <Route path="page/:slug" element={<StaticPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="discounts" element={<AdminDiscounts />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
          {/* Default fallback for other admin routes to Dashboard for now */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </Router>
    </CartProvider>
  );
}

