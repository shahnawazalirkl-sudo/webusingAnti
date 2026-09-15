import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/productsData';

const WishlistContext = createContext();

export const INITIAL_WISHLIST_ITEMS = [
  {
    id: 'sovereign-bridal-suite',
    slug: 'sovereign-bridal-suite',
    title: 'The Sovereign Bridal & Trousseau Suite',
    editionBadge: '2026 Atelier Edition',
    badge: 'Flagship Masterpiece',
    subBadge: 'Brass Die Included',
    category: 'bridal-trousseau',
    categoryName: 'Bridal Trousseau',
    price: 7499,
    originalPrice: 9800,
    savings: 2301,
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1WWF5xvSFhZfraQNuZ5QJPkPkwOA7moevDQMXbk6g5GfhQjfg2Z83P-u6zYCC1yMFsxUjfoBWemmareJbeeghnEjxPCCk8pU17Sp5a4j5ZUtKFR3Mb8kBYNW_VepfRLyIG4QLzjwzT5HUgJlvRaNv386XaXDH3zn3Rp2kRX9TFbJIZ9uC8cdio9LJ4Iza1YgNb1vCk3YwY3PGfkJ8oLQahxRtWzdx5ToPRumfXGiwW7-rRqwpKhA2pAZGhJmH6ePGDmvWpp0TJucIM',
    description: 'Dawn-harvested Parisian blush roses, debossed custom 3D monogram brass die, and cryo-hydrated botanical extracts.',
    customizations: [
      { label: 'Monogram', value: '"A & R" • Heritage Crest' },
      { label: 'Palette', value: 'Classic Blush & Gold', colorDot: '#E8C5B8' },
      { label: 'Scent Note', value: 'Kashmiri Rose & Amber' }
    ]
  },
  {
    id: 'velvet-ring-vault',
    slug: 'velvet-ring-vault',
    title: 'Bespoke Velvet Double Ring & Mangalsutra Vault',
    editionBadge: 'Keepsake Vault',
    badge: 'Ceremony Heirloom',
    category: 'heirloom-vaults',
    categoryName: 'Heirloom Vaults',
    price: 1899,
    originalPrice: 2499,
    savings: 600,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQa2Wn_1HDtkmWKUSagqcqbwx0Z52r-WVpnZw4e9vktMxRlDL8HrH_ZNP_UwjEUk2Bsy9K1KZS1pe8__kqAZ1F8I7mwTo-H9P_8Dy-sf6vynsWayUGUD6PGhMaOGAi8CQCNFGOgGW3ip1aUqYaNQ0_fmJKS7ceNSW9_XEFrWb8CXtsUKRH2uTSFAYKMkCPbEMwgrT_1voyQF9AhPFsmZfNiEhrEWnbS_zF-aAWjykOn3hGmNI9nNTBNg',
    isEmeraldVaultVisual: true,
    description: 'Hand-tailored mulberry silk velvet with dual cushioned slots, hot-stamped with pure 24k gold leaf foil monogram.',
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
    categoryName: 'Bridal Trousseau',
    price: 1299,
    originalPrice: 1750,
    savings: 451,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWXIZrXYuYJm45DRWcFkOWlOTDQ0hJYgaj9KnM1VtA7Q6UD7zH_N9LxDpvDXrCEDEyVGqLNGeIo3adq69iHsyP0MtB0WvXy5AQGgicu5MLJd60FAPd0eg1vCJ-5Ue1vm79MP87sgnWSZdyw1KZd7NOjB3dnAb2RiTqXJ5Sg1dJvOCV6wuTmrZ1iM05cWgS_U0K1PM7mYhRXqBfz376zB-He9z9dijJaZJ17jO33sOhxvRxPk0te4E5GQ',
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
    priceSubtitle: 'Concierge Rate',
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
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST_ITEMS);

  const wishlistIds = useMemo(() => wishlistItems.map(item => item.id), [wishlistItems]);

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
      editionBadge: fullProduct.editionBadge || fullProduct.categoryLabel || 'Atelier Collection',
      badge: fullProduct.badge || 'Ceremony Heirloom',
      subBadge: fullProduct.subBadge || null,
      category: category,
      categoryName: category === 'guest-favors' ? 'Guest Favors' : category === 'heirloom-vaults' ? 'Heirloom Vaults' : 'Bridal Trousseau',
      price: fullProduct.price || 2499,
      originalPrice: fullProduct.originalPrice || Math.round((fullProduct.price || 2499) * 1.3),
      savings: (fullProduct.originalPrice || Math.round((fullProduct.price || 2499) * 1.3)) - (fullProduct.price || 2499),
      image: fullProduct.image || '',
      description: fullProduct.shortDescription || fullProduct.description || 'Artisanal ceremonial keepsake created by ASRA Atelier.',
      customizations: fullProduct.customizations || [
        { label: 'Monogram', value: '"A & R" • Monogram Match' },
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

  // Backward compatibility alias for any component expecting wishlistProducts
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

export const useWishlist = () => useContext(WishlistContext);
