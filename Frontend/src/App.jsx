import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/common/CartDrawer';
import Toast from './components/common/Toast';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionsPage from './pages/CollectionsPage';
import WeddingKeepsakesPage from './pages/WeddingKeepsakesPage';
import PersonalizedPage from './pages/PersonalizedPage';
import BulkOrdersPage from './pages/BulkOrdersPage';
import BespokePage from './pages/BespokePage';
import OffersPage from './pages/OffersPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import WishlistPage from './pages/WishlistPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import ClientPortalPage from './pages/ClientPortalPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top helper on route transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const location = useLocation();

  // Standard editorial routes requiring the full editorial Header & Footer with pt-[148px]
  const editorialRoutes = [
    '/',
    '/shop',
    '/collections',
    '/wedding-keepsakes',
    '/personalized',
    '/bulk-orders',
    '/bespoke',
    '/your-idea-we-create',
    '/custom-atelier',
    '/offers',
    '/about',
    '/about-us',
    '/heritage',
    '/contact',
    '/contact-us',
    '/appointments',
    '/salons',
    '/concierge'
  ];

  const isEditorialPage =
    editorialRoutes.includes(location.pathname) || location.pathname.startsWith('/product/');
  const isMinimalPage = !isEditorialPage;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <ScrollToTop />
      
      {/* Editorial Header (Hidden on minimal checkout & tracking pages) */}
      {!isMinimalPage && <Header />}

      {/* Content Area - Editorial pages use main with top padding; Minimal pages provide their own landmarks */}
      {!isMinimalPage ? (
        <main className="flex-grow w-full pt-[148px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/wedding-keepsakes" element={<WeddingKeepsakesPage />} />
            <Route path="/personalized" element={<PersonalizedPage />} />
            <Route path="/bulk-orders" element={<BulkOrdersPage />} />
            <Route path="/bespoke" element={<BespokePage />} />
            <Route path="/your-idea-we-create" element={<BespokePage />} />
            <Route path="/custom-atelier" element={<BespokePage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/charter" element={<TermsOfServicePage />} />
            <Route path="/atelier-charter" element={<TermsOfServicePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/heritage" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/appointments" element={<ContactPage />} />
            <Route path="/salons" element={<ContactPage />} />
            <Route path="/concierge" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/help-desk" element={<FaqPage />} />
            <Route path="/help" element={<FaqPage />} />
            <Route path="/client-portal" element={<ClientPortalPage />} />
            <Route path="/portal" element={<ClientPortalPage />} />
            <Route path="/account" element={<ClientPortalPage />} />
            <Route path="/sanctuary" element={<ClientPortalPage />} />
            <Route path="/client-sanctuary" element={<ClientPortalPage />} />
            <Route path="/sovereign-vault" element={<ClientPortalPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      ) : (
        <div className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/wedding-keepsakes" element={<WeddingKeepsakesPage />} />
            <Route path="/personalized" element={<PersonalizedPage />} />
            <Route path="/bulk-orders" element={<BulkOrdersPage />} />
            <Route path="/bespoke" element={<BespokePage />} />
            <Route path="/your-idea-we-create" element={<BespokePage />} />
            <Route path="/custom-atelier" element={<BespokePage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/charter" element={<TermsOfServicePage />} />
            <Route path="/atelier-charter" element={<TermsOfServicePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/heritage" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/appointments" element={<ContactPage />} />
            <Route path="/salons" element={<ContactPage />} />
            <Route path="/concierge" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/help-desk" element={<FaqPage />} />
            <Route path="/help" element={<FaqPage />} />
            <Route path="/client-portal" element={<ClientPortalPage />} />
            <Route path="/portal" element={<ClientPortalPage />} />
            <Route path="/account" element={<ClientPortalPage />} />
            <Route path="/sanctuary" element={<ClientPortalPage />} />
            <Route path="/client-sanctuary" element={<ClientPortalPage />} />
            <Route path="/sovereign-vault" element={<ClientPortalPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      )}

      {/* Editorial Footer (Hidden on minimal checkout & tracking pages) */}
      {!isMinimalPage && <Footer />}

      {/* Global Slide-Over Cart Drawer & Floating Toast Notifications */}
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default App;
