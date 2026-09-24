import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactFormClient from '@/components/contact/ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact & Private Appointments | ASRA Wedding Canvas',
  description: 'Schedule a private bridal tasting, visit our flagship salons in Hyderabad and Bengaluru, or arrange a 1-on-1 virtual design consultation.',
  openGraph: {
    title: 'Contact & Private Appointments | ASRA Wedding Canvas',
    description: 'Schedule a private bridal tasting, visit our flagship salons in Hyderabad and Bengaluru, or arrange a 1-on-1 virtual design consultation.',
    url: 'https://asraweddingcanvas.com/contact',
    siteName: 'ASRA Wedding Canvas',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-asra-cream text-asra-charcoal selection:bg-asra-gold selection:text-white min-h-screen">
      
      {/* 2. Breadcrumbs Navigation (Server Rendered) */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 pb-2 text-[11px] uppercase tracking-widest text-asra-muted" data-purpose="breadcrumbs">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-asra-gold transition-colors">Home</Link>
          </li>
          <li className="text-asra-gold/50">/</li>
          <li>
            <Link href="/about" className="hover:text-asra-gold transition-colors">Support &amp; Salons</Link>
          </li>
          <li className="text-asra-gold/50">/</li>
          <li className="text-asra-charcoal font-semibold">Contact &amp; Private Appointments</li>
        </ol>
      </nav>

      {/* 3. Hero Editorial Section (Server Rendered) */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-asra-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center max-w-4xl mx-auto mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.35em] text-asra-gold uppercase px-4 py-1.5 border border-asra-gold/40 bg-asra-sand/30 rounded-full mb-4">
            PRIVATE BRIDAL SALONS &amp; COLLECTION SUPPORT
          </span>
          <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl text-asra-charcoal font-bold tracking-tight leading-[1.1] mb-5">
            Schedule a Private Tasting &amp; Customized Consultation
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-asra-gold to-transparent mx-auto mb-6"></div>
          <p className="font-serif italic text-lg sm:text-xl text-asra-muted leading-relaxed max-w-2xl mx-auto font-light">
            Step into our sanctuaries in Jubilee Hills &amp; Indiranagar, or connect directly with our Master Support worldwide to curate your wedding heirlooms, wedding essentials casing, and heraldic crests.
          </p>
        </div>

        {/* Direct Channels (3 Luxury Cards) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: WhatsApp Support */}
            <div className="luxury-card bg-white p-8 border border-asra-border flex flex-col justify-between relative shadow-sm hover:border-asra-gold transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-asra-goldDark font-bold tracking-widest">DIRECT CHANNEL · I</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold uppercase rounded-sm">24/7 Global</span>
                </div>
                <h3 className="font-display text-xl font-bold text-asra-charcoal">Instant WhatsApp Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Dedicated bridal support on WhatsApp for instant digital proofs, live swatch photos &amp; immediate quote assistance. Active 24/7 across IST, GST, GMT &amp; EST.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-asra-border/60 space-y-2">
                <a
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Support,%20I%20would%20like%20to%20inquire%20about%20custom%20wedding%20keepsakes%20and%20consultation%20appointments."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-xs uppercase font-semibold tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                  </svg>
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Card 2: Private Flagship Salons */}
            <div className="luxury-card bg-white p-8 border border-asra-border flex flex-col justify-between relative shadow-sm hover:border-asra-gold transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-asra-goldDark font-bold tracking-widest">DIRECT CHANNEL · II</span>
                  <span className="px-2 py-0.5 bg-asra-sand text-asra-charcoal border border-asra-border text-[9px] font-bold uppercase rounded-sm">Salons</span>
                </div>
                <h3 className="font-display text-xl font-bold text-asra-charcoal">Private Flagship Salons</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Hand-feel loomed French velvets, 24K gold foil stamp proofs, and live brass debossing vault viewings. Hyderabad &amp; Bengaluru studios.<br />
                  <span className="text-asra-goldDark font-medium mt-1 inline-block">Tuesday – Sunday, 11:00 AM – 7:30 PM</span>
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-asra-border/60">
                <a
                  href="#reservation-docket"
                  className="inline-flex items-center justify-center w-full py-2.5 text-xs uppercase font-semibold tracking-wider border border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white transition-colors cursor-pointer"
                >
                  Select Collection Location
                </a>
              </div>
            </div>

            {/* Card 3: Royal Gifting Desk */}
            <div className="luxury-card bg-white p-8 border border-asra-border flex flex-col justify-between relative shadow-sm hover:border-asra-gold transition-colors">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs text-asra-goldDark font-bold tracking-widest">DIRECT CHANNEL · III</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-asra-goldDark border border-asra-gold/30 text-[9px] font-bold uppercase rounded-sm">Customized VIP</span>
                </div>
                <h3 className="font-display text-xl font-bold text-asra-charcoal">Corporate &amp; Royal Gifting Desk</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Specialized desks for destination weddings (Udaipur, Lake Como, Bali), bulk gifts, VIP diplomatic registries, and non-disclosure custom suites.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-asra-border/60">
                <a
                  href="mailto:shahnawazalirkl@gmail.com?subject=Private%20Bridal%20Consultation%20Inquiry"
                  className="inline-flex items-center justify-center w-full py-2.5 text-xs uppercase font-semibold tracking-wider bg-asra-gold hover:bg-asra-goldDark text-white transition-colors"
                >
                  shahnawazalirkl@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Client Interactive Reservation Form, Salon Selector, FAQ & Swatch Modal */}
      <ContactFormClient />

    </div>
  );
}
