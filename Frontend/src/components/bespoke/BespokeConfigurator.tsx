"use client";
import Image from "next/image";

import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const CATEGORY_OPTIONS = [
  {
    id: 'wedding essentials',
    title: 'Wedding Essentials Trunk',
    subtitle: 'Hand-built velvet & gilded vaults',
    icon: 'card_giftcard',
    baseDays: '7–10 Days',
    basePrice: '₹6,499'
  },
  {
    id: 'audio_acrylic',
    title: 'Audio & Songwave Sculpture',
    subtitle: 'Scannable Spotify acrylic & brass',
    icon: 'music_note',
    baseDays: '3–5 Days',
    basePrice: '₹3,499'
  },
  {
    id: 'teak_box',
    title: 'Hand-Carved Teak Memory Box',
    subtitle: 'Custom couple initials engraved',
    icon: 'inventory_2',
    baseDays: '5–7 Days',
    basePrice: '₹4,999'
  },
  {
    id: 'floral_shadowbox',
    title: 'Preserved Varmala Shadowbox',
    subtitle: 'Ceremony garland resin encasement',
    icon: 'local_florist',
    baseDays: '10–14 Days',
    basePrice: '₹8,999'
  },
  {
    id: 'vow_books',
    title: 'Gilded Vow Books & Folios',
    subtitle: 'Handmade cotton deckle rag & foil',
    icon: 'auto_stories',
    baseDays: '4–6 Days',
    basePrice: '₹2,999'
  },
  {
    id: 'other_concept',
    title: 'Other Visionary Concept',
    subtitle: '100% custom designed from scratch',
    icon: 'lightbulb',
    baseDays: '7–12 Days',
    basePrice: '₹5,000+'
  },
];

export const MATERIAL_OPTIONS = [
  { id: '24k_gold', label: '✦ 24k Gold Foil Leafing', description: 'Genuine 24k micro-foil foil stamping' },
  { id: 'makrana_marble', label: '✦ Makrana White Marble', description: 'Hand-honed pristine architectural marble' },
  { id: 'plantation_teak', label: '✦ Solid Plantation Teakwood', description: 'Sustainably sourced kiln-dried hardwood' },
  { id: 'mulberry_silk', label: '✦ Mulberry Raw Silk & Velvet', description: 'Rich woven textured bridal linings' },
  { id: 'italian_leather', label: '✦ Full-Grain Italian Leather', description: 'Supple vegetable-tanned patina leather' },
  { id: 'cast_acrylic', label: '✦ Optical Cast Acrylic', description: 'Crystal-clarity 10mm cast acrylic block' },
  { id: 'botanical_soy', label: '✦ Hand-poured Botanical Soy', description: 'Organic therapeutic fragrance blend' },
];

export const TECHNIQUE_OPTIONS = [
  { id: 'laser', label: 'Precision Laser Engraving', desc: 'Ultra-fine dimensional etching' },
  { id: 'deboss', label: 'Debossing / Foil Stamping', desc: 'Deep-pressed hot metallic dies' },
  { id: 'flora', label: 'Preserved Resin Flora', desc: 'Botanical 3D casting without discoloration' },
  { id: 'calligraphy', label: 'Master Penman Calligraphy', desc: 'Handwritten ceremonial script in ink & gold' },
  { id: '3d_crest', label: '3D Initials Crest Sculpting', desc: 'Cast metal alloy couple crest emblem' },
];

const BespokeConfigurator = ({
  category,
  setCategory,
  materials,
  setMaterials,
  techniques,
  setTechniques,
  uploadedFiles,
  setUploadedFiles,
  conceptDetails,
  setConceptDetails,
  showToast
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Clean up object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

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

  const processFiles = (rawFiles: Iterable<File> | ArrayLike<File>) => {
    const filesArray = Array.from(rawFiles).map((file: File) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    setUploadedFiles((prev) => [...prev, ...filesArray]);
    if (showToast) {
      showToast(`Added ${filesArray.length} reference file(s) for design review`);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev[index];
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="space-y-7">
      {/* 1. Gift Category Selection */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full bg-[#FAF4EB] text-primary border border-primary/20 flex items-center justify-center text-[11px] font-bold font-mono">
            1
          </span>
          <Label className="text-xs font-semibold uppercase tracking-wider text-on-surface">
            Select Gift / Product Category
          </Label>
        </div>
        <p className="text-xs text-on-surface-variant mb-3 ml-7">
          Choose the primary gift silhouette you envision creating:
        </p>

        <RadioGroup
          value={category}
          onValueChange={setCategory}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-0 sm:ml-7"
        >
          {CATEGORY_OPTIONS.map((item) => {
            const isSelected = category === item.id;
            return (
              <label
                key={item.id}
                htmlFor={`cat-${item.id}`}
                className={`cursor-pointer border rounded-xl p-3 flex items-start gap-3 transition-all duration-200 select-none ${
                  isSelected
                    ? 'border-primary bg-[#FAF4EB]/80 shadow-xs ring-1 ring-primary/20'
                    : 'border-outline-variant/40 hover:border-primary/40 bg-surface-container-lowest'
                }`}
              >
                <RadioGroupItem value={item.id} id={`cat-${item.id}`} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-on-surface truncate">{item.title}</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </label>
            );
          })}
        </RadioGroup>
      </div>

      <Separator className="bg-outline-variant/30" />

      {/* 2. Primary Materials Selection */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full bg-[#FAF4EB] text-primary border border-primary/20 flex items-center justify-center text-[11px] font-bold font-mono">
            2
          </span>
          <Label className="text-xs font-semibold uppercase tracking-wider text-on-surface">
            Primary Materials of Choice
          </Label>
        </div>
        <p className="text-xs text-on-surface-variant mb-3 ml-0 sm:ml-7">
          Select all luxury materials you wish to incorporate:
        </p>
        <div className="flex flex-wrap gap-2 ml-0 sm:ml-7">
          {MATERIAL_OPTIONS.map((mat) => {
            const isSelected = materials.includes(mat.id);
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => toggleMaterial(mat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary shadow-xs font-semibold'
                    : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:border-primary/60 hover:bg-surface-container'
                }`}
              >
                <span>{mat.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[13px] leading-none">check</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-outline-variant/30" />

      {/* 3. Customization Techniques */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full bg-[#FAF4EB] text-primary border border-primary/20 flex items-center justify-center text-[11px] font-bold font-mono">
            3
          </span>
          <Label className="text-xs font-semibold uppercase tracking-wider text-on-surface">
            Customization Techniques
          </Label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 ml-0 sm:ml-7 mt-2">
          {TECHNIQUE_OPTIONS.map((tech) => {
            const isChecked = techniques.includes(tech.id);
            return (
              <label
                key={tech.id}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all duration-200 ${
                  isChecked
                    ? 'border-primary/60 bg-[#FAF4EB]/60'
                    : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60'
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleTechnique(tech.id)}
                  id={`tech-${tech.id}`}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-on-surface block leading-tight">{tech.label}</span>
                  <span className="text-[10px] text-outline line-clamp-1 mt-0.5">{tech.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <Separator className="bg-outline-variant/30" />

      {/* 4. Upload Reference Moodboards & Files */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full bg-[#FAF4EB] text-primary border border-primary/20 flex items-center justify-center text-[11px] font-bold font-mono">
            4
          </span>
          <Label className="text-xs font-semibold uppercase tracking-wider text-on-surface">
            Upload Sketches, Reference Photos or Moodboards
          </Label>
        </div>
        <div className="ml-0 sm:ml-7 mt-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group ${
              isDragging
                ? 'border-primary bg-primary/10 scale-[1.01]'
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
            <div className="w-10 h-10 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
            </div>
            <p className="text-xs font-medium text-on-surface">
              <span className="text-primary font-bold underline">Click to upload files</span> or drag and drop reference images
            </p>
            <p className="text-[10px] text-outline mt-1">
              Supports PNG, JPG, PDF, WEBP up to 25MB (Pinterest moodboard links can also be pasted below)
            </p>
          </div>

          {/* Uploaded File List with Badges */}
          {uploadedFiles.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs shadow-xs"
                >
                  {file.preview ? (
                    <Image src={file.preview} alt="preview" className="w-6 h-6 object-cover rounded" fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                  )}
                  <span className="font-medium text-on-surface truncate max-w-[130px]">{file.name}</span>
                  <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0 h-4">
                    {file.size}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-outline hover:text-red-600 transition-colors ml-1 cursor-pointer"
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

      <Separator className="bg-outline-variant/30" />

      {/* 5. Concept Details & Inscriptions */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-5 h-5 rounded-full bg-[#FAF4EB] text-primary border border-primary/20 flex items-center justify-center text-[11px] font-bold font-mono">
            5
          </span>
          <Label className="text-xs font-semibold uppercase tracking-wider text-on-surface">
            Concept Details &amp; Custom Inscriptions
          </Label>
        </div>
        <div className="ml-0 sm:ml-7 mt-2">
          <textarea
            value={conceptDetails}
            onChange={(e) => setConceptDetails(e.target.value)}
            rows={4}
            placeholder="Describe your concept, couple's story, wedding hashtags, specific dimensions, secret quotes, or color palette desires (e.g. Sage Green & Champagne Gold, wedding logo vector link)..."
            className="w-full text-xs rounded-xl border border-outline-variant/40 bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none p-3 text-on-surface placeholder:text-outline/60 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default BespokeConfigurator;
