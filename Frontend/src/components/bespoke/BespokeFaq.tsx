import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const BESPOKE_FAQS = [
  {
    id: 'faq-1',
    question: 'How does the digital mockup and approval process work?',
    answer: 'Within 48 hours of submitting your brief or booking a consultation, our design atelier generates high-resolution 3D renders with exact dimensions, typography samples, and foil finishes. We offer unlimited minor revisions until you provide 100% written approval before any physical crafting begins.'
  },
  {
    id: 'faq-2',
    question: 'Can you work with our custom wedding logo or couple monogram?',
    answer: 'Yes, absolutely. You can upload vector files (AI, EPS, SVG, PDF) or high-res images directly in the form or via WhatsApp. Our metallurgical artisan will create custom bronze stamping dies for your heraldry or initials.'
  },
  {
    id: 'faq-3',
    question: 'How are delicate materials like preserved flowers and Makrana marble shipped?',
    answer: 'All bespoke heirlooms are enclosed in shock-absorbing foam inserts inside custom wooden reinforcement crates, accompanied by tamper-evident wax seals and delivery insurance. We partner with specialized express white-glove couriers across India and internationally.'
  },
  {
    id: 'faq-4',
    question: 'Can you deliver directly to our destination wedding venue or hotel?',
    answer: 'Yes! We coordinate directly with your wedding planner or venue concierge across Udaipur, Jaipur, Goa, Mumbai, Dubai, and worldwide to guarantee safe, timely delivery into the bridal suite before ceremony prep begins.'
  },
  {
    id: 'faq-5',
    question: 'What is the standard production timeline for custom trunks & sculptures?',
    answer: 'Standard handcrafted commissions take 5 to 10 working days after digital proof approval. For urgent weddings, we offer Priority Express Atelier crafting (48–72 hours) upon request.'
  }
];

const BespokeFaq = () => {
  return (
    <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="gold" className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2">
            Curator Assurance
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
            Everything you need to know about our customized design journey and delivery guarantees.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-3">
          {BESPOKE_FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border border-outline-variant/40 rounded-xl shadow-xs">
              <AccordionTrigger className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-on-surface">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-xs text-on-surface-variant leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default BespokeFaq;
