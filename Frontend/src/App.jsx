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

  // Pages with their own dedicated minimal header or Cart bar (No Global Header/Footer)
  const minimalRoutes = [
    '/cart',
    '/checkout',
    '/order-confirmation',
    '/track-order',
    '/return-policy',
    '/privacy-policy',
    '/privacy',
    '/terms-of-service',
    '/terms',
    '/charter',
    '/atelier-charter',
    '/wishlist',
    '/faq',
    '/faqs',
    '/help-desk',
    '/help'
  ];
  const isMinimalPage = minimalRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      <ScrollToTop />
      
      {/* Editorial Header (Hidden on minimal checkout & tracking pages) */}
      {!isMinimalPage && <Header />}

      {/* Main Content Area */}
      <main className={`flex-grow w-full ${!isMinimalPage ? 'pt-[148px]' : ''}`}>
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
        </Routes>
      </main>

      {/* Editorial Footer (Hidden on minimal checkout & tracking pages) */}
      {!isMinimalPage && <Footer />}

      {/* Global Slide-Over Cart Drawer & Floating Toast Notifications */}
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default App;
