"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface OrderItem {
  id: string;
  name?: string;
  title?: string;
  quantity?: number;
  price?: number;
  cartId?: string;
  image?: string;
  edition?: string;
  monogramDie?: string;
}

interface Order {
  orderId: string;
  grandTotal: number;
  createdAt: string;
  arrivalDate?: string;
  status: string;
  paymentMethod?: string;
  items: OrderItem[];
  recipientName?: string;
  venueName?: string;
  city?: string;
}

interface AccountOrderProps {
  orders?: Order[];
  defaultProfile?: Record<string, unknown>;
}

const AccountOrders = ({ orders = [], defaultProfile }: AccountOrderProps) => {
  const navigate = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!orders || orders.length === 0) {
    return (
      <Card className="max-w-xl mx-auto p-8 sm:p-10 text-center space-y-4 border-dashed border-outline-variant/60">
        <div className="w-14 h-14 rounded-full bg-surface-container-high border border-primary/30 flex items-center justify-center mx-auto text-primary">
          <span className="material-symbols-outlined text-2xl">package_2</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-serif font-bold text-on-surface">
            No Commissions Placed Yet
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-md mx-auto">
            When you commission a custom bridal trunk, ring vault, or royal guest favors, your real-time tracking details and updates will display here.
          </p>
        </div>
        <div className="pt-2">
          <Button asChild className="gap-2">
            <Link href="/shop">
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Explore Bridal Masterpieces</span>
            </Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
          Showing {orders.length} {orders.length === 1 ? 'Registered Order' : 'Registered Orders'}
        </span>
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-primary">
          <Link href="/track-order">
            <span>Live Telemetry GPS Tracking</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((ord, idx) => {
          const total = typeof ord.grandTotal === 'number'
            ? `₹${ord.grandTotal.toLocaleString('en-IN')}`
            : (ord.grandTotal || '₹7,499');
          const orderDate = ord.createdAt
            ? new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : (ord.arrivalDate || 'Recent Commission');
          const items = Array.isArray(ord.items) && ord.items.length > 0 ? ord.items : [];
          const isExpanded = selectedOrder === (ord.orderId || idx);

          return (
            <Card
              key={ord.orderId || idx}
              className="p-5 sm:p-6 transition-all hover:border-primary/40 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-outline-variant/30 gap-3">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-xl">package_2</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-on-surface">
                        Docket #{ord.orderId}
                      </h3>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold py-0.5 px-2 bg-emerald-500/10 text-emerald-700 border-emerald-500/30">
                        {ord.status || 'Active Commission'}
                      </Badge>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Placed on {orderDate} · Payment: <span className="text-emerald-700 font-semibold">{ord.paymentMethod === 'cod' ? 'Pay on Delivery' : 'Authorized & Confirmed'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => navigate.push(`/track-order?docket=${encodeURIComponent(ord.orderId)}`)}
                    className="gap-1.5"
                  >
                    <span>Track Consignment</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(isExpanded ? null : (ord.orderId || String(idx)))}
                  >
                    {isExpanded ? 'Hide Items' : 'View Items'}
                  </Button>
                </div>
              </div>

              {/* Order Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/30 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-outline block font-medium">Recipient</span>
                  <span className="font-semibold text-on-surface truncate block">{ord.recipientName || (defaultProfile?.fullName as string)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-outline block font-medium">Delivery Target</span>
                  <span className="font-semibold text-on-surface">{ord.arrivalDate || 'Scheduled for Ceremony'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-outline block font-medium">Destination</span>
                  <span className="font-semibold text-on-surface truncate block">{ord.venueName || ord.city || 'Udaipur, Rajasthan'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-outline block font-medium">Grand Total</span>
                  <span className="font-bold text-primary font-serif text-sm">{total}</span>
                </div>
              </div>

              {/* Expandable Items List */}
              {isExpanded && (
                <div className="pt-2 space-y-3">
                  <Separator />
                  {items.length > 0 ? (
                    items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 py-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded bg-surface-container-high border border-outline-variant/40 overflow-hidden shrink-0 flex items-center justify-center">
                            {item.image ? (
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-outline">shopping_bag</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-serif font-semibold text-sm text-on-surface">{item.title}</h4>
                            <p className="text-xs text-on-surface-variant">
                              Qty: {item.quantity || 1} {item.edition ? `· ${item.edition}` : ''} {item.monogramDie ? `· Crest: ${item.monogramDie}` : ''}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-bold text-sm text-on-surface">
                            {item.price ? `₹${item.price.toLocaleString('en-IN')}` : '₹7,499'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-on-surface-variant italic py-2">
                      Customized bridal heirloom ensemble details recorded under master commission vault.
                    </p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AccountOrders;
