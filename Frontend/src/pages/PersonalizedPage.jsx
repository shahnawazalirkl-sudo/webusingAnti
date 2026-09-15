import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { PRODUCTS } from '../data/productsData';

const PersonalizedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [craftFilter, setCraftFilter] = useState(searchParams.get('craft') || 'all');
  const [recipientFilter, setRecipientFilter] = useState(searchParams.get('recipient') || 'all');

  useEffect(() => {
    setCraftFilter(searchParams.get('craft') || 'all');
    setRecipientFilter(searchParams.get('recipient') || 'all');
  }, [searchParams]);

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
    <div className="w-full pt-8 pb-20 px-4 sm:px-8 max-w-[1360px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
          Individual Artisanship
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-on-surface font-normal">
          Personalized Keepsakes
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
          Every monogram is individually rendered and debossed using real bronze metallurgy stamping dies for heirloom depth.
        </p>
      </div>

      {/* How It Works Banner */}
      <div className="bg-secondary-container/20 rounded-2xl p-6 sm:p-8 border border-secondary-container/50 mb-12">
        <div className="text-center max-w-lg mx-auto mb-6">
          <span className="text-[10px] text-primary uppercase font-bold tracking-wider block mb-1">
            Artisan Precision Standard
          </span>
          <h2 className="font-serif text-xl font-semibold text-on-surface">How Bespoke Personalization Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-on-surface-variant">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif font-bold flex items-center justify-center mb-3">1</span>
            <h4 className="font-serif text-sm font-semibold text-on-surface mb-1">Digital 3D CAD Proof</h4>
            <p className="leading-relaxed">Within 6 hours of your order, our calligraphy team sends high-resolution typography proofs via WhatsApp.</p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif font-bold flex items-center justify-center mb-3">2</span>
            <h4 className="font-serif text-sm font-semibold text-on-surface mb-1">Solid Bronze Die Metallurgy</h4>
            <p className="leading-relaxed">We machine heavy brass plates heated to 140°C to permanently imprint your initials into full-grain leather and velvet.</p>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif font-bold flex items-center justify-center mb-3">3</span>
            <h4 className="font-serif text-sm font-semibold text-on-surface mb-1">Sealed Atelier Certificate</h4>
            <p className="leading-relaxed">Each finished creation is hand-checked for foil crispness and sealed with hot bronze wax before insured venue dispatch.</p>
          </div>
        </div>
      </div>

      {/* Craft & Recipient Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-outline-variant/40">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-outline uppercase text-[10px] font-bold">Craft:</span>
          {[
            { id: 'all', label: 'All Techniques' },
            { id: 'monogram', label: 'Monogrammed' },
            { id: 'velvet', label: 'Velvet & Silk' },
            { id: 'wax', label: 'Wax & Deckle' },
            { id: 'botanical', label: 'Preserved Florals' },
            { id: 'gold', label: 'Gold Foil' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCraftFilter(c.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                craftFilter === c.id ? 'bg-primary text-on-primary font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-outline uppercase text-[10px] font-bold">Recipient:</span>
          <select
            value={recipientFilter}
            onChange={(e) => setRecipientFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/60 text-xs text-on-surface focus:outline-none"
          >
            <option value="all">All Recipients</option>
            <option value="bride">Bride & Bridesmaids</option>
            <option value="groom">Groom & Groomsmen</option>
            <option value="couple">Couple & Anniversary</option>
            <option value="parents">Parents of the Couple</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedPage;
