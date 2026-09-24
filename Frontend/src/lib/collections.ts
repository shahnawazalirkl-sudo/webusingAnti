export const CATEGORIES = [
  'All Collections',
  'Bridal & Wedding Essentials Series',
  'The Heirloom Woodcraft',
  'Botanical & Floral Preservation',
  'Velvet & Gilded Leather',
  'Celestial Acrylic & Soundwave',
  'Destination Wedding Favors',
  'Royal Classic Suite',
];

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'all': 'All Collections',
  'all-collections': 'All Collections',
  'bridal-trousseau': 'Bridal & Wedding Essentials Series',
  'bridal-trousseau-series': 'Bridal & Wedding Essentials Series',
  'bridal-wedding-essentials': 'Bridal & Wedding Essentials Series',
  'bridal-wedding-essentials-series': 'Bridal & Wedding Essentials Series',
  'heirloom-woodcraft': 'The Heirloom Woodcraft',
  'the-heirloom-woodcraft': 'The Heirloom Woodcraft',
  'floral-preservation': 'Botanical & Floral Preservation',
  'botanical-floral-preservation': 'Botanical & Floral Preservation',
  'velvet-leather': 'Velvet & Gilded Leather',
  'velvet-gilded-leather': 'Velvet & Gilded Leather',
  'celestial-acrylic': 'Celestial Acrylic & Soundwave',
  'celestial-acrylic-soundwave': 'Celestial Acrylic & Soundwave',
  'destination-favors': 'Destination Wedding Favors',
  'destination-wedding-favors': 'Destination Wedding Favors',
  'royal-heritage': 'Royal Classic Suite',
  'royal-heritage-suite': 'Royal Classic Suite',
  'royal-classic': 'Royal Classic Suite',
  'royal-classic-suite': 'Royal Classic Suite',
};

export const resolveCategory = (param?: string | null): string => {
  if (!param) return 'All Collections';
  const lower = param.toLowerCase().trim();
  if (CATEGORY_SLUG_MAP[lower]) return CATEGORY_SLUG_MAP[lower];
  const matched = CATEGORIES.find((c) => c.toLowerCase() === lower);
  if (matched) return matched;
  return 'All Collections';
};
