"use client";

import React, { useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import BulkHero from '@/components/bulk/BulkHero';
import BulkPriceCalculator from '@/components/bulk/BulkPriceCalculator';
import BulkTiersGrid from '@/components/bulk/BulkTiersGrid';
import BulkCatalogGrid from '@/components/bulk/BulkCatalogGrid';
import BulkInquiryForm from '@/components/bulk/BulkInquiryForm';
import BulkCaseStudies from '@/components/bulk/BulkCaseStudies';
import BulkFaq from '@/components/bulk/BulkFaq';
import BulkSampleBoxDialog from '@/components/bulk/BulkSampleBoxDialog';

export default function BulkOrderFormClient() {
  const { showToast } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleInitialProduct, setSampleInitialProduct] = useState<any>(null);

  const [dossierItems, setDossierItems] = useState([
    'Mulberry Silk Robe & Stole Suite'
  ]);

  const [formData, setFormData] = useState({
    milestone: 'welcome-kit',
    quantity: '76-200',
    eventDate: '',
    destination: '',
    coupleNames: '',
    budget: '1000-2000',
    contactName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const inquiryFormRef = useRef<HTMLDivElement>(null);
  const volumeTiersRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add signature favor to dossier
  const handleAddItemToDossier = (item: string | { name: string }) => {
    const itemName = typeof item === 'string' ? item : item.name;
    setDossierItems((prev) => {
      if (prev.includes(itemName)) {
        showToast(`"${itemName}" is already in your inquiry dossier.`);
        return prev;
      }
      showToast(`Added "${itemName}" to your inquiry dossier!`);
      return [...prev, itemName];
    });
  };

  // Remove favor from dossier
  const handleRemoveDossierItem = (itemName: string) => {
    setDossierItems((prev) => prev.filter((item) => item !== itemName));
    showToast(`Removed "${itemName}" from your inquiry dossier.`);
  };

  // Transfer from Live Calculator
  const handleTransferEstimate = (estimate: any) => {
    handleAddItemToDossier(estimate.productName);

    // Map quantity to form dropdown value
    let qtyRange = '76-200';
    if (estimate.quantity <= 75) qtyRange = '25-75';
    else if (estimate.quantity <= 200) qtyRange = '76-200';
    else if (estimate.quantity <= 500) qtyRange = '201-500';
    else qtyRange = '500+';

    setFormData((prev) => ({
      ...prev,
      quantity: qtyRange,
      notes: prev.notes
        ? `${prev.notes}\n[Estimated ${estimate.quantity} units of ${estimate.productName} @ ₹${estimate.effectivePerUnit}/u with ${estimate.discount} discount]`
        : `[Estimated ${estimate.quantity} units of ${estimate.productName} @ ₹${estimate.effectivePerUnit}/u with ${estimate.discount} discount]`
    }));

    scrollToSection(inquiryFormRef);
    showToast(`Transferred ${estimate.quantity}× ${estimate.productName} estimate to your dossier!`);
  };

  // Select a tier from the volume privileges cards
  const handleSelectTier = (tierValue: string, tierRange: string) => {
    setFormData((prev) => ({ ...prev, quantity: tierValue }));
    scrollToSection(inquiryFormRef);
    showToast(`Selected ${tierRange} tier pricing for your celebration.`);
  };

  const handleOpenSampleModal = (product: any = null) => {
    setSampleInitialProduct(product);
    setSampleModalOpen(true);
  };

  const handleSubmitSampleRequest = (sampleData: any) => {
    showToast(`Sample box request shipped for ${sampleData.name}! Confirmation sent to WhatsApp.`);
  };

  const handleSubmitInquiry = (data: any) => {
    setFormSubmitted(true);
    showToast('Bulk Concierge Inquiry received! A bridal stylist will connect on WhatsApp within 2 hours.');
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormData({
      milestone: '',
      quantity: '',
      eventDate: '',
      destination: '',
      coupleNames: '',
      budget: '1000-2000',
      contactName: '',
      phone: '',
      email: '',
      notes: ''
    });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <BulkHero
        onOpenSampleModal={() => handleOpenSampleModal()}
        onScrollToSection={scrollToSection}
        refs={{ inquiryFormRef, calculatorRef, volumeTiersRef }}
      />

      {/* 2. Interactive Real-Time Price & Savings Calculator */}
      <div ref={calculatorRef}>
        <BulkPriceCalculator onTransferEstimate={handleTransferEstimate} />
      </div>

      {/* 3. Tier Comparison Matrix */}
      <div ref={volumeTiersRef}>
        <BulkTiersGrid
          selectedTierValue={formData.quantity}
          onSelectTier={handleSelectTier}
          onScrollToForm={() => scrollToSection(inquiryFormRef)}
        />
      </div>

      {/* 4. Filterable Signature Catalog */}
      <BulkCatalogGrid
        onAddItemToDossier={handleAddItemToDossier}
        onOpenSampleModal={handleOpenSampleModal}
      />

      {/* 5. Concierge Inquiry Form & Assurance */}
      <BulkInquiryForm
        inquiryFormRef={inquiryFormRef}
        formData={formData}
        setFormData={setFormData}
        dossierItems={dossierItems}
        onRemoveDossierItem={handleRemoveDossierItem}
        onOpenSampleModal={() => handleOpenSampleModal()}
        onSubmitInquiry={handleSubmitInquiry}
        formSubmitted={formSubmitted}
        onResetForm={handleResetForm}
      />

      {/* 6. Case Studies & Testimonials */}
      <BulkCaseStudies />

      {/* 7. FAQs, Trust Badges, Corporate & Logistics Anchors */}
      <BulkFaq />

      {/* Master Sample Box Modal */}
      <BulkSampleBoxDialog
        open={sampleModalOpen}
        onOpenChange={setSampleModalOpen}
        initialProduct={sampleInitialProduct}
        onSubmitSampleRequest={handleSubmitSampleRequest}
      />
    </>
  );
}
