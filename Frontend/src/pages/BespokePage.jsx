import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BespokeConfigurator from '@/components/bespoke/BespokeConfigurator';
import BespokeLiveSummary from '@/components/bespoke/BespokeLiveSummary';
import BespokeShowcaseGallery from '@/components/bespoke/BespokeShowcaseGallery';
import BespokeFaq from '@/components/bespoke/BespokeFaq';

const BespokePage = () => {
  const { showToast } = useCart();
  const formRef = useRef(null);

  // Form State
  const [category, setCategory] = useState('wedding essentials');
  const [materials, setMaterials] = useState(['24k_gold', 'plantation_teak', 'mulberry_silk']);
  const [techniques, setTechniques] = useState(['laser', 'deboss', '3d_crest']);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [conceptDetails, setConceptDetails] = useState('');
  const [budget, setBudget] = useState('5k-10k');
  const [weddingDate, setWeddingDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrefill = (catVal, materialsArr, budgetVal, note) => {
    if (catVal) setCategory(catVal);
    if (materialsArr) setMaterials(materialsArr);
    if (budgetVal) setBudget(budgetVal);
    if (note) setConceptDetails(note);
    scrollToForm();
    if (showToast) {
      showToast(`Configured studio request for "${note || catVal}"`);
    }
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!fullName || !phone) {
      if (showToast) showToast('Please enter your full name and phone number');
      return;
    }
    setSubmitted(true);
    if (showToast) {
      showToast('Customized brief received! Our chief designer will message you on WhatsApp within 2 hours.');
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">
      {/* 1. Hero Header */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-8 border-b border-outline-variant/30">
          <div className="max-w-2xl">
            <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2.5">
              Customized Commission Studio
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight text-on-surface mb-3">
              Your Idea → We Create
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Turn your visionary wedding dreams, bespoke gift concepts, or one-of-a-kind couple heirloom ideas into
              masterfully handcrafted reality. From initial 3D sketch to wax-sealed delivery.
            </p>
          </div>

          {/* Hero Metrics Bar */}
          <div className="flex items-center gap-3 sm:gap-4 bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/30 shadow-xs shrink-0 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-3 px-3 py-1 border-r border-outline-variant/30">
              <span className="font-serif text-2xl font-bold text-primary">500+</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                Customized Concepts<br />
                <span className="font-semibold text-on-surface">Realized</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-1 border-r border-outline-variant/30">
              <span className="font-serif text-2xl font-bold text-primary">1-on-1</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                Master Artisan<br />
                <span className="font-semibold text-on-surface">Collaboration</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-1">
              <span className="font-serif text-2xl font-bold text-primary">48h</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                3D Digital Mockup<br />
                <span className="font-semibold text-on-surface">Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Timeline */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2">
            Collection Craft Journey
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            How Your Idea Becomes Reality
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            Our transparent four-step artisan process guarantees peerless attention to detail.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            {
              step: '01',
              title: 'Share Your Vision',
              desc: 'Upload reference moodboards, Pinterest sketches, photos, or describe your concept in our studio configuration form.'
            },
            {
              step: '02',
              title: 'Digital Render & Samples',
              desc: 'Receive a photorealistic 3D render, custom font styles, and physical material swatches like teakwood, leather, or silk.'
            },
            {
              step: '03',
              title: 'Artisanal Handcrafting',
              desc: 'Master calligraphers, laser engravers, and leather crafters bring the piece to life in our state-of-the-art atelier.'
            },
            {
              step: '04',
              title: 'Wax-Sealed Delivery',
              desc: 'Insured white-glove packaging with complimentary wax seal unboxing delivered straight to your doorstep or venue.'
            }
          ].map((item) => (
            <Card
              key={item.step}
              className="hover:shadow-md hover:border-primary/40 transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary text-primary flex items-center justify-center font-serif font-bold text-sm mb-4">
                {item.step}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Studio Request Form Section (Interactive Configurator) */}
      <section ref={formRef} className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12" id="customized-form">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
          {/* Header Ribbon */}
          <div className="bg-inverse-surface text-inverse-on-surface px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="font-serif text-base sm:text-lg font-medium tracking-wide">
                Interactive Bespoke Studio Commission Request
              </span>
            </div>
            <span className="font-mono text-xs text-primary-fixed-dim tracking-wider uppercase">
              Consultation ID: #ASRA-ATELIER-2026
            </span>
          </div>

          {/* Form Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Left Column (7 Cols): Configurator Steps */}
            <div className="lg:col-span-7">
              <BespokeConfigurator
                category={category}
                setCategory={setCategory}
                materials={materials}
                setMaterials={setMaterials}
                techniques={techniques}
                setTechniques={setTechniques}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                conceptDetails={conceptDetails}
                setConceptDetails={setConceptDetails}
                showToast={showToast}
              />
            </div>

            {/* Right Column (5 Cols): Live Summary & Consultation Actions */}
            <div className="lg:col-span-5 bg-surface-container-low/60 border border-outline-variant/30 rounded-xl p-6 lg:p-7">
              <BespokeLiveSummary
                category={category}
                materials={materials}
                techniques={techniques}
                uploadedFiles={uploadedFiles}
                budget={budget}
                setBudget={setBudget}
                weddingDate={weddingDate}
                setWeddingDate={setWeddingDate}
                fullName={fullName}
                setFullName={setFullName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                destinationCity={destinationCity}
                setDestinationCity={setDestinationCity}
                submitted={submitted}
                setSubmitted={setSubmitted}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Masterpiece Spotlight */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <Card className="p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-xs border-primary/20 bg-surface-container-lowest">
          <div className="lg:w-1/2 relative w-full">
            <div className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low aspect-[4/3] group">
              <img
                src="/assets/cdn/img_eafddfa4ed3e.jpg"
                alt="The Sovereign Bridal and Wedding Essentials Masterpiece Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <Badge variant="gold" className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider">
              ★ Flagship Masterpiece
            </Badge>
          </div>

          <div className="lg:w-1/2 space-y-4">
            <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2 py-0.5">
              Signature Bridal Commission
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
              The Sovereign Bridal &amp; Wedding Essentials Suite
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              An opulent symphony of hand-embossed blush wedding cases, artisanal Eau de Parfum, golden Ferrero confections,
              organic soy candle, silk scrunchie, and our signature ASRA golden ribbon insignia. Crafted specifically for
              unforgettable morning-of-wedding reveals.
            </p>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs text-on-surface font-medium">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✦</span>
                <span>24k Gilded Custom Monogram</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✦</span>
                <span>Fresh Baby's Breath &amp; Roses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✦</span>
                <span>Handmade Heirloom Plush Bear</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✦</span>
                <span>Debossed Hardbound Cylinder</span>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline block">Customized Suite Baseline</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-on-surface text-lg">₹7,499</span>
                  <span className="line-through text-outline text-xs">₹9,800</span>
                  <span className="text-emerald-700 font-semibold text-xs">(23% OFF)</span>
                </div>
              </div>

              <Button
                onClick={() =>
                  handlePrefill(
                    'wedding essentials',
                    ['24k_gold', 'mulberry_silk', 'plantation_teak'],
                    '5k-10k',
                    'Requesting similar design to The Sovereign Bridal & Wedding Essentials Suite with our custom couple initials'
                  )
                }
                className="text-xs font-semibold uppercase tracking-wider shadow-xs"
              >
                Customize Similar Suite →
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. Showcase Gallery Archive (Tabs + Real Assets) */}
      <BespokeShowcaseGallery onPrefill={handlePrefill} />

      {/* 6. Bespoke FAQ Accordion */}
      <BespokeFaq />

      {/* 7. Brand Trust Guarantees Bar */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-6 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">100% Customized Craft</h4>
              <p className="text-[11px] text-on-surface-variant">Custom dies &amp; real gold leaf</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">Insured Global Courier</h4>
              <p className="text-[11px] text-on-surface-variant">Doorstep transit protection</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">featured_seasonal_and_gifts</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">Wax-Sealed Luxury Box</h4>
              <p className="text-[11px] text-on-surface-variant">Complimentary presentation</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-8 h-8 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-xs text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wider">Privilege Concierge</h4>
              <p className="text-[11px] text-on-surface-variant">Personal bridal stylist 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BespokePage;
