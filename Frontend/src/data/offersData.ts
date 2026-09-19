// Central Offers & Privileges Database for ASRA Wedding Canvas

export const FEATURED_OFFERS = [
  {
    id: 'hdfc-grandeur',
    code: 'HDFCWED1500',
    partner: 'HDFC BANK',
    partnerType: 'PREFERRED',
    badge: 'Grand Highlight',
    badgeVariant: 'gold',
    title: 'WEDDING GRANDEUR: Flat ₹1,500 OFF',
    description: 'On personalized bridal hampers & wedding essentials suites above ₹7,999 with HDFC Bank Credit & Debit Cards.',
    validity: 'Valid till end of month',
    validityIcon: 'schedule',
    category: 'card',
    minSpend: 7999,
    discountAmount: 1500,
    terms: [
      'Offer valid on HDFC Bank Retail Credit Cards, Debit Cards, and EasyEMI transactions.',
      'Minimum transaction value of ₹7,999 is calculated exclusive of shipping and taxes.',
      'Offer is valid up to 1 transaction per card during the calendar month.',
      'Cannot be clubbed with corporate discount codes or customized bulk invoices.',
      'ASRAWEDDINGCANVAS and HDFC Bank hold rights to alter campaign dates without prior notice.'
    ]
  },
  {
    id: 'cred-instant',
    code: 'CREDCELEBRATE',
    partner: 'CRED',
    partnerType: 'EXCLUSIVE',
    badge: 'Instant UPI Privilege',
    badgeVariant: 'secondary',
    title: 'INSTANT 10% CASHBACK UP TO ₹500',
    description: 'On luxury hampers, registry contributions, and customized gifts above ₹1,999 via CRED UPI & CRED Pay.',
    validity: 'Instant Settled',
    validityIcon: 'bolt',
    category: 'upi',
    minSpend: 1999,
    discountPercent: 10,
    maxDiscount: 500,
    terms: [
      'Valid exclusively for registered CRED members paying via CRED UPI or CRED Pay gateway.',
      'Maximum cashback capped at ₹500 per approved order with minimum cart of ₹1,999.',
      'Cashback is disbursed directly into the user\'s primary linked bank account in the CRED app within 24-48 hours.',
      'Offer is limited to two redemptions per member per calendar month.',
      'Eligible on all customized engraved products and solid wood gift trunks.'
    ]
  }
];

export const BANK_OFFERS = [
  {
    id: 'icici',
    code: 'ICICIASRA',
    partner: 'ICICI Bank',
    badge: 'Trending',
    badgeVariant: 'gold',
    title: '10% Instant Discount up to ₹1,000',
    description: 'Applicable on all ICICI Bank Credit Card full swipe and EMI transactions. Minimum cart value ₹3,999.',
    applicable: 'All Wedding Kits & Hampers',
    applicableIcon: 'verified',
    category: 'card',
    minSpend: 3999,
    terms: [
      'Valid on ICICI Bank Credit Cards and Credit Card EMIs.',
      'Minimum cart value of ₹3,999 is required to activate the discount.',
      'Maximum instant discount capped at ₹1,000 per transaction.',
      'Valid once per cardholder account every 30 days.'
    ]
  },
  {
    id: 'sbi',
    code: 'SBIFESTIVE',
    partner: 'SBI Card',
    badge: 'No Cost EMI',
    badgeVariant: 'secondary',
    title: 'Flat ₹750 OFF on Credit Card EMI',
    description: 'Avail 3 and 6 months No Cost EMI tenures on customized wedding essentials orders. Minimum cart value ₹5,000.',
    applicable: '3M & 6M Tenures',
    applicableIcon: 'calendar_month',
    category: 'emi',
    alsoCard: true,
    minSpend: 5000,
    terms: [
      'Offer valid on SBI Credit Card EMI transactions only.',
      'Applies to 3-month and 6-month tenures.',
      'Minimum order value ₹5,000.',
      'Interest cashback will be credited by SBI within 90 days of transaction date.'
    ]
  },
  {
    id: 'axis',
    code: 'AXISLUXE',
    partner: 'Axis Bank',
    badge: 'Burgundy',
    badgeVariant: 'outline',
    title: 'Flat 12% OFF up to ₹1,200',
    description: 'Exclusive to Axis Bank Neo, Magnus & Burgundy Credit Cards on luxury bridal registry suites. Min spend ₹4,499.',
    applicable: 'Initials Gifts & Registry',
    applicableIcon: 'diamond',
    category: 'card',
    minSpend: 4499,
    terms: [
      'Valid exclusively for Axis Bank Neo, Magnus, and Burgundy cardholders.',
      'Requires minimum checkout order of ₹4,499.',
      'Maximum saving capped at ₹1,200 per order.',
      'Valid across all custom engraved registry gifts.'
    ]
  },
  {
    id: 'kotak',
    code: 'KOTAKGIFT',
    partner: 'Kotak Bank',
    badge: 'Debit Card',
    badgeVariant: 'outline',
    title: 'Flat ₹500 Instant Discount',
    description: 'Seamless instant discount applied on Kotak Debit Card purchases across curated floral and scent gifts. Min cart ₹2,999.',
    applicable: 'All Catalog Products',
    applicableIcon: 'credit_card',
    category: 'card',
    minSpend: 2999,
    terms: [
      'Valid on Kotak Mahindra Bank Debit Cards.',
      'Minimum transaction amount of ₹2,999.',
      'Instant deduction applied at payment checkout page.'
    ]
  },
  {
    id: 'amex',
    code: 'AMEXROYAL',
    partner: 'AMEX',
    partnerStyle: 'bg-inverse-surface text-inverse-on-surface',
    badge: 'Luxury Exclusive',
    badgeVariant: 'gold',
    title: '15% OFF + Complimentary Luxury Perfume',
    description: 'Reserved for Amex Platinum & Centurion Cards. Includes a 50ml customized oud artisan perfume. Min spend ₹9,999.',
    applicable: 'Wedding Essentials & Silver Gifts',
    applicableIcon: 'featured_seasonal_and_gifts',
    category: 'card',
    minSpend: 9999,
    terms: [
      'Reserved for American Express Platinum and Centurion Card members.',
      'Minimum spend of ₹9,999 required.',
      'Complimentary 50ml Oud Artisan Perfume automatically added to packaging during dispatch.'
    ]
  },
  {
    id: 'zeroemi',
    code: 'ZEROEMI',
    partner: 'Collection EMI',
    badge: '0% Interest',
    badgeVariant: 'gold',
    title: 'Split in 3 or 6 Months No-Cost',
    description: 'Spread luxury wedding favor sets or massive bridal hampers with zero processing fee across all major domestic cards.',
    applicable: 'No documentation • Instant Approval',
    applicableIcon: 'payments',
    category: 'emi',
    isAutoApplied: true,
    learnLink: '/bulk-orders',
    terms: [
      '0% processing fee and zero hidden charges.',
      'Available on all major domestic banks (HDFC, ICICI, SBI, Axis, Kotak).',
      'Instant digital authorization at checkout.'
    ]
  }
];

export const UPI_OFFERS = [
  {
    id: 'gpay',
    partner: 'GPAY / PHONEPE',
    reward: 'Flat ₹150 Cashback',
    rewardStyle: 'text-secondary font-bold',
    title: 'First UPI Payment Cashback',
    description: 'Complete your order via any verified UPI app (Google Pay, PhonePe, or BHIM) on orders above ₹1,499.',
    footerText: 'Auto-applied at Checkout',
    footerIcon: 'check_circle',
    category: 'upi',
    minSpend: 1499,
    terms: [
      'Applicable on first UPI payment via Google Pay, PhonePe, or BHIM UPI.',
      'Minimum order total ₹1,499.',
      'Cashback credited to linked bank account within 24 hours.'
    ]
  },
  {
    id: 'paytm',
    partner: 'PAYTM UPI',
    reward: 'Up to ₹300 Scratch Card',
    rewardStyle: 'text-primary font-bold',
    title: 'Assured Cashback Scratch Card',
    description: 'Pay with Paytm UPI handle on cart value above ₹2,000 and receive an instant cashback voucher in Paytm app.',
    footerText: 'No Code Required',
    footerIcon: 'redeem',
    category: 'upi',
    minSpend: 2000,
    terms: [
      'Valid for payments completed via Paytm UPI.',
      'Minimum cart value ₹2,000.',
      'Digital scratch card unlocked directly inside Paytm Cashback & Offers section.'
    ]
  },
  {
    id: 'mobikwik',
    partner: 'MOBIKWIK ZIP',
    reward: 'Flat ₹250 Cashback',
    rewardStyle: 'text-secondary font-bold',
    title: 'Pay Later in 3 Installments',
    description: 'Split wedding orders into 3 equal monthly payments with zero added interest, or claim ₹250 wallet credit.',
    code: 'MOBIASRA',
    category: 'upi',
    minSpend: 1500,
    terms: [
      'Use code MOBIASRA on MobiKwik payment page.',
      'Minimum cart value ₹1,500.',
      'Cashback credited to MobiKwik wallet within 48 hours of successful payment.'
    ]
  }
];

export const STORE_VOUCHERS = [
  {
    id: 'asrafirst',
    badge: 'First Order',
    badgeVariant: 'gold',
    discount: '15% OFF',
    discountStyle: 'text-primary',
    title: 'Welcome to ASRA Collection',
    description: 'Flat 15% discount across all custom framed vows, personalized engraved wooden boxes, and bridesmaids gift sets.',
    subtext: 'Min Order: ₹1,499 • One-time use per guest',
    code: 'ASRAFIRST',
    category: 'collection',
    minSpend: 1499,
    terms: [
      'Valid for first-time orders only on registered accounts.',
      'Requires minimum order value of ₹1,499.',
      'Applicable on custom engraved products, vow books, and wedding essentials hampers.'
    ]
  },
  {
    id: 'wedbliss',
    badge: 'Wedding Hampers',
    badgeVariant: 'secondary',
    discount: '₹800 OFF',
    discountStyle: 'text-secondary',
    title: 'Bride & Groom Suite',
    description: 'Flat ₹800 instant saving on all luxury wicker hampers, matching bride-groom robes, and celebratory wedding essentials packages.',
    subtext: 'Min Order: ₹4,999 • Unlimited wedding orders',
    code: 'WEDBLISS',
    category: 'collection',
    minSpend: 4999,
    terms: [
      'Minimum cart value of ₹4,999.',
      'Can be used across all bridal and groom gift hampers.',
      'Unlimited usage per guest account during the wedding season.'
    ]
  },
  {
    id: 'biglove',
    badge: 'Bulk Favors',
    badgeVariant: 'outline',
    discount: '20% OFF',
    discountStyle: 'text-on-surface',
    title: 'Celebratory Bulk Favor Sets',
    description: 'Flat 20% privilege when ordering 10 or more identical personalized gifts or return gift boxes.',
    subtext: 'Qty: 10+ Units • Includes custom initials tooling',
    code: 'BIGLOVE',
    category: 'collection',
    minQty: 10,
    terms: [
      'Applicable for 10 or more units of the same item.',
      'Includes complimentary 3D monogram CAD proofing and custom dye stamping.',
      'For corporate or customized gift curation, contact concierge desk.'
    ]
  }
];

export const MILESTONE_TIERS = [
  {
    id: 'tier-1',
    threshold: 2500,
    tag: 'CART ≥ ₹2,500',
    icon: 'package_2',
    title: 'Complimentary Gift Box',
    description: 'Handcrafted rigid box adorned with pure satin ribbon and wax seal closure.',
    tierBadge: 'UNLOCKED FIRST TIER',
    valueBadge: 'WORTH ₹350',
    valueColor: 'text-primary'
  },
  {
    id: 'tier-2',
    threshold: 5000,
    tag: 'CART ≥ ₹5,000',
    icon: 'celebration',
    title: 'Flat ₹500 Instant Cart Credit',
    description: 'Direct deduction across all luxury wedding registry and wedding essentials hampers.',
    tierBadge: 'POPULAR SELECTION',
    valueBadge: '10% CART SAVING',
    valueColor: 'text-secondary'
  },
  {
    id: 'tier-3',
    threshold: 10000,
    tag: 'CART ≥ ₹10,000',
    icon: 'workspace_premium',
    title: '₹1,500 OFF + Gold Leaf Gift',
    description: 'Includes customized debossed wooden wedding essentials box and brass-etched tag.',
    tierBadge: 'ULTIMATE COLLECTION TIER',
    valueBadge: 'WORTH ₹2,400+',
    valueColor: 'text-primary'
  }
];

export const OFFER_FAQS = [
  {
    id: 'faq-stacking',
    question: 'Can I combine bank offers with site promo codes?',
    answer: 'Only one promotional voucher code (such as ASRAFIRST or WEDBLISS) may be entered in your cart at a time. However, instantaneous bank card offers and UPI cashbacks operate at the payment gateway level and frequently combine with sitewide milestone tiers automatically.'
  },
  {
    id: 'faq-upi-cashback',
    question: 'How does instant cashback work on UPI payments?',
    answer: 'When choosing CRED Pay or UPI apps (GPay, PhonePe, Paytm), eligible instant discounts are either directly deducted before final PIN entry or refunded into your originating bank account within 24 to 48 hours following transaction authorization.'
  },
  {
    id: 'faq-custom-items',
    question: 'Are discounts applicable on customized wooden products and engraved gifts?',
    answer: 'Yes, entirely. All bank discounts, zero-cost EMI plans, and seasonal vouchers apply to personalized engraved items including solid wood vow tablets, brass etched frames, initials jewelry cases, and bridal wedding essentials hampers.'
  },
  {
    id: 'faq-returns',
    question: 'What happens to the discount if an item is returned or refunded?',
    answer: 'In the unlikely scenario that non-personalized merchandise is approved for return, refunds are computed strictly on the net amount paid after proportional offer deductions. Customized personalized gifts are handcrafted to order and covered under our transit damage protection guarantee.'
  }
];
