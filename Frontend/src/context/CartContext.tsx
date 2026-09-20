"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { COUPONS } from '../data/productsData';
import { safeStorage } from '../utils/safeStorage';

export interface CartItem {
  id: string;
  cartId: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  title?: string;
  isVelvetVaultThumbnail?: boolean;
  monogramInitials?: string;
  image?: string;
  edition?: string;
  colorDot?: string;
  badge?: string;
  subtitle?: string;
  crestStyle?: string;
  monogramDie?: string;
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  dispatchTimeline?: string;
  footerNote?: string;
  fabricShade?: string;
  metalHardware?: string;
  vaultTag?: string;
  scentChoice?: string;
  cardInscription?: string;
  savingsNote?: string;
  sku?: string;
  calligraphyScript?: string;
  [key: string]: unknown;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  minOrder: number;
  maxDiscount?: number;
  discountAmount?: number;
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Record<string, unknown>, customOptions?: any) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  updateCustomizations: (cartId: string, fields: Record<string, unknown>) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  originalTotal: number;
  subtotal: number;
  catalogueSavings: number;
  discountAmount: number;
  shipping: number;
  total: number;
  totalSavings: number;
  loyaltyPoints: number;
  gstIncluded: number;
  itemCount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isCartDrawerOpen: boolean;
  openCart: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  setIsCartDrawerOpen: (val: boolean) => void;
  showToast: (message: string) => void;
}
const CartContext = createContext<CartContextType | null>(null);

export const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    cartId: 'item-sovereign-1',
    id: 'sovereign-bridal-suite',
    sku: 'ASRA-SOV-019',
    title: 'The Sovereign Bridal & Wedding Essentials Suite',
    subtitle: '2026 BRIDAL EDITION • SKU: ASRA-SOV-019',
    badge: 'Flagship Masterpiece',
    price: 7499,
    originalPrice: 9800,
    quantity: 1,
    image: '/assets/cdn/img_8222cd4f9dd5.png',
    edition: 'Classic Blush & Champagne Gold',
    colorDot: '#E8C2B3',
    brideName: 'Asra Ansari',
    groomName: 'Sk Shahnawaz Ali',
    weddingDate: '18th November 2026',
    crestStyle: 'Classic Floral Crest',
    monogramDie: '"A & S" • Classic Floral Crest',
    cardInscription: '"Beautiful People Make Beautiful Memories"',
    calligraphyScript: 'Royal Copperplate Script',
    scentChoice: 'Kashmiri Rose (French Amber Base)',
    savingsNote: 'You Saved ₹2,301 (24% Collection Privilege)',
    footerNote: 'Includes 24k Gold Calligraphy Card & Climate-Controlled Packaging',
    dispatchTimeline: 'Within 48 Hours'
  },
  {
    cartId: 'item-vault-2',
    id: 'velvet-ring-vault',
    sku: 'ASRA-VLT-044',
    title: 'Customized Velvet Double Ring & Mangalsutra Vault',
    subtitle: 'Gift Vault • SKU: ASRA-VLT-044',
    badge: 'Gift Add-on',
    price: 1899,
    originalPrice: 2499,
    quantity: 1,
    isVelvetVaultThumbnail: true,
    monogramInitials: 'A & S',
    vaultTag: 'Emerald Velvet Vault',
    fabricShade: 'Royal Emerald Silk Velvet',
    metalHardware: 'Hand-Polished Antique Brass Latch',
    monogramDie: 'Matching A&S Couple Die',
    savingsNote: 'Saved ₹600 with Ensemble Bundle',
    footerNote: 'Matched to Suite Initials at No Extra Charge',
    dispatchTimeline: 'Shipped together with Masterpiece Suite'
  }
];

// Default coupon as configured in Stitch design (10% extra off)
export const DEFAULT_COUPON: Coupon = {
  code: 'ASRAFIRST',
  title: '10% Extra Welcome Off',
  discountPercent: 10,
  minOrder: 1499,
  description: "Code 'ASRAFIRST' Applied: 10% Extra Welcome Off"
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(DEFAULT_COUPON);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedItems = safeStorage.getItem('asra_cart_items', null) as CartItem[] | null;
    if (savedItems !== null) {
      setCartItems(savedItems);
    }
    const savedCoupon = safeStorage.getItem('asra_applied_coupon', null) as Coupon | null;
    if (savedCoupon !== null) {
      setAppliedCoupon(savedCoupon);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      safeStorage.setItem('asra_cart_items', cartItems);
    }
  }, [cartItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    if (appliedCoupon) {
      safeStorage.setItem('asra_applied_coupon', appliedCoupon);
    } else {
      safeStorage.removeItem('asra_applied_coupon');
    }
  }, [appliedCoupon, isHydrated]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const showToast = (message) => {
    toast(message);
  };

  const addToCart = (product, customOptions: Record<string, unknown> = {}) => {
    setCartItems(prev => {
      const customKeys = Object.keys(customOptions).filter(k => k !== 'quantity');
      const isCustomized = customKeys.length > 0;
      
      let cartId = `item-${product.id}`;
      if (isCustomized) {
        const sortedOptions = [...customKeys].sort().map(k => `${k}:${JSON.stringify(customOptions[k])}`).join('|');
        const hash = sortedOptions.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
        cartId = `${cartId}-${Math.abs(hash)}`;
      }

      const existingItemIndex = prev.findIndex(item => item.cartId === cartId);

      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + Number(customOptions.quantity || 1)
        };
        setTimeout(() => showToast(`Updated "${product.title}" quantity in cart`), 0);
        return newItems;
      }

      const newItem = {
        cartId,
        id: product.id,
        sku: product.sku || `ASRA-${(product.id || 'BESPOKE').toUpperCase().slice(0, 6)}`,
        title: product.title,
        subtitle: product.categoryLabel ? `${product.categoryLabel} • Customized Gift` : 'Customized Gift',
        badge: product.badge || 'Collection Selection',
        price: Number(customOptions.price || product.price),
        originalPrice: Number(customOptions.originalPrice || product.originalPrice || Math.round((Number(customOptions.price) || Number(product.price)) * 1.3)),
        quantity: Number(customOptions.quantity || 1),
        image: customOptions.image || product.image || '',
        ...customOptions
      } as unknown as CartItem;

      setTimeout(() => showToast(`Added "${product.title}" to Collection Cart`), 0);
      return [...prev, newItem];
    });
  };

  const removeFromCart = (cartId) => {
    const item = cartItems.find(i => i.cartId === cartId);
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
    if (item) {
      showToast(`Removed "${item.title}" from your cart`);
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
      setAppliedCoupon(DEFAULT_COUPON);
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
        setIsCartDrawerOpen,
        openCart: () => setIsCartDrawerOpen(true),
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => { const ctx = useContext(CartContext); if (!ctx) return {} as CartContextType; return ctx as CartContextType; };
