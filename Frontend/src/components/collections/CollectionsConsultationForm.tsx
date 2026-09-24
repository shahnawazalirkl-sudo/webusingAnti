"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CollectionsConsultationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    guests: '',
    eventDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        'Thank you! An ASRA Consultant will connect on WhatsApp within 24 hours with your customized lookbook.'
      );
      setFormData({
        fullName: '',
        phone: '',
        guests: '',
        eventDate: '',
      });
    }, 600);
  };

  return (
    <Card className="lg:w-5/12 w-full bg-surface-container-lowest p-6 sm:p-8 shadow-xs border-outline-variant/30">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="font-serif text-xl sm:text-2xl font-normal leading-tight text-on-surface">
          Book a Design Consultation Call
        </CardTitle>
        <CardDescription className="text-xs text-on-surface-variant mt-1 leading-relaxed">
          Receive a curated digital moodboard and wholesale pricing deck within 24 hours.
        </CardDescription>
      </CardHeader>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="support-name" className="text-xs font-semibold">
            Your Full Name
          </Label>
          <Input
            id="support-name"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            placeholder="e.g. Asra Ansari"
            required
            type="text"
            className="h-11 min-h-[44px] text-sm touch-manipulation"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="support-phone" className="text-xs font-semibold">
              Phone / WhatsApp
            </Label>
            <Input
              id="support-phone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="+91 96926 68263"
              required
              type="tel"
              className="h-11 min-h-[44px] text-sm touch-manipulation"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="support-guests" className="text-xs font-semibold">
              Expected Guests / Units
            </Label>
            <Input
              id="support-guests"
              name="guests"
              value={formData.guests}
              onChange={handleFormChange}
              placeholder="50 - 500"
              type="number"
              className="h-11 min-h-[44px] text-sm touch-manipulation"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="support-date" className="text-xs font-semibold">
            Target Wedding / Event Date
          </Label>
          <Input
            id="support-date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleFormChange}
            type="date"
            className="h-11 min-h-[44px] text-sm touch-manipulation"
          />
        </div>

        <Button
          className="w-full h-12 min-h-[48px] text-xs font-semibold uppercase tracking-wider touch-manipulation active:scale-98 mt-2 cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin mr-2" />
              <span>Connecting Support...</span>
            </>
          ) : (
            <span>Request Curated Proposal</span>
          )}
        </Button>
      </form>
    </Card>
  );
}
