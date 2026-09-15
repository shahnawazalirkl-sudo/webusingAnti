import React, { createContext, useContext, useState } from 'react';
import { COUPONS } from '../data/productsData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      cartId: 'item-sovereign-1',
      id: 'sovereign-bridal-suite',
      sku: 'ASRA-SOV-019',
      title: 'The Sovereign Bridal & Trousseau Suite',
      subtitle: '2026 BRIDAL EDITION • SKU: ASRA-SOV-019',
      badge: 'Flagship Masterpiece',
      price: 7499,
      originalPrice: 9800,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1WWF5xvSFhZfraQNuZ5QJPkPkwOA7moevDQMXbk6g5GfhQjfg2Z83P-u6zYCC1yMFsxUjfoBWemmareJbeeghnEjxPCCk8pU17Sp5a4j5ZUtKFR3Mb8kBYNW_VepfRLyIG4QLzjwzT5HUgJlvRaNv386XaXDH3zn3Rp2kRX9TFbJIZ9uC8cdio9LJ4Iza1YgNb1vCk3YwY3PGfkJ8oLQahxRtWzdx5ToPRumfXGiwW7-rRqwpKhA2pAZGhJmH6ePGDmvWpp0TJucIM',
      edition: 'Classic Blush & Champagne Gold',
      colorDot: '#E8C2B3',
      brideName: 'Aadhya Singhania',
      groomName: 'Rohan Varma',
      weddingDate: '18th November 2026',
      crestStyle: 'Heritage Floral Crest',
      monogramDie: '"A & R" • Heritage Floral Crest',
      cardInscription: '"Beautiful People Make Beautiful Memories"',
      calligraphyScript: 'Royal Copperplate Script',
      scentChoice: 'Kashmiri Rose (French Amber Base)',
      savingsNote: 'You Saved ₹2,301 (24% Atelier Privilege)',
      footerNote: 'Includes 24k Gold Calligraphy Card & Climate-Controlled Packaging',
      dispatchTimeline: 'Within 48 Hours'
    },
    {
      cartId: 'item-vault-2',
      id: 'velvet-ring-vault',
      sku: 'ASRA-VLT-044',
      title: 'Bespoke Velvet Double Ring & Mangalsutra Vault',
      subtitle: 'Keepsake Vault • SKU: ASRA-VLT-044',
      badge: 'Keepsake Add-on',
      price: 1899,
      originalPrice: 2499,
      quantity: 1,
      isVelvetVaultThumbnail: true,
      monogramInitials: 'A & R',
      vaultTag: 'Emerald Velvet Vault',
      fabricShade: 'Royal Emerald Silk Velvet',
      metalHardware: 'Hand-Polished Antique Brass Latch',
      monogramDie: 'Matching A&R Couple Die',
      savingsNote: 'Saved ₹600 with Ensemble Bundle',
      footerNote: 'Matched to Suite Monogram at No Extra Charge',
      dispatchTimeline: 'Dispatched together with Masterpiece Suite'
    }
  ]);

  // Default coupon as configured in Stitch design (10% extra off)
  const defaultCoupon = {
    code: 'ASRAFIRST',
    title: '10% Extra Welcome Off',
    discountPercent: 10,
    minOrder: 1499,
    description: "Code 'ASRAFIRST' Applied: 10% Extra Welcome Off"
  };

  const [appliedCoupon, setAppliedCoupon] = useState(defaultCoupon);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, customOptions = {}) => {
    const newItem = {
      cartId: `item-${product.id}-${Date.now()}`,
      id: product.id,
      sku: product.sku || `ASRA-${(product.id || 'BESPOKE').toUpperCase().slice(0, 6)}`,
      title: product.title,
      subtitle: product.categoryLabel ? `${product.categoryLabel} • Bespoke Keepsake` : 'Bespoke Keepsake',
      badge: product.badge || 'Atelier Selection',
      price: customOptions.price || product.price,
      originalPrice: customOptions.originalPrice || product.originalPrice || Math.round((customOptions.price || product.price) * 1.3),
      quantity: customOptions.quantity || 1,
      image: customOptions.image || product.image || '',
      edition: customOptions.edition || 'Signature Atelier Edition',
      colorDot: customOptions.colorDot || '#C5A880',
      brideName: customOptions.brideName || '',
      groomName: customOptions.groomName || '',
      weddingDate: customOptions.weddingDate || '',
      crestStyle: customOptions.crestStyle || 'Heritage Floral Crest',
      monogramDie: customOptions.monogramDie || (customOptions.brideName ? `"${customOptions.brideName[0]} & ${customOptions.groomName?.[0] || 'R'}" Monogram Die` : ''),
      cardInscription: customOptions.cardInscription || '',
      calligraphyScript: customOptions.calligraphyScript || '',
      scentChoice: customOptions.scentChoice || '',
      fabricShade: customOptions.fabricShade || '',
      metalHardware: customOptions.metalHardware || '',
      footerNote: customOptions.footerNote || 'Artisanal White-Glove Transit Guaranteed',
      dispatchTimeline: customOptions.dispatchTimeline || 'Within 48-72 Hours'
    };

    setCartItems(prev => [...prev, newItem]);
    showToast(`Added "${product.title}" to Atelier Keepsake Bag`);
  };

  const removeFromCart = (cartId) => {
    const item = cartItems.find(i => i.cartId === cartId);
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
    if (item) {
      showToast(`Removed "${item.title}" from your bag`);
    }
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const updateCustomizations = (cartId, fields) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.cartId === cartId) {
          return { ...item, ...fields };
        }
        return item;
      })
    );
    showToast('Customizations updated successfully');
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ASRAFIRST') {
      setAppliedCoupon(defaultCoupon);
      showToast(`Privilege code "ASRAFIRST" applied!`);
      return { success: true, message: 'Applied ASRAFIRST' };
    }

    const found = COUPONS.find(c => c.code.toUpperCase() === cleanCode);
    if (found) {
      setAppliedCoupon(found);
      showToast(`Privilege code "${found.code}" applied!`);
      return { success: true, message: `Applied ${found.code}` };
    }
    return { success: false, message: 'Invalid or expired privilege coupon code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Privilege coupon removed.');
  };

  // Calculations
  const originalTotal = cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const catalogueSavings = Math.max(0, originalTotal - subtotal);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= (appliedCoupon.minOrder || 0)) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      if (appliedCoupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.discountAmount) {
      discountAmount = Math.min(appliedCoupon.discountAmount, subtotal);
    }
  }

  const shipping = subtotal >= 2499 || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const totalSavings = catalogueSavings + discountAmount;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const loyaltyPoints = Math.round(total * 0.1);
  const gstIncluded = Math.round((total * 18) / 118);

  const freeShippingThreshold = 2499;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCustomizations,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        originalTotal,
        subtotal,
        catalogueSavings,
        discountAmount,
        shipping,
        total,
        totalSavings,
        loyaltyPoints,
        gstIncluded,
        itemCount,
        freeShippingThreshold,
        freeShippingProgress,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
