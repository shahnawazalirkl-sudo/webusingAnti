"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const SPECIAL_REQUIREMENTS = [
  { id: 'custom-brass-die', label: 'Custom Initial Hot-Stamp Brass Die' },
  { id: 'individual-monogram', label: 'Individualized Guest Monogramming' },
  { id: 'room-placement', label: 'Direct Hotel Guest Room Staging' },
  { id: 'split-shipping', label: 'Multi-Resort / Split Destination Transit' },
  { id: 'gst-invoice', label: '18% GST Corporate Tax Invoice with ITC' }
];

const BulkInquiryForm = ({
  formData,
  setFormData,
  dossierItems,
  onRemoveDossierItem,
  onOpenSampleModal,
  onSubmitInquiry,
  formSubmitted,
  onResetForm,
  inquiryFormRef
}) => {
  const [selectedReqs, setSelectedReqs] = useState(['custom-brass-die']);

  const toggleReq = (id) => {
    setSelectedReqs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmitInquiry) {
      onSubmitInquiry({ ...formData, specialRequirements: selectedReqs });
    }
  };

  return (
    <section ref={inquiryFormRef} id="inquiryForm" className="w-full py-8 sm:py-10 lg:py-14 bg-surface">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left: Form */}
          <div className="lg:col-span-7 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <Badge variant="outline" className="text-primary border-primary/30 bg-[#FAF4EB] uppercase tracking-[0.2em] px-3 py-1 font-semibold text-[10px] sm:text-[11px] mb-2">
                Direct Concierge Dossier
              </Badge>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
                Book Custom Bulk Consultation &amp; Proposal
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                Submit your celebration dates and preferences. A Senior Bridal Concierge Stylist will share digital mockups, sample boxes &amp; volume quotations within 2 hours.
              </p>
            </div>

            {/* Dossier Items Chips Preview (Items added from catalog or calculator) */}
            {dossierItems && dossierItems.length > 0 && (
              <div className="mb-6 p-3.5 bg-[#FAF4EB] rounded-xl border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">folder_special</span>
                    <span>Selected Favor Items in Dossier ({dossierItems.length})</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dossierItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest text-on-surface border border-outline-variant/40 rounded-full text-xs shadow-2xs font-medium"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveDossierItem && onRemoveDossierItem(item)}
                        className="text-outline hover:text-error transition-colors text-xs font-bold leading-none cursor-pointer"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formSubmitted ? (
              <div className="p-6 bg-[#FAF4EB] text-on-surface rounded-xl border border-primary/30 flex flex-col items-center text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[28px]">check_circle</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-on-surface">
                  Bulk Concierge Dossier Registered
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
                  Thank you! Our lead wedding stylist will connect via WhatsApp to <strong className="text-on-surface">{formData.phone || '+91 registered contact'}</strong> within 2 hours with digital renders, sample kits, and tailored quotations.
                </p>
                <Button
                  type="button"
                  onClick={onResetForm}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="milestone">Wedding Occasion / Milestone *</Label>
                    <Select
                      value={formData.milestone}
                      onValueChange={(val) => setFormData({ ...formData, milestone: val })}
                    >
                      <SelectTrigger id="milestone" className="text-xs sm:text-sm bg-surface">
                        <SelectValue placeholder="Select Milestone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome-kit">Destination Room Welcome Kit</SelectItem>
                        <SelectItem value="mehendi-haldi">Haldi &amp; Mehendi Favors</SelectItem>
                        <SelectItem value="sangeet-cocktail">Sangeet &amp; Cocktail Favors</SelectItem>
                        <SelectItem value="varmala-ceremony">Wedding Day Varmala Gift</SelectItem>
                        <SelectItem value="reception">Grand Reception Favors</SelectItem>
                        <SelectItem value="corporate">Corporate Gala &amp; Annual Summit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="quantity">Estimated Quantity *</Label>
                    <Select
                      value={formData.quantity}
                      onValueChange={(val) => setFormData({ ...formData, quantity: val })}
                    >
                      <SelectTrigger id="quantity" className="text-xs sm:text-sm bg-surface">
                        <SelectValue placeholder="Select Quantity Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25-75">25 - 75 Units (Tier 1 • 15% Off)</SelectItem>
                        <SelectItem value="76-200">76 - 200 Units (Tier 2 • 22% Off)</SelectItem>
                        <SelectItem value="201-500">201 - 500 Units (Tier 3 • 30% Off)</SelectItem>
                        <SelectItem value="500+">500+ Units (Tier 4 • 35% Off)</SelectItem>
                        <SelectItem value="1000+">1,000+ Units (Royal Palatial Gala)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="eventDate">Target Event / Delivery Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="text-xs sm:text-sm bg-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="destination">Destination City / Resort *</Label>
                    <Input
                      id="destination"
                      type="text"
                      required
                      placeholder="e.g. Udaipur, Goa, Jaipur, Dubai"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="text-xs sm:text-sm bg-surface"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="coupleNames">Couple's Names / Event Hashtag</Label>
                    <Input
                      id="coupleNames"
                      type="text"
                      placeholder="e.g. Asra &amp; Shahnawaz (#AsraShahnawaz2026)"
                      value={formData.coupleNames}
                      onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                      className="text-xs sm:text-sm bg-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="budget">Budget Per Unit (INR)</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(val) => setFormData({ ...formData, budget: val })}
                    >
                      <SelectTrigger id="budget" className="text-xs sm:text-sm bg-surface">
                        <SelectValue placeholder="Budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1000">₹600 - ₹1,000 per unit</SelectItem>
                        <SelectItem value="1000-2000">₹1,000 - ₹2,000 per unit</SelectItem>
                        <SelectItem value="2000-3500">₹2,000 - ₹3,500 per unit</SelectItem>
                        <SelectItem value="3500+">₹3,500+ Luxury Masterpiece</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contactName">Contact Full Name *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="text-xs sm:text-sm bg-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">WhatsApp Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 96926 68263"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-xs sm:text-sm bg-surface"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="shahnawazalirkl@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-xs sm:text-sm bg-surface"
                  />
                </div>

                {/* Special Requirements Checklist */}
                <div className="space-y-2.5 pt-2">
                  <Label>Required Customization Privileges</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SPECIAL_REQUIREMENTS.map((req) => (
                      <div
                        key={req.id}
                        onClick={() => toggleReq(req.id)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-2.5 ${
                          selectedReqs.includes(req.id)
                            ? 'bg-[#FAF4EB] border-primary/40'
                            : 'bg-surface border-outline-variant/30 hover:border-primary/30'
                        }`}
                      >
                        <Checkbox
                          checked={selectedReqs.includes(req.id)}
                          onCheckedChange={() => toggleReq(req.id)}
                        />
                        <span className="text-xs text-on-surface font-medium">{req.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notes">Additional Monogram / Packaging Notes</Label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specify color pantones, crest initial letters, dietary restrictions for food hampers, or room number lists..."
                    className="w-full bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm p-3.5 rounded-lg border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xs font-semibold uppercase tracking-wider shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Request Curated Bulk Proposal &amp; Samples</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Button>
              </form>
            )}
          </div>

          {/* Right: Concierge Assurance & WhatsApp Line */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            {/* Sample Box Card */}
            <Card className="bg-surface-container-lowest border-outline-variant/30 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6 sm:p-7">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                  Complimentary Physical Sample Box
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  We dispatch an unboxing sample box directly to your residence within 48 hours for verified inquiries above 50 units. Feel the heavy silk textures, smell artisanal scents, and approve 3D metal crest stamping in person.
                </p>
                <Button
                  variant="outline"
                  onClick={onOpenSampleModal}
                  className="w-full text-xs font-semibold uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-primary text-[16px]">inventory_2</span>
                  <span>Request Master Sample Kit</span>
                </Button>
                <div className="flex items-center gap-2 p-2.5 bg-[#FAF4EB] rounded-lg border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                  <span className="text-[10px] text-on-surface font-semibold uppercase tracking-wider">
                    100% Satisfaction &amp; Color Match Guarantee
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Immediate Stylist Advice WhatsApp Card */}
            <Card className="bg-surface-container-lowest border-outline-variant/30 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6 sm:p-7">
                <h4 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                  Need Immediate Stylist Advice?
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Direct WhatsApp line to our senior destination bridal concierge for urgent requirements and rush deliveries.
                </p>
                <a
                  href="https://wa.me/919692668263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#25D366] text-white rounded-lg text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-[#20bd5a] active:scale-[0.98] transition-all duration-300 font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Connect on WhatsApp Concierge</span>
                </a>
              </CardContent>
            </Card>

            {/* Luxury Hamper Highlight */}
            <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 relative group">
              <img
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                alt="Close up of exquisite gold foiled ASRA Wedding Canvas monogram emblem stamped in warm gold"
                src="/assets/cdn/img_be70ca7356d1.jpg"
              />
              <div className="p-4 bg-surface-container-lowest flex items-center justify-between border-t border-outline-variant/30">
                <div>
                  <p className="text-[10px] sm:text-[11px] text-primary font-bold uppercase tracking-[0.2em]">
                    Custom Die Craft
                  </p>
                  <p className="font-serif text-sm sm:text-base font-semibold text-on-surface">
                    3D Metal Crest Embossing Included
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkInquiryForm;
