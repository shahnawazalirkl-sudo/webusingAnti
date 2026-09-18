import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product, aspectRatio = 'square', className = '' }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const productUrl = `/product/${product.slug || product.id}`;

  const handleQuickAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className={`group relative flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs hover:shadow-md border-outline-variant/30 hover:border-primary/40 transition-all duration-300 ${className}`}>
      {/* Media Container */}
      <div className={`relative w-full ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden bg-surface-container-low`}>
        <Link to={productUrl} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.badge && (
            <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-label-sm text-[10px] font-bold tracking-wider uppercase shadow-xs">
              {product.badge}
            </span>
          )}
          {(product.deliveryBadge || product.secondaryBadge) && (
            <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-on-surface px-2 py-0.5 rounded font-label-sm text-[9px] tracking-wider uppercase shadow-xs">
              {product.deliveryBadge || product.secondaryBadge}
            </span>
          )}
        </div>

        {/* Wishlist CTA Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface hover:text-rose-600 flex items-center justify-center transition-all shadow-xs z-10"
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-colors ${
              isLiked ? 'text-rose-600' : 'text-outline hover:text-rose-600'
            }`}
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Hover Quick Action Slide-up */}
        <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-10">
          <button
            onClick={handleQuickAction}
            className="flex-1 py-2 rounded-lg bg-inverse-surface text-inverse-on-surface font-label-md text-label-md hover:bg-primary transition-colors text-center shadow-md flex items-center justify-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">draw</span>
            <span>Personalize Now</span>
          </button>
        </div>
      </div>

      {/* Content Details - Compact Height */}
      <CardContent className="p-3 flex flex-col flex-1 justify-between gap-1">
        <div className="flex flex-col gap-0.5">
          <span className="font-label-sm text-[9px] text-primary tracking-[0.2em] uppercase font-semibold">
            {product.techniqueTag || product.categoryLabel || 'Collection'}
          </span>
          <Link to={productUrl}>
            <h3 className="font-headline-sm text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex text-amber-700">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-title-sm text-[11px] font-semibold text-on-surface">
              {product.rating || '4.9'}
            </span>
            <span className="font-body-sm text-[10px] text-outline">
              ({product.reviewCount || 98})
            </span>
          </div>
        </div>

        {/* Price & Forward Link */}
        <div className="flex items-baseline justify-between pt-1 border-t border-outline-variant/20 mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-body-sm text-[10px] text-outline line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent && (
              <span className="font-label-sm text-[9px] text-secondary font-bold bg-secondary-container/40 px-1 py-0.2 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <Link
            to={productUrl}
            className="text-outline hover:text-primary transition-colors"
            aria-label={`View details for ${product.title}`}
          >
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
