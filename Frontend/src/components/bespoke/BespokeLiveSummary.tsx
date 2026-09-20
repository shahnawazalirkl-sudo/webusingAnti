import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CATEGORY_OPTIONS, MATERIAL_OPTIONS, TECHNIQUE_OPTIONS } from './BespokeConfigurator';

const BUDGET_OPTIONS = [
  { id: '2.5k-5k', label: '₹2,500 – ₹5,000' },
  { id: '5k-10k', label: '₹5,000 – ₹10,000' },
  { id: '10k-25k', label: '₹10,000 – ₹25,000' },
  { id: '25k+', label: 'Ultra Bespoke ₹25k+' },
];

const BespokeLiveSummary = ({
  category,
  materials,
  techniques,
  uploadedFiles,
  budget,
  setBudget,
  weddingDate,
  setWeddingDate,
  fullName,
  setFullName,
  phone,
  setEmail,
  email,
  setPhone,
  destinationCity,
  setDestinationCity,
  submitted,
  setSubmitted,
  handleSubmit
}) => {
  // Find current category metadata
  const currentCategory = CATEGORY_OPTIONS.find((c) => c.id === category) || CATEGORY_OPTIONS[0];

  // Calculate dynamic estimated turnaround
  let estimatedDays = currentCategory.baseDays;
  if (materials.includes('makrana_marble') || materials.includes('flora')) {
    estimatedDays = '7–12 Days';
  }
  if (category === 'floral_shadowbox') {
    estimatedDays = '10–14 Days';
  }

  // Generate customized WhatsApp query message
  const generateWhatsAppLink = () => {
    const selectedMatLabels = materials
      .map((id) => MATERIAL_OPTIONS.find((m) => m.id === id)?.label.replace('✦ ', ''))
      .filter(Boolean)
      .join(', ');

    const selectedTechLabels = techniques
      .map((id) => TECHNIQUE_OPTIONS.find((t) => t.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const message = `Hello ASRA Atelier, I would like to consult on a Bespoke Order:
• Silhouette: ${currentCategory.title}
• Materials: ${selectedMatLabels || 'None selected'}
• Techniques: ${selectedTechLabels || 'Standard'}
• Budget: ${budget}
• Target Date: ${weddingDate || 'Flexible'}
• Name: ${fullName || 'Guest'} (${destinationCity || 'India'})`;

    return `https://wa.me/919692668263?text=${encodeURIComponent(message)}`;
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 text-center max-w-xl mx-auto flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#FAF4EB] text-primary border border-primary/20 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[28px]">verified</span>
        </div>
        <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-3 py-1 mb-2">
          Commission Shipped
        </Badge>
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface mb-2">
          Thank You, {fullName || 'Dear Guest'}!
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
          Your bespoke design brief for{' '}
          <strong className="text-on-surface font-semibold">{currentCategory.title}</strong> has
          been received. Our chief artisan will reach out via WhatsApp at{' '}
          <strong className="text-primary font-mono">{phone || '+91 96926 68263'}</strong> within 2 hours with digital layout concepts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white">
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Open WhatsApp Direct</span>
            </Button>
          </a>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="w-full sm:w-auto"
          >
            Submit Another Brief
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Atelier Configuration Card */}
      <Card className="bg-surface-container-low border-primary/20 shadow-xs overflow-hidden">
        <CardHeader className="bg-primary/5 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Live Commission Summary
            </span>
            <Badge variant="gold" className="text-[10px] font-mono">
              Ready to Craft
            </Badge>
          </div>
          <CardTitle className="font-serif text-lg text-on-surface mt-1">
            {currentCategory.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-3 space-y-3">
          {/* Dynamic Metrics */}
          <div className="grid grid-cols-2 gap-2 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/30 text-xs">
            <div>
              <span className="text-[10px] text-outline uppercase tracking-wider block">Estimated Turnaround</span>
              <span className="font-semibold text-on-surface text-xs">{estimatedDays}</span>
            </div>
            <div>
              <span className="text-[10px] text-outline uppercase tracking-wider block">Starting Baseline</span>
              <span className="font-semibold text-primary text-xs">{currentCategory.basePrice}</span>
            </div>
          </div>

          {/* Selected Materials Chips */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-outline block mb-1.5 font-semibold">
              Selected Materials ({materials.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {materials.length === 0 ? (
                <span className="text-[11px] text-outline italic">No materials selected yet</span>
              ) : (
                materials.map((matId) => {
                  const m = MATERIAL_OPTIONS.find((item) => item.id === matId);
                  return (
                    <Badge key={matId} variant="outline" className="text-[10px] bg-surface-container-lowest">
                      {m?.label.replace('✦ ', '') || matId}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>

          {/* Selected Techniques Chips */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-outline block mb-1.5 font-semibold">
              Techniques ({techniques.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {techniques.length === 0 ? (
                <span className="text-[11px] text-outline italic">Standard artisanal finishing</span>
              ) : (
                techniques.map((techId) => {
                  const t = TECHNIQUE_OPTIONS.find((item) => item.id === techId);
                  return (
                    <Badge key={techId} variant="secondary" className="text-[10px]">
                      {t?.label || techId}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="text-[11px] text-on-surface-variant flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[14px] text-primary">attach_file</span>
              <span>{uploadedFiles.length} design reference file(s) attached</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consultation & Delivery Details Form */}
      <div className="space-y-4">
        {/* Budget Selection */}
        <div>
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-2">
            Target Budget Range
          </Label>
          <RadioGroup
            value={budget}
            onValueChange={setBudget}
            className="grid grid-cols-2 gap-2"
          >
            {BUDGET_OPTIONS.map((b) => {
              const isChecked = budget === b.id;
              return (
                <label
                  key={b.id}
                  htmlFor={`budget-${b.id}`}
                  className={`cursor-pointer border rounded-lg p-2.5 text-center text-xs transition-all duration-200 flex items-center justify-center gap-1.5 select-none ${
                    isChecked
                      ? 'border-primary bg-[#FAF4EB] font-semibold text-primary shadow-xs'
                      : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:border-primary/40'
                  }`}
                >
                  <RadioGroupItem value={b.id} id={`budget-${b.id}`} className="sr-only" />
                  <span>{b.label}</span>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        {/* Target Delivery Date */}
        <div>
          <Label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1.5">
            Target Delivery / Event Date
          </Label>
          <Input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="bg-surface-container-lowest border-outline-variant/40 text-xs h-9"
          />
        </div>

        <Separator className="bg-outline-variant/30" />

        {/* Client Contact Inputs */}
        <div className="space-y-3">
          <div>
            <Label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
              Full Name *
            </Label>
            <Input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Asra Ansari"
              className="bg-surface-container-lowest border-outline-variant/40 text-xs h-9"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
                WhatsApp / Phone *
              </Label>
              <div className="flex">
                <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-outline-variant/60 bg-surface-container-high text-xs text-on-surface font-medium">
                  +91
                </span>
                <Input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="96926 68263"
                  className="bg-surface-container-lowest border-outline-variant/40 text-xs h-9 rounded-l-none"
                />
              </div>
            </div>

            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
                Email Address *
              </Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="shahnawazalirkl@gmail.com"
                className="bg-surface-container-lowest border-outline-variant/40 text-xs h-9"
              />
            </div>
          </div>

          <div>
            <Label className="text-[11px] font-semibold uppercase tracking-wider text-on-surface block mb-1">
              Destination City / Venue Delivery
            </Label>
            <Input
              type="text"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              placeholder="e.g. The Leela Palace, Udaipur or Mumbai"
              className="bg-surface-container-lowest border-outline-variant/40 text-xs h-9"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-10 text-xs uppercase tracking-wider font-semibold shadow-xs"
          >
            <span>Submit Bespoke Commission Request</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Button>

          <div className="text-center pt-2">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Need instant consultation? Chat on WhatsApp within 15 min</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokeLiveSummary;
