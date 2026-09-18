import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { toast } from 'sonner';

const AccountWishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <Card className="max-w-xl mx-auto p-8 sm:p-10 text-center space-y-4 border-dashed border-outline-variant/60">
        <div className="w-14 h-14 rounded-full bg-surface-container-high border border-primary/30 flex items-center justify-center mx-auto text-primary">
          <span className="material-symbols-outlined text-2xl">favorite</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-serif font-bold text-on-surface">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm mx-auto">
            Browse our bespoke collections to preserve keepsakes, trunk chests, and guest welcome sets.
          </p>
        </div>
        <div className="pt-2">
          <Button asChild className="gap-2">
            <Link to="/shop">
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Discover Collections</span>
            </Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-on-surface">
            Saved Treasures & Wishlist
          </h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Bridal suites and ceremony essentials curated for your celebration.
          </p>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1 text-xs text-primary">
          <Link to="/wishlist">
            <span>Open Full Wishlist Suite</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden flex flex-col justify-between hover:border-primary/40 transition-all group"
          >
            <div>
              <div className="h-48 bg-surface-container-low relative overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-3xl">shopping_bag</span>
                  </div>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    removeFromWishlist(item.id);
                    toast.info('Item removed from wishlist');
                  }}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs text-outline hover:text-error shadow-sm"
                  title="Remove from wishlist"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </Button>
              </div>

              <div className="p-4 space-y-2">
                <Badge variant="gold" className="text-[10px] uppercase font-bold tracking-widest py-0 px-2">
                  {item.categoryName || 'Bridal Keepsake'}
                </Badge>
                <h4 className="font-serif font-bold text-sm text-on-surface line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-1 flex items-baseline gap-2">
                  <span className="font-serif font-bold text-base text-on-surface">
                    ₹{item.price?.toLocaleString('en-IN')}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-outline line-through">
                      ₹{item.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                onClick={() => {
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: 1
                  });
                  removeFromWishlist(item.id);
                  toast.success('Moved item to your shopping bag');
                }}
                className="w-full gap-2"
                size="sm"
              >
                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                <span>Move to Bag</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountWishlist;
