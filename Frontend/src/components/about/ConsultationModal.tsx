"use client";

import React, { useState, useEffect } from 'react';
import { User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export function openConsultationModal(salonName?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-consultation-modal', { detail: { salonName } })
    );
  }
}

interface ConsultationTriggerButtonProps {
  salonName?: string;
  className?: string;
  variant?: 'outline' | 'default';
  children: React.ReactNode;
}

export function ConsultationTriggerButton({
  salonName,
  className,
  variant = 'outline',
  children,
}: ConsultationTriggerButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => openConsultationModal(salonName)}
    >
      {children}
    </Button>
  );
}

export default function ConsultationModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState('Jubilee Hills Collection (Hyderabad)');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = (e: CustomEvent<{ salonName?: string }>) => {
      if (e.detail?.salonName) {
        setSelectedSalon(e.detail.salonName);
      }
      setIsModalOpen(true);
    };

    window.addEventListener('open-consultation-modal', handleOpen as EventListener);
    return () => {
      window.removeEventListener('open-consultation-modal', handleOpen as EventListener);
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success('Private Salon Session Requested', {
        description: `Our senior curator will contact ${
          formData.name || 'you'
        } via WhatsApp to confirm the appointment for ${selectedSalon}.`,
      });
      setFormData({ name: '', phone: '', email: '', eventDate: '', notes: '' });
    }, 600);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-lg bg-[#FAF8F5] border-asra-gold/50 shadow-2xl p-6 sm:p-8 rounded-xl">
        <DialogHeader className="text-center sm:text-center space-y-1 mb-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-asra-goldDark block">
            Private Collection Reservation
          </span>
          <DialogTitle className="font-cinzel text-xl sm:text-2xl font-bold text-asra-charcoal">
            Book Your Salon Session
          </DialogTitle>
          <Separator className="w-12 h-[1.5px] bg-asra-gold mx-auto my-2" />
          <DialogDescription className="text-xs text-asra-muted font-light">
            Connect with a Senior Bridal Stylist at our Hyderabad &amp; Bengaluru studios or via VIP video concierge.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBookingSubmit} className="space-y-4 text-left mt-2">
          <div>
            <Label className="block text-[11px] uppercase tracking-wider font-semibold text-asra-charcoal mb-1.5">
              Select Salon / Studio
            </Label>
            <Select value={selectedSalon} onValueChange={setSelectedSalon}>
              <SelectTrigger className="w-full bg-white border-asra-border text-xs">
                <SelectValue placeholder="Select Studio" />
              </SelectTrigger>
              <SelectContent className="bg-white border-asra-border">
                <SelectItem value="Jubilee Hills Collection (Hyderabad)">
                  Jubilee Hills Collection (Hyderabad)
                </SelectItem>
                <SelectItem value="Indiranagar Studio (Bengaluru)">
                  Indiranagar Studio (Bengaluru)
                </SelectItem>
                <SelectItem value="Virtual Video Styling Desk">
                  Virtual Video Styling Desk (Worldwide)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="block text-[11px] uppercase tracking-wider font-semibold text-asra-charcoal mb-1.5">
                Your Full Name *
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Asra & Shahnawaz"
                  className="bg-white border-asra-border text-xs pl-8"
                />
                <User className="w-3.5 h-3.5 text-asra-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label className="block text-[11px] uppercase tracking-wider font-semibold text-asra-charcoal mb-1.5">
                Phone / WhatsApp *
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 96926 68263"
                  className="bg-white border-asra-border text-xs pl-8"
                />
                <Phone className="w-3.5 h-3.5 text-asra-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="block text-[11px] uppercase tracking-wider font-semibold text-asra-charcoal mb-1.5">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="shahnawazalirkl@gmail.com"
                  className="bg-white border-asra-border text-xs pl-8"
                />
                <Mail className="w-3.5 h-3.5 text-asra-muted absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label className="block text-[11px] uppercase tracking-wider font-semibold text-asra-charcoal mb-1.5">
                Wedding / Event Date
              </Label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="bg-white border-asra-border text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-[11px] uppercase tracking-wider font-semibold text-asra-charcoal mb-1.5">
              Gift Notes or Preferences
            </Label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Wedding Essentials trunk, gold debossed guest registry, destination venue..."
              className="w-full bg-white border border-asra-border rounded-md px-3 py-2 text-xs text-asra-charcoal focus:border-asra-gold focus:outline-none ring-offset-background"
            />
          </div>

          <DialogFooter className="pt-2 sm:justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md transition-all cursor-pointer"
            >
              {isSubmitting ? 'Requesting Appointment...' : 'Confirm Appointment Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
