"use client";
import Image from "next/image";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useCart } from '../../context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

const CartDrawer = () => {
  const router = useRouter();
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cartItems,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingProgress
  } = useCart() as NonNullable<ReturnType<typeof useCart>>;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useRouter();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <Sheet open={isCartDrawerOpen} onOpenChange={(open) => { if (!open) closeCartDrawer(); }}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col justify-between border-l border-outline-variant/60 bg-surface-container-lowest shadow-2xl h-full"
      >
        {/* Header */}
        <SheetHeader className="p-5 border-b border-outline-variant/40 flex flex-row items-center justify-between space-y-0 pr-12">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
            <SheetTitle className="font-serif text-lg font-semibold text-on-surface">
              Collection Shopping Bag
            </SheetTitle>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
              {cartItems.length}
            </span>
          </div>
          <SheetDescription className="sr-only">
            Review your customized wedding heirlooms and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        {/* Free Shipping Progress */}
        <div className="bg-secondary-container/20 px-5 py-3 border-b border-secondary-container/40">
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
            <span className="text-on-surface">
              {subtotal >= freeShippingThreshold
                ? '✨ You have unlocked Complimentary Express Delivery!'
                : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more for Complimentary Delivery`}
            </span>
            <span className="font-bold text-primary">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-outline text-5xl mb-2">shopping_basket</span>
              <p className="font-serif text-base text-on-surface font-semibold">Your shopping bag is empty</p>
              <p className="text-xs text-outline mt-1 mb-5">Explore our customized wedding gifts to begin.</p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  router.push('/shop');
                }}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/50 flex gap-3 relative"
              >
                {item.isVelvetVaultThumbnail ? (
                  <div className="w-20 h-24 bg-[#1A3328] text-[#E8DCB9] rounded-lg shrink-0 border border-outline-variant/40 flex flex-col items-center justify-center text-center p-1">
                    <span className="font-serif text-sm font-bold">{item.monogramInitials || 'A & R'}</span>
                    <span className="text-[8px] uppercase tracking-wider opacity-80">Velvet Vault</span>
                  </div>
                ) : (
                  <Image
                    src={item.image || '/assets/cdn/img_8222cd4f9dd5.png'}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded-lg shrink-0 border border-outline-variant/40" fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-xs font-semibold text-on-surface line-clamp-1">
                        {item.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-outline hover:text-rose-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <span className="text-[11px] text-primary font-medium block">
                      {item.edition}
                    </span>

                    {/* Custom Monogram Badge */}
                    {item.brideName && item.groomName && (
                      <div className="mt-1 inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/40 text-[10px] text-on-surface-variant">
                        <span className="font-semibold text-primary">{item.brideName} &amp; {item.groomName}</span>
                        {item.weddingDate && (
                          <>
                            <span>•</span>
                            <span>{item.weddingDate}</span>
                          </>
                        )}
                      </div>
                    )}
                    {item.scentChoice && (
                      <div className="text-[10px] text-on-surface-variant/80 mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-primary">spa</span>
                        <span>{item.scentChoice}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-outline-variant/60 rounded bg-surface-container-lowest">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="px-2 py-0.5 text-xs text-outline hover:text-on-surface"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="px-2 py-0.5 text-xs text-outline hover:text-on-surface"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-xs font-bold text-on-surface">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon Input & Summary Section */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-surface-container-low border-t border-outline-variant/50 space-y-3">
            {/* Active or New Coupon */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-secondary-container/30 rounded-lg border border-secondary-container">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                  <span className="font-mono font-bold text-primary">{appliedCoupon.code}</span>
                  <span className="text-on-surface-variant text-[11px]">applied</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[11px] text-rose-700 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter privilege code (e.g. ASRAFIRST)"
                  className="flex-1 bg-surface-container-lowest px-3 py-2 rounded-lg border border-outline-variant/60 text-xs font-mono uppercase focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-on-surface text-surface rounded-lg text-xs font-semibold uppercase hover:bg-primary transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}

            {/* Price Calculation */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-outline-variant/40">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-emerald font-medium">
                  <span>Privilege Savings</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Insured White-Glove Dispatch</span>
                <span>{shipping === 0 ? <span className="text-brand-emerald font-semibold uppercase text-[11px]">Complimentary</span> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-on-surface pt-1 border-t border-outline-variant/40">
                <span className="font-serif">Total Collection Investment</span>
                <span className="font-serif text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  router.push('/checkout');
                }}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-on-primary rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>Proceed to Customized Checkout</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  router.push('/cart');
                }}
                className="w-full py-2 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface rounded-lg text-xs font-semibold border border-outline-variant/60 transition-colors"
              >
                View Full Cart &amp; Customization Proof
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
