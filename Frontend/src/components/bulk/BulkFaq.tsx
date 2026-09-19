import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { BULK_FAQS } from '../../data/bulkOrdersData';

const BulkFaq = () => {
  return (
    <section id="faq" className="w-full py-8 sm:py-10 lg:py-14 bg-surface">
      {/* Anchors to support Header dropdown navigation */}
      <div id="corporate" className="relative -top-20" />
      <div id="logistics" className="relative -top-20" />

      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="text-primary border-primary/30 bg-[#FAF4EB] uppercase tracking-[0.2em] px-3 py-1 font-semibold text-[10px] sm:text-[11px] mb-2">
            Frequently Asked Questions
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            Bulk Gifting, Corporate Invoicing &amp; Logistics FAQ
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
            Everything you need to know about physical master samples, MOQ limits, 18% GST input tax credit, and destination room delivery.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible defaultValue="sample-box" className="space-y-3">
            {BULK_FAQS.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-outline-variant/40 bg-surface-container-lowest shadow-2xs rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="text-xs sm:text-sm font-medium hover:text-primary px-4 sm:px-5 py-3.5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-on-surface-variant leading-relaxed px-4 sm:px-5 pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 4 Brand Trust & Process Ribbons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 text-center pt-4 border-t border-outline-variant/30">
          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">fingerprint</span>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">100% Custom Craft</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              No generic stock. Each suite is designed and personalized from scratch.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">flight_takeoff</span>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Insured Global Transit</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Safe express air courier delivery to 140+ countries and domestic luxury hubs.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">verified_user</span>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Wax-Sealed Signature</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Official ASRA hallmark verification and gold-embossed authenticity card.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[28px] mb-2">support_agent</span>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">Dedicated Concierge</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Direct 1-on-1 WhatsApp bridal stylist support from inception to final dispatch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkFaq;
