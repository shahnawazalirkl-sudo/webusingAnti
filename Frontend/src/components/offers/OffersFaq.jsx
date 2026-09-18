import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const OffersFaq = ({ faqs = [] }) => {
  if (!faqs.length) return null;

  return (
    <section className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* FAQ Left Intro */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="font-label-sm text-xs text-primary uppercase tracking-[0.25em] font-semibold">
            Collection Help Desk
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            Have inquiries regarding bank discount eligibility, multi-coupon stacking, or delivery terms for customized gifts? Our concierge desk is on standby.
          </p>

          <div className="mt-8 p-5 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px]">
                support_agent
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-medium leading-snug text-on-surface">
                Wedding Support Desk
              </span>
              <a
                href="mailto:shahnawazalirkl@gmail.com"
                className="font-body-sm text-xs sm:text-sm text-primary hover:underline mt-0.5"
              >
                shahnawazalirkl@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Right */}
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="border border-outline-variant/40 rounded-xl bg-surface-container-lowest shadow-sm px-1"
              >
                <AccordionTrigger className="font-serif text-sm sm:text-base font-medium text-on-surface hover:text-primary px-4 py-4 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-on-surface-variant font-body-sm leading-relaxed px-4 pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default OffersFaq;
