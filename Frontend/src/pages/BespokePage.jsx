import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BespokePage = () => {
  const { showToast } = useCart();
  const formRef = useRef(null);

  // Form State
  const [category, setCategory] = useState('trousseau');
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
  const [isDragging, setIsDragging] = useState(false);

  // Materials list
  const materialOptions = [
    { id: '24k_gold', label: '✦ 24k Gold Foil Leafing' },
    { id: 'makrana_marble', label: '✦ Makrana White Marble' },
    { id: 'plantation_teak', label: '✦ Solid Plantation Teakwood' },
    { id: 'mulberry_silk', label: '✦ Mulberry Raw Silk & Velvet' },
    { id: 'italian_leather', label: '✦ Full-Grain Italian Leather' },
    { id: 'cast_acrylic', label: '✦ Optical Cast Acrylic' },
    { id: 'botanical_soy', label: '✦ Hand-poured Botanical Soy' },
  ];

  // Techniques list
  const techniqueOptions = [
    { id: 'laser', label: 'Laser Engraving' },
    { id: 'deboss', label: 'Debossing / Foil Stamping' },
    { id: 'flora', label: 'Preserved Resin Flora' },
    { id: 'calligraphy', label: 'Master Penman Calligraphy' },
    { id: '3d_crest', label: '3D Monogram Crest Sculpting' },
  ];

  const toggleMaterial = (id) => {
    setMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleTechnique = (id) => {
    setTechniques((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      }));
      setUploadedFiles((prev) => [...prev, ...filesArray]);
      showToast(`Uploaded ${filesArray.length} file(s) for design review`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      }));
      setUploadedFiles((prev) => [...prev, ...filesArray]);
      showToast(`Added ${filesArray.length} reference file(s)`);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrefill = (catVal, materialsArr, budgetVal, note) => {
    setCategory(catVal);
    if (materialsArr) setMaterials(materialsArr);
    if (budgetVal) setBudget(budgetVal);
    if (note) setConceptDetails(note);
    scrollToForm();
    showToast(`Configured studio request for "${note || catVal}"`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Bespoke brief received! Our chief designer will message you on WhatsApp within 2 hours.');
  };

  return (
    <div className="w-full bg-surface min-h-screen text-on-surface">

      {/* 1. Hero Header */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-6 pb-4">
        {/* Hero Statement Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-6 border-b border-outline-variant/30">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary-container/60 text-on-secondary-container px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <span>✨ Bespoke Commission Studio 2026</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-none mb-3">
              Your Idea → We Create
            </h1>
            <p className="text-sm lg:text-base text-on-surface-variant leading-relaxed">
              Turn your visionary wedding dreams, unique keepsake concepts, or one-of-a-kind couple heirloom ideas into
              masterfully handcrafted reality. From initial sketch to wax-sealed delivery.
            </p>
          </div>

          {/* Hero Metrics Bar */}
          <div className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/40 shadow-sm shrink-0">
            <div className="flex items-center gap-3 px-3 py-1 border-r border-outline-variant/40">
              <span className="font-serif text-2xl font-bold text-primary">500+</span>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant leading-tight">
                Bespoke Concepts<br />
                <span className="font-semibold text-on-surface">Realized</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-1 border-r border-outline-variant/40">
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
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold">Atelier Craft Journey</span>
          <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">How Your Idea Becomes Reality</h2>
          <p className="text-xs text-on-surface-variant mt-1.5">
            Our transparent four-step artisan process guarantees peerless attention to detail.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting decorative line */}
          <div className="hidden md:block absolute top-1/2 -translate-y-8 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-outline-variant via-primary to-outline-variant -z-0"></div>

          {/* Step 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/40 relative z-10 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-surface-container-low border-2 border-primary text-primary flex items-center justify-center font-serif font-bold text-lg mb-4 mx-auto">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-center text-on-surface mb-2">Share Your Vision</h3>
            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              Upload reference moodboards, Pinterest sketches, photos, or describe your concept in our studio configuration form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/40 relative z-10 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-surface-container-low border-2 border-primary text-primary flex items-center justify-center font-serif font-bold text-lg mb-4 mx-auto">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-center text-on-surface mb-2">Digital Render &amp; Curation</h3>
            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              Receive a photorealistic 3D render, custom font styles, and physical material swatches like teakwood, Italian leather, or raw silk.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/40 relative z-10 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-surface-container-low border-2 border-primary text-primary flex items-center justify-center font-serif font-bold text-lg mb-4 mx-auto">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-center text-on-surface mb-2">Artisanal Handcrafting</h3>
            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              Master calligraphers, laser engravers, and leather crafters bring the piece to life in our state-of-the-art jubilee atelier.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/40 relative z-10 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-surface-container-low border-2 border-primary text-primary flex items-center justify-center font-serif font-bold text-lg mb-4 mx-auto">
              04
            </div>
            <h3 className="font-serif text-lg font-bold text-center text-on-surface mb-2">Wax-Sealed Delivery</h3>
            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              Insured white-glove packaging with complimentary wax seal unboxing delivered straight to your doorstep or destination wedding venue.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Studio Request Form Section (Interactive Configurator) */}
      <section ref={formRef} className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8" id="bespoke-form">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-lg overflow-hidden">
          {/* Atelier Form Header Ribbon */}
          <div className="bg-gradient-to-r from-[#1f1e1c] via-[#2d2925] to-[#1f1e1c] text-[#fcf9f8] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3d3730]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                Interactive Bespoke Studio Commission Request
              </span>
            </div>
            <span className="text-xs text-primary-fixed-dim tracking-wider uppercase font-medium">
              Design Consultation ID: #ASRA-ATELIER-2026
            </span>
          </div>

          {/* Two Column Studio Body */}
          {submitted ? (
            <div className="p-8 sm:p-14 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-widest block mb-1">
                Commission Dispatched
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-on-surface mb-2">
                Thank You, {fullName || 'Dear Guest'}!
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                Your bespoke design brief for{' '}
                <strong className="text-on-surface">
                  {category === 'trousseau' && 'Wedding Trousseau Trunk'}
                  {category === 'audio_acrylic' && 'Audio & Songwave Sculpture'}
                  {category === 'teak_box' && 'Hand-Carved Teak Memory Box'}
                  {category === 'floral_shadowbox' && 'Preserved Varmala Shadowbox'}
                  {category === 'vow_books' && 'Gilded Vow Books & Folios'}
                  {category === 'other_concept' && 'Custom Bespoke Concept'}
                </strong>{' '}
                has been received. Our chief design master is reviewing your references and will reach out via WhatsApp at{' '}
                <strong className="text-primary">{phone || '+91 96926 68263'}</strong> within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919692668263?text=Hello%20ASRA%20Atelier,%20I%20just%20submitted%20bespoke%20brief%20for%20${encodeURIComponent(
                    fullName || 'my wedding'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-inverse-surface text-inverse-on-surface rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Open WhatsApp Direct</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setConceptDetails('');
                    setUploadedFiles([]);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-surface-container-low text-on-surface rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors border border-outline-variant/40"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
              {/* LEFT COLUMN: Configure Your Vision (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Keepsake Category */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold font-serif">
                      1
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface">
                      Select Keepsake / Product Category
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3 ml-8">
                    Choose the primary keepsake silhouette you envision creating:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-0 sm:ml-8">
                    <label
                      className={`cursor-pointer border rounded-lg p-3 flex items-start gap-2.5 transition ${
                        category === 'trousseau'
                          ? 'border-primary bg-secondary-container/20 shadow-sm'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_category"
                        checked={category === 'trousseau'}
                        onChange={() => setCategory('trousseau')}
                        className="text-primary focus:ring-primary mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Wedding Trousseau Trunk</span>
                        <span className="text-[10px] text-on-surface-variant">Hand-built velvet &amp; gilded vaults</span>
                      </div>
                    </label>

                    <label
                      className={`cursor-pointer border rounded-lg p-3 flex items-start gap-2.5 transition ${
                        category === 'audio_acrylic'
                          ? 'border-primary bg-secondary-container/20 shadow-sm'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_category"
                        checked={category === 'audio_acrylic'}
                        onChange={() => setCategory('audio_acrylic')}
                        className="text-primary focus:ring-primary mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Audio &amp; Songwave Sculpture</span>
                        <span className="text-[10px] text-on-surface-variant">Scannable Spotify acrylic &amp; brass</span>
                      </div>
                    </label>

                    <label
                      className={`cursor-pointer border rounded-lg p-3 flex items-start gap-2.5 transition ${
                        category === 'teak_box'
                          ? 'border-primary bg-secondary-container/20 shadow-sm'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_category"
                        checked={category === 'teak_box'}
                        onChange={() => setCategory('teak_box')}
                        className="text-primary focus:ring-primary mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Hand-Carved Teak Memory Box</span>
                        <span className="text-[10px] text-on-surface-variant">Custom couple monogram engraved</span>
                      </div>
                    </label>

                    <label
                      className={`cursor-pointer border rounded-lg p-3 flex items-start gap-2.5 transition ${
                        category === 'floral_shadowbox'
                          ? 'border-primary bg-secondary-container/20 shadow-sm'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_category"
                        checked={category === 'floral_shadowbox'}
                        onChange={() => setCategory('floral_shadowbox')}
                        className="text-primary focus:ring-primary mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Preserved Varmala Shadowbox</span>
                        <span className="text-[10px] text-on-surface-variant">Ceremony garland resin encasement</span>
                      </div>
                    </label>

                    <label
                      className={`cursor-pointer border rounded-lg p-3 flex items-start gap-2.5 transition ${
                        category === 'vow_books'
                          ? 'border-primary bg-secondary-container/20 shadow-sm'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_category"
                        checked={category === 'vow_books'}
                        onChange={() => setCategory('vow_books')}
                        className="text-primary focus:ring-primary mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Gilded Vow Books &amp; Folios</span>
                        <span className="text-[10px] text-on-surface-variant">Handmade cotton deckle rag &amp; foil</span>
                      </div>
                    </label>

                    <label
                      className={`cursor-pointer border rounded-lg p-3 flex items-start gap-2.5 transition ${
                        category === 'other_concept'
                          ? 'border-primary bg-secondary-container/20 shadow-sm'
                          : 'border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="product_category"
                        checked={category === 'other_concept'}
                        onChange={() => setCategory('other_concept')}
                        className="text-primary focus:ring-primary mt-0.5 accent-primary"
                      />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Other Visionary Concept</span>
                        <span className="text-[10px] text-on-surface-variant">100% custom from scratch</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 2. Primary Materials */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold font-serif">
                      2
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface">
                      Primary Materials of Choice
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3 ml-0 sm:ml-8">
                    Select materials you wish to incorporate (select all that apply):
                  </p>
                  <div className="flex flex-wrap gap-2 ml-0 sm:ml-8">
                    {materialOptions.map((mat) => {
                      const isSelected = materials.includes(mat.id);
                      return (
                        <button
                          key={mat.id}
                          type="button"
                          onClick={() => toggleMaterial(mat.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition ${
                            isSelected
                              ? 'bg-inverse-surface text-inverse-on-surface border-inverse-surface font-semibold shadow-sm'
                              : 'border-outline-variant/60 bg-surface-container-low text-on-surface hover:border-primary'
                          }`}
                        >
                          <span>{mat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Customization Techniques */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold font-serif">
                      3
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface">
                      Customization Techniques
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 ml-0 sm:ml-8 mt-2">
                    {techniqueOptions.map((tech) => {
                      const isChecked = techniques.includes(tech.id);
                      return (
                        <label key={tech.id} className="flex items-center gap-2 text-xs text-on-surface cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTechnique(tech.id)}
                            className="rounded border-outline-variant/60 text-primary focus:ring-primary accent-primary w-4 h-4 cursor-pointer"
                          />
                          <span>{tech.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Upload Sketches, Reference Photos or Moodboards */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold font-serif">
                      4
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface">
                      Upload Sketches, Reference Photos or Moodboards
                    </h3>
                  </div>
                  <div className="ml-0 sm:ml-8 mt-2">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer group ${
                        isDragging
                          ? 'border-primary bg-primary/10'
                          : 'border-primary/40 bg-surface-container-low hover:bg-surface-container'
                      }`}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.webp"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="w-12 h-12 mx-auto mb-2 text-primary group-hover:scale-110 transition duration-200">
                        <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                      </div>
                      <p className="text-xs font-medium text-on-surface">
                        <span className="text-primary font-bold underline">Click to upload files</span> or drag and drop reference images
                      </p>
                      <p className="text-[10px] text-outline mt-1">
                        Supports PNG, JPG, PDF, WEBP up to 25MB (You can also share Pinterest board links below)
                      </p>
                    </div>

                    {/* Uploaded File Previews */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {uploadedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-outline-variant/50 text-xs shadow-sm"
                          >
                            {file.preview ? (
                              <img src={file.preview} alt="preview" className="w-6 h-6 object-cover rounded" />
                            ) : (
                              <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                            )}
                            <span className="font-medium text-on-surface truncate max-w-[140px]">{file.name}</span>
                            <span className="text-[10px] text-outline">({file.size})</span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-outline hover:text-rose-600 ml-1"
                              aria-label="Remove uploaded file"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Concept Details */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold font-serif">
                      5
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-on-surface">
                      Concept Details &amp; Custom Engravings
                    </h3>
                  </div>
                  <div className="ml-0 sm:ml-8 mt-2">
                    <textarea
                      value={conceptDetails}
                      onChange={(e) => setConceptDetails(e.target.value)}
                      rows={4}
                      placeholder="Describe your concept, couple's story, wedding hashtags, specific dimensions, secret quotes, or color palette desires (e.g. Sage Green & Champagne Gold, wedding logo vector link)..."
                      className="w-full text-xs rounded-xl border border-outline-variant/60 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none p-3 text-on-surface placeholder:text-outline"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Consultation & Concierge Details (5 Cols) */}
              <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/40 rounded-xl p-6 lg:p-7 flex flex-col justify-between">
                <div>
                  <div className="border-b border-outline-variant/30 pb-4 mb-5">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                      White-Glove Atelier Service
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-on-surface">
                      Project Consultation &amp; Concierge Details
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Our senior bespoke curator will craft a personalized layout &amp; quotation based on your choices.
                    </p>
                  </div>

                  {/* Budget Expectation */}
                  <div className="mb-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-2">
                      Budget Expectation
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label
                        className={`cursor-pointer border rounded-lg p-2.5 text-center text-xs font-medium transition ${
                          budget === '2.5k-5k'
                            ? 'border-primary bg-secondary-container/40 font-bold text-on-surface'
                            : 'border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:border-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          checked={budget === '2.5k-5k'}
                          onChange={() => setBudget('2.5k-5k')}
                          className="hidden"
                        />
                        <span>₹2,500 – ₹5,000</span>
                      </label>

                      <label
                        className={`cursor-pointer border rounded-lg p-2.5 text-center text-xs font-medium transition ${
                          budget === '5k-10k'
                            ? 'border-primary bg-secondary-container/40 font-bold text-on-surface'
                            : 'border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:border-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          checked={budget === '5k-10k'}
                          onChange={() => setBudget('5k-10k')}
                          className="hidden"
                        />
                        <span>₹5,000 – ₹10,000</span>
                      </label>

                      <label
                        className={`cursor-pointer border rounded-lg p-2.5 text-center text-xs font-medium transition ${
                          budget === '10k-25k'
                            ? 'border-primary bg-secondary-container/40 font-bold text-on-surface'
                            : 'border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:border-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          checked={budget === '10k-25k'}
                          onChange={() => setBudget('10k-25k')}
                          className="hidden"
                        />
                        <span>₹10,000 – ₹25,000</span>
                      </label>

                      <label
                        className={`cursor-pointer border rounded-lg p-2.5 text-center text-xs font-medium transition ${
                          budget === '25k+'
                            ? 'border-primary bg-secondary-container/40 font-bold text-on-surface'
                            : 'border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:border-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          checked={budget === '25k+'}
                          onChange={() => setBudget('25k+')}
                          className="hidden"
                        />
                        <span>Ultra Bespoke ₹25k+</span>
                      </label>
                    </div>
                  </div>

                  {/* Target Delivery / Wedding Date */}
                  <div className="mb-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">
                      Target Delivery / Wedding Date
                    </label>
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full text-xs rounded-lg border border-outline-variant/60 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none py-2.5 px-3 text-on-surface"
                    />
                  </div>

                  {/* Client Details */}
                  <div className="space-y-3.5 mb-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Radhika Singhania"
                        className="w-full text-xs rounded-lg border border-outline-variant/60 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none py-2 px-3 text-on-surface"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface block mb-1">
                          WhatsApp / Phone *
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-2 rounded-l-lg border border-r-0 border-outline-variant/60 bg-surface-container-high text-xs text-on-surface font-medium">
                            🇮🇳 +91
                          </span>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="96926 68263"
                            className="w-full text-xs rounded-r-lg border border-outline-variant/60 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none py-2 px-3 text-on-surface"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="radhika@example.com"
                          className="w-full text-xs rounded-lg border border-outline-variant/60 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none py-2 px-3 text-on-surface"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface block mb-1">
                        Destination City / Venue Delivery
                      </label>
                      <input
                        type="text"
                        value={destinationCity}
                        onChange={(e) => setDestinationCity(e.target.value)}
                        placeholder="e.g. The Leela Palace, Udaipur or Mumbai"
                        className="w-full text-xs rounded-lg border border-outline-variant/60 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none py-2 px-3 text-on-surface"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button & WhatsApp Connect */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-inverse-surface hover:bg-primary text-inverse-on-surface py-3.5 px-6 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition duration-300 shadow-md"
                  >
                    <span>Submit Bespoke Commission Request</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>

                  <div className="mt-4 pt-4 border-t border-outline-variant/30 text-center">
                    <a
                      href="https://wa.me/919692668263?text=Hello%20ASRA%20Atelier,%20I%20need%20instant%20consultation%20for%20a%20bespoke%20wedding%20gift"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>Need instant consultation? Chat on WhatsApp within 15 min</span>
                    </a>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. Masterpiece Hero Spotlight */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-10 shadow-sm">
          <div className="lg:w-1/2 relative w-full">
            <div className="overflow-hidden rounded-xl border border-outline-variant/40 shadow-inner bg-surface-container-low">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrYPxCrDzczhyZ-p7Ew61w-iDjrf0SYB9xcUMsWWKw19VERYs6chdoMrDSxCbWxB6FP0DPqlSA9C0gfm0A_e76hPgg3kHn_PwuaYLWv2rylJkcQJvx-RMjgkr76e43aAgClcbWocYdzM7JnURK0cckKXh1uPTwgJyWYqKEdhMs_ARV-EYILjjs2zca7jt9X7AqeY7WwO8XtHixUwaHSL-_9YJ51I7DbRGCyy27-puWWkO30dd1YCmnzw"
                alt="The Sovereign Bridal and Trousseau Masterpiece Suite"
                className="w-full h-auto object-cover max-h-[480px] hover:scale-105 transition duration-500"
              />
            </div>
            <span className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-sm text-on-surface text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-sm border border-outline-variant/40">
              ★ Atelier Masterpiece Realization
            </span>
          </div>

          <div className="lg:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 bg-secondary-container/60 text-on-secondary-container px-3 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase">
              Signature Bridal Commission
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-on-surface leading-tight">
              The Sovereign Bridal &amp; Trousseau Suite
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              An opulent symphony of hand-embossed blush trousseau cases, artisanal Eau de Parfum, golden Ferrero confections,
              organic soy candle, silk scrunchie, and our signature ASRA golden ribbon insignia. Crafted specifically for
              unforgettable trousseau unboxing and morning-of-wedding reveals.
            </p>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs text-on-surface font-medium">
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>24k Gilded Custom Monograms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>Fresh Baby's Breath &amp; Roses</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>Handmade Heirloom Plush Bear</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✦</span>
                <span>Debossed Hardbound Cylinder</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline block">Bespoke Suite Baseline</span>
                <span className="font-serif text-2xl font-bold text-on-surface">₹7,499</span>
                <span className="text-xs text-outline line-through ml-1.5">₹9,800</span>
              </div>

              <button
                onClick={() =>
                  handlePrefill(
                    'trousseau',
                    ['24k_gold', 'mulberry_silk', 'plantation_teak'],
                    '5k-10k',
                    'Requesting similar design to The Sovereign Bridal & Trousseau Suite with our custom couple initials'
                  )
                }
                type="button"
                className="bg-inverse-surface hover:bg-primary text-inverse-on-surface text-xs font-semibold uppercase tracking-wider py-3 px-6 rounded-lg transition duration-300 shadow-sm"
              >
                Customize Similar Suite →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recent Bespoke Creations Realized (Showcase Gallery) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold block">
              Archive of Realized Dreams
            </span>
            <h2 className="font-serif text-3xl font-bold text-on-surface mt-1">
              Recent Bespoke Creations Realized
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Every commissioned piece is archived with its couple's journey and craftsmanship pedigree.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-on-surface transition inline-flex items-center gap-1.5 mt-3 md:mt-0"
          >
            <span>View All Atelier Heirlooms</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* 4 Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: The Royal Udaipur Vow Trunk */}
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="relative bg-surface-container-low h-52 overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full rounded bg-gradient-to-tr from-[#3b2b1e] to-[#6b4f3a] text-[#f7eedf] flex flex-col items-center justify-center p-4 text-center shadow-md">
                  <span className="text-xs font-serif uppercase tracking-widest text-primary-fixed">A &amp; M</span>
                  <span className="font-serif text-sm font-bold mt-1">Hand-Carved Walnut Trunk</span>
                  <span className="text-[10px] text-primary-fixed-dim mt-2">24k Gold Debossed Vows</span>
                </div>
                <span className="absolute top-3 left-3 bg-surface-container-lowest/90 text-on-surface text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                  Commissioned For Aarav &amp; Maya
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-on-surface mb-1.5">
                  The Royal Udaipur Vow Trunk
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-3 mb-3 leading-relaxed">
                  Hand-carved solid walnut with dual hidden brass drawers, velvet-lined ring cushions, and debossed Sanskrit ceremony vows in 24k leaf.
                </p>
                <blockquote className="border-l-2 border-primary pl-2.5 text-[11px] italic text-outline mb-4">
                  "It stood at our mandap altar and now rests as our family's most sacred heirloom."
                </blockquote>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button
                onClick={() =>
                  handlePrefill(
                    'trousseau',
                    ['24k_gold', 'plantation_teak', 'mulberry_silk'],
                    '10k-25k',
                    'Requesting similar design to The Royal Udaipur Vow Trunk with hand-carved wood and dual drawers'
                  )
                }
                type="button"
                className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary text-[11px] font-bold uppercase tracking-wider py-2 rounded transition"
              >
                Request Similar Trunk
              </button>
            </div>
          </article>

          {/* Card 2: Preserved Jaimala Crystal Arch */}
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="relative bg-surface-container-low h-52 overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full rounded bg-gradient-to-tr from-[#2f3e37] to-[#516b5e] text-[#f7eedf] flex flex-col items-center justify-center p-4 text-center shadow-md">
                  <span className="text-xs font-serif uppercase tracking-widest text-primary-fixed">R &amp; S</span>
                  <span className="font-serif text-sm font-bold mt-1">Preserved Jaimala Flora</span>
                  <span className="text-[10px] text-primary-fixed-dim mt-2">Crystal Optical Arch</span>
                </div>
                <span className="absolute top-3 left-3 bg-surface-container-lowest/90 text-on-surface text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                  Commissioned For Rohan &amp; Simran
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-on-surface mb-1.5">
                  Preserved Jaimala Crystal Arch
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-3 mb-3 leading-relaxed">
                  3D botanical garland resin suspension encased inside diamond-polished cast acrylic with customized brass pedestal base.
                </p>
                <blockquote className="border-l-2 border-primary pl-2.5 text-[11px] italic text-outline mb-4">
                  "Our original ceremony varmala looks as vibrant as the evening we exchanged vows."
                </blockquote>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button
                onClick={() =>
                  handlePrefill(
                    'floral_shadowbox',
                    ['cast_acrylic', 'makrana_marble'],
                    '5k-10k',
                    'Requesting floral garland preservation similar to Preserved Jaimala Crystal Arch'
                  )
                }
                type="button"
                className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary text-[11px] font-bold uppercase tracking-wider py-2 rounded transition"
              >
                Request Floral Preservation
              </button>
            </div>
          </article>

          {/* Card 3: Celestial First Dance Songwave */}
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="relative bg-surface-container-low h-52 overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full rounded bg-gradient-to-tr from-[#1f242e] to-[#394458] text-[#f7eedf] flex flex-col items-center justify-center p-4 text-center shadow-md">
                  <span className="text-xs font-serif uppercase tracking-widest text-primary-fixed">K &amp; A</span>
                  <span className="font-serif text-sm font-bold mt-1">Songwave Audio Light</span>
                  <span className="text-[10px] text-primary-fixed-dim mt-2">Backlit Italian Marble Base</span>
                </div>
                <span className="absolute top-3 left-3 bg-surface-container-lowest/90 text-on-surface text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                  Commissioned For Kabir &amp; Alisha
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-on-surface mb-1.5">
                  Celestial First Dance Songwave
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-3 mb-3 leading-relaxed">
                  Scannable Spotify audio waveform of their first dance embedded into etched optical glass with warm LED ambient backlighting.
                </p>
                <blockquote className="border-l-2 border-primary pl-2.5 text-[11px] italic text-outline mb-4">
                  "Scanning the lamp on our anniversary plays our song instantly. Pure magic."
                </blockquote>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button
                onClick={() =>
                  handlePrefill(
                    'audio_acrylic',
                    ['cast_acrylic', 'makrana_marble', '24k_gold'],
                    '2.5k-5k',
                    'Requesting First Dance Songwave sculpture with custom couple audio track'
                  )
                }
                type="button"
                className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary text-[11px] font-bold uppercase tracking-wider py-2 rounded transition"
              >
                Request Audio Keepsake
              </button>
            </div>
          </article>

          {/* Card 4: Monogrammed Passport Trunk */}
          <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="relative bg-surface-container-low h-52 overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full rounded bg-gradient-to-tr from-[#4a3328] to-[#805844] text-[#f7eedf] flex flex-col items-center justify-center p-4 text-center shadow-md">
                  <span className="text-xs font-serif uppercase tracking-widest text-primary-fixed">S &amp; R</span>
                  <span className="font-serif text-sm font-bold mt-1">Italian Leather Honeymoon Trunk</span>
                  <span className="text-[10px] text-primary-fixed-dim mt-2">Vintage Brass Die Stamped</span>
                </div>
                <span className="absolute top-3 left-3 bg-surface-container-lowest/90 text-on-surface text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                  Commissioned For Siddharth &amp; Rhea
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-on-surface mb-1.5">
                  Monogrammed Passport Trunk
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-3 mb-3 leading-relaxed">
                  Full-grain Italian saddle leather folio duo with personalized family heraldry brass die hot-stamping and boarding card slots.
                </p>
                <blockquote className="border-l-2 border-primary pl-2.5 text-[11px] italic text-outline mb-4">
                  "Carried on our honeymoon to Amalfi — effortlessly chic and eternal quality."
                </blockquote>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button
                onClick={() =>
                  handlePrefill(
                    'trousseau',
                    ['italian_leather', '24k_gold'],
                    '5k-10k',
                    'Requesting Monogrammed Leather Travel Suite with custom gold debossed heraldry'
                  )
                }
                type="button"
                className="w-full border border-primary text-primary hover:bg-primary hover:text-on-primary text-[11px] font-bold uppercase tracking-wider py-2 rounded transition"
              >
                Request Leather Suite
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* 6. Brand Trust Guarantees Bar (4 Pillars) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 py-6 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30 shadow-sm">
          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">100% Bespoke Craft</h4>
              <p className="text-[11px] text-on-surface-variant">Custom dies &amp; real gold leaf</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Insured Global Courier</h4>
              <p className="text-[11px] text-on-surface-variant">Doorstep transit protection</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">featured_seasonal_and_gifts</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Wax-Sealed Luxury Box</h4>
              <p className="text-[11px] text-on-surface-variant">Complimentary presentation</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-full bg-surface-container-low border border-primary text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Atelier Privilege Desk</h4>
              <p className="text-[11px] text-on-surface-variant">Personal bridal stylist 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BespokePage;
