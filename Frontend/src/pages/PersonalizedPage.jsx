import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { PRODUCTS } from '../data/productsData';

const PersonalizedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [craftFilter, setCraftFilter] = useState(searchParams.get('craft') || 'all');
  const [recipientFilter, setRecipientFilter] = useState(searchParams.get('recipient') || 'all');
  const productSectionRef = useRef(null);

  useEffect(() => {
    const c = searchParams.get('craft') || 'all';
    const r = searchParams.get('recipient') || 'all';
    setCraftFilter(c);
    setRecipientFilter(r);

    // If navigated with a filter or #products anchor, directly scroll to the product section
    const hasFilterOrAnchor = c !== 'all' || r !== 'all' || location.hash === '#products';
    if (hasFilterOrAnchor && productSectionRef.current) {
      setTimeout(() => {
        if (productSectionRef.current) {
          const headerOffset = 110;
          const elementPosition = productSectionRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 60);
    }
  }, [searchParams, location.hash]);

  const filtered = PRODUCTS.filter((p) => {
    if (craftFilter !== 'all') {
      const searchSpace = `${p.craft || ''} ${p.title || ''} ${p.description || ''} ${p.categoryLabel || ''} ${p.badge || ''}`.toLowerCase();
      if (!searchSpace.includes(craftFilter.toLowerCase())) {
        return false;
      }
    }
    if (recipientFilter !== 'all') {
      const searchRecipient = `${p.recipient || ''} ${p.title || ''} ${p.categoryLabel || ''} ${p.badge || ''}`.toLowerCase();
      if (!searchRecipient.includes(recipientFilter.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="w-full bg-surface text-on-surface antialiased py-8 sm:py-10 lg:py-12">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-2">
            Individual Artisanship
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] tracking-tight text-on-surface">
            Personalized Gifts
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed mt-2.5">
            Every monogram is individually rendered and debossed using real bronze metallurgy stamping dies for heirloom depth.
          </p>
        </div>

        {/* How It Works Banner */}
        <div className="bg-[#FAF4EB] rounded-xl p-5 sm:p-7 border border-primary/20 mb-10 sm:mb-12 shadow-xs">
          <div className="text-center max-w-lg mx-auto mb-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-primary block mb-1.5">
              Artisan Precision Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              How Bespoke Personalization Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 text-xs text-on-surface-variant">
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center mb-3 shadow-xs">
                1
              </span>
              <h4 className="font-serif text-base font-medium leading-snug text-on-surface mb-1">
                Digital 3D CAD Proof
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Within 6 hours of your order, our calligraphy team sends high-resolution typography proofs via WhatsApp.
              </p>
            </div>

            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center mb-3 shadow-xs">
                2
              </span>
              <h4 className="font-serif text-base font-medium leading-snug text-on-surface mb-1">
                Solid Bronze Die Metallurgy
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                We machine heavy brass plates heated to 140°C to permanently imprint your monogram into full-grain leather and velvet.
              </p>
            </div>

            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif text-xs font-semibold flex items-center justify-center mb-3 shadow-xs">
                3
              </span>
              <h4 className="font-serif text-base font-medium leading-snug text-on-surface mb-1">
                Sealed Collection Certificate
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Each finished creation is hand-checked for foil crispness and sealed with hot bronze wax before insured venue dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Craft & Recipient Filters */}
        <div
          id="products"
          ref={productSectionRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 mb-8 border-b border-outline-variant/30 scroll-mt-28"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline">
              Craft:
            </span>
            {[
              { id: 'all', label: 'All Techniques' },
              { id: 'monogram', label: 'Monogram' },
              { id: 'velvet', label: 'Velvet & Silk' },
              { id: 'wax', label: 'Wax & Deckle' },
              { id: 'botanical', label: 'Preserved Florals' },
              { id: 'gold', label: 'Gold Foil' }
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCraftFilter(c.id);
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    if (c.id === 'all') next.delete('craft');
                    else next.set('craft', c.id);
                    return next;
                  });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  craftFilter === c.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-[#FAF4EB] border border-primary/20 text-on-surface hover:border-primary hover:text-primary'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-outline">
              Recipient:
            </span>
            <select
              value={recipientFilter}
              onChange={(e) => {
                const val = e.target.value;
                setRecipientFilter(val);
                setSearchParams((prev) => {
                  const next = new URLSearchParams(prev);
                  if (val === 'all') next.delete('recipient');
                  else next.set('recipient', val);
                  return next;
                });
              }}
              className="bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-semibold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors cursor-pointer shadow-xs"
            >
              <option value="all">All Recipients</option>
              <option value="bride">Bride &amp; Bridesmaids</option>
              <option value="groom">Groom &amp; Groomsmen</option>
              <option value="couple">Couple &amp; Anniversary</option>
              <option value="parents">Parents of the Couple</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} aspectRatio="portrait" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedPage;
