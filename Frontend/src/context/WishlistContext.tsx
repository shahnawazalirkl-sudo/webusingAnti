"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../data/productsData';
import { safeStorage } from '../utils/safeStorage';


export interface WishlistItem {
  id?: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  categoryName?: string;
  description?: string;
  customizations?: { label: string; value: string; highlight?: boolean; colorDot?: string }[];
  savingsNote?: string;
  sku?: string;
  inStock?: boolean;
  edition?: string;
  metalHardware?: string;
  fabricShade?: string;
  savings?: number;
  badge?: string;
  isVowBookVisual?: boolean;
  isWaxSealThumbnail?: boolean;
  isTrousseauTrunkThumbnail?: boolean;
  isVelvetVaultThumbnail?: boolean;
  monogramInitials?: string;
  vaultTag?: string;
  subBadge?: string;
  editionBadge?: string;
  slug?: string;
  priceSubtitle?: string;
  unitNote?: string;
  [key: string]: unknown;
}

export interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: WishlistItem[];
  wishlistProducts: WishlistItem[];
  wishlistCount: number;
  totalWishlistValue: number;
  categoryCounts: Record<string, number>;
  isInWishlist: (id: unknown) => boolean;
  isWishlisted: (id: unknown) => boolean;
  addToWishlist: (item: unknown) => void;
  removeFromWishlist: (id: unknown) => void;
  toggleWishlist: (id: unknown) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);


export const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: 'sovereign-bridal-suite',
    slug: 'sovereign-bridal-suite',
    title: 'The Sovereign Bridal & Wedding Essentials Suite',
    editionBadge: '2026 Collection Edition',
    badge: 'Flagship Masterpiece',
    subBadge: 'Brass Die Included',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Wedding Essentials',
    price: 7499,
    originalPrice: 9800,
    savings: 2301,
    image: '/assets/cdn/img_8222cd4f9dd5.png',
    description: 'Dawn-harvested Parisian blush roses, debossed custom 3D initials brass die, and cryo-hydrated botanical extracts.',
    customizations: [
      { label: 'Initials', value: '"A & R" • Classic Crest' },
      { label: 'Palette', value: 'Classic Blush & Gold', colorDot: '#E8C5B8' },
      { label: 'Scent Note', value: 'Kashmiri Rose & Amber' }
    ]
  },
  {
    id: 'velvet-ring-vault',
    slug: 'velvet-ring-vault',
    title: 'Customized Velvet Double Ring & Mangalsutra Vault',
    editionBadge: 'Gift Vault',
    badge: 'Ceremony Heirloom',
    category: 'heirloom-vaults',
    categoryName: 'Heirloom Vaults',
    price: 1899,
    originalPrice: 2499,
    savings: 600,
    image: '/assets/cdn/img_5ca8bace4375.jpg',
    isEmeraldVaultVisual: true,
    description: 'Hand-tailored mulberry silk velvet with dual cushioned slots, hot-stamped with pure 24k gold leaf foil initials.',
    customizations: [
      { label: 'Shade', value: 'Royal Emerald Velvet', colorDot: '#133E2B' },
      { label: 'Hardware', value: 'Hand-Polished Antique Brass' },
      { label: 'Die Match', value: 'Matched to Sovereign Suite', highlight: true }
    ]
  },
  {
    id: 'deckle-vow-books',
    slug: 'deckle-vow-books',
    title: 'Deckle Edge Vow Books (Set of 2)',
    editionBadge: 'Ceremonial Paper',
    badge: 'Gold Leaf Edged',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Wedding Essentials',
    price: 1299,
    originalPrice: 1750,
    savings: 451,
    image: '/assets/cdn/img_11a57511dc47.jpg',
    isVowBookVisual: true,
    description: 'Cotton rag hand-made paper with feathered deckled edges, bound in French silk ribbons and sealed with gold leaf.',
    customizations: [
      { label: 'Pages', value: '300 GSM Archival Cotton' },
      { label: 'Binding', value: 'Champagne Silk Ribbon' },
      { label: 'Foil Stamp', value: '24k Matte Gold' }
    ]
  },
  {
    id: 'royal-destination-welcome-suite',
    slug: 'bulk-orders',
    title: 'The Royal Destination Welcome Suite',
    editionBadge: 'Destination Hospitality',
    badge: 'Destination Wedding Favors',
    category: 'guest-favors',
    categoryName: 'Guest Favors',
    price: 7199,
    unitNote: '/ unit',
    priceSubtitle: 'Support Rate',
    isHamperVisual: true,
    description: 'Curated palatial room hampers featuring artisanal confections, itinerary scrolls, and engraved brass key tags.',
    customizations: [
      { label: 'Min Units', value: '25+ Favors Tier' },
      { label: 'Palace Tagging', value: 'Complimentary Luggage Tags', highlight: true },
      { label: 'Dispatch Mode', value: 'Chilled Transit to Udaivilas' }
    ]
  }
];

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(INITIAL_WISHLIST_ITEMS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = safeStorage.getItem('asra_wishlist_items', null) as WishlistItem[] | null;
    if (saved !== null) {
      setWishlistItems(saved);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      safeStorage.setItem('asra_wishlist_items', wishlistItems);
    }
  }, [wishlistItems, isHydrated]);

  const wishlistIds = useMemo(() => wishlistItems.map(item => item.id).filter((id): id is string => Boolean(id)), [wishlistItems]);

  const isInWishlist = (productIdOrItem) => {
    if (!productIdOrItem) return false;
    const id = typeof productIdOrItem === 'object' && productIdOrItem !== null ? productIdOrItem.id : productIdOrItem;
    return wishlistIds.includes(id);
  };

  const isWishlisted = isInWishlist;

  const removeFromWishlist = (productIdOrItem) => {
    const id = typeof productIdOrItem === 'object' && productIdOrItem !== null ? productIdOrItem.id : productIdOrItem;
    if (!id) return;
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToWishlist = (productOrItem) => {
    if (!productOrItem) return;
    const id = productOrItem.id;
    if (!id || isInWishlist(id)) return;

    // If it is an item from PRODUCTS or a custom recommendation
    const fullProduct = PRODUCTS.find(p => p.id === id) || productOrItem;
    const category = fullProduct.category === 'bulk' || id === 'royal-destination-welcome-suite'
      ? 'guest-favors'
      : fullProduct.category?.includes('vault') || id.includes('vault') || id.includes('registry')
      ? 'heirloom-vaults'
      : 'bridal-trousseau';

    const newItem = {
      id: fullProduct.id,
      slug: fullProduct.slug || fullProduct.id,
      title: fullProduct.title,
      editionBadge: fullProduct.editionBadge || fullProduct.categoryLabel || 'Collection',
      badge: fullProduct.badge || 'Ceremony Heirloom',
      subBadge: fullProduct.subBadge || null,
      category: category,
      categoryName: category === 'guest-favors' ? 'Guest Favors' : category === 'heirloom-vaults' ? 'Heirloom Vaults' : 'Bridal Wedding Essentials',
      price: fullProduct.price || 2499,
      originalPrice: fullProduct.originalPrice || Math.round((fullProduct.price || 2499) * 1.3),
      savings: (fullProduct.originalPrice || Math.round((fullProduct.price || 2499) * 1.3)) - (fullProduct.price || 2499),
      image: fullProduct.image || '',
      description: fullProduct.shortDescription || fullProduct.description || 'Artisanal ceremonial gift created by ASRA Collection.',
      customizations: fullProduct.customizations || [
        { label: 'Initials', value: '"A & R" • Initials Match' },
        { label: 'Craft', value: fullProduct.craft || 'Artisanal Gold Leaf' }
      ]
    };

    setWishlistItems(prev => [newItem, ...prev]);
  };

  const toggleWishlist = (productIdOrItem) => {
    const id = typeof productIdOrItem === 'object' && productIdOrItem !== null ? productIdOrItem.id : productIdOrItem;
    if (!id) return;

    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(productIdOrItem);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const totalWishlistValue = useMemo(() => {
    return wishlistItems.reduce((acc, item) => acc + (item.price || 0), 0);
  }, [wishlistItems]);

  const categoryCounts = useMemo(() => {
    return {
      all: wishlistItems.length,
      'bridal-trousseau': wishlistItems.filter(item => item.category === 'bridal-trousseau').length,
      'heirloom-vaults': wishlistItems.filter(item => item.category === 'heirloom-vaults').length,
      'guest-favors': wishlistItems.filter(item => item.category === 'guest-favors').length
    };
  }, [wishlistItems]);

  // Backward compatibility alias for unknown component expecting wishlistProducts
  const wishlistProducts = wishlistItems;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistProducts,
        wishlistCount: wishlistItems.length,
        totalWishlistValue,
        categoryCounts,
        isInWishlist,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => { const ctx = useContext(WishlistContext); if (!ctx) throw new Error("no ctx"); return ctx; };
