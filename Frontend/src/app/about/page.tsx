"use client";
import Image from "next/image";

import React, { useState } from 'react';

import {
  Sparkles,
  Feather,
  ShieldCheck,
  Layers,
  Globe,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Crown,
  BookOpen,
  Award,
  HelpCircle,
  Send,
  CalendarDays,
  Phone,
  Mail,
  User,
  Check
} from 'lucide-react';

// Shadcn UI Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { toast } from 'sonner';

const AboutUsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState('Jubilee Hills Collection (Hyderabad)');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (salonName) => {
    if (salonName) {
      setSelectedSalon(salonName);
    }
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success('Private Salon Session Requested', {
        description: `Our senior curator will contact ${formData.name || 'you'} via WhatsApp to confirm the appointment for ${selectedSalon}.`
      });
      setFormData({ name: '', phone: '', email: '', eventDate: '', notes: '' });
    }, 600);
  };

  return (
    <div className="bg-asra-cream text-asra-charcoal selection:bg-asra-gold selection:text-white min-h-screen">
      {/* 1. Hero Editorial Section */}
      <section className="relative py-10 sm:py-14 lg:py-16 overflow-hidden" data-purpose="classic-hero">
        {/* Subtle Decorative Background Watermark */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[600px] select-none">
          <Image
            alt="Emblem Watermark"
            className="w-full h-auto"
            src="/assets/cdn/img_875b0894aaaa.png"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Editorial Header Meta */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold tracking-[0.3em] text-asra-goldDark uppercase px-3.5 py-1 border-asra-gold/40 bg-asra-sand/40 rounded-full mb-4"
            >
              Maison de Mariage • Fondée en 2021
            </Badge>
            <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] text-asra-charcoal font-bold tracking-tight leading-[1.15] mb-4">
              Where Royal Gift Artistry Meets Life's Most Cherished Celebrations
            </h1>
            <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-asra-gold to-transparent mx-auto mb-4" />
            <p className="font-serif italic text-sm sm:text-base text-asra-muted leading-relaxed max-w-2xl mx-auto font-light">
              Born in the historic artisan enclaves of Hyderabad and Bengaluru, ASRA Wedding Canvas revives the timeless traditions of royal wedding essentials casing, heavy brass intaglio debossing, and 24-karat gold leaf detailing for modern milestone ceremonies.
            </p>
          </div>

          {/* Two-Column Editorial Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Collection Narrative & Pull Quote */}
            <article className="lg:col-span-7 space-y-4">
              <div className="border-l-2 border-asra-gold pl-4 py-1">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-asra-goldDark block mb-0.5">
                  The Genesis Narrative
                </span>
                <h2 className="font-display text-xl sm:text-2xl text-asra-charcoal font-bold leading-snug">
                  Turning fleeting digital moments into generational physical heirlooms.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                In an era dominated by transient digital files and fleeting cloud galleries, ASRA Wedding Canvas was established with a singular devotion: restoring the weight, texture, and sacred dignity of marriage milestones. Our journey began within traditional South Asian metalcraft workshops and classic bookbinderies, hand-tooling bridal gifts for discerning families across the globe.
              </p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                Every creation leaving our salon is treated as a museum artifact. We do not mass-produce; each piece requires hours of meticulous hand-assembly, 24K gold foil stamping, bevel-cut museum mats, and precision brass insignia engraving.
              </p>

              {/* Pull Quote Box */}
              <div className="bg-asra-ivory p-5 sm:p-6 border border-asra-border relative shadow-sm mt-4 rounded-lg">
                <span className="text-5xl font-serif text-asra-gold/25 absolute top-2 left-3 leading-none select-none">“</span>
                <p className="font-serif text-sm sm:text-base text-asra-charcoal italic leading-relaxed relative z-10 pl-4">
                  Every union is an heirloom narrative waiting to be immortalized in gold, silk, and teakwood. We craft not merely for the wedding day, but for the anniversaries a half-century away.
                </p>
                <div className="mt-4 pl-4 pt-3 border-t border-asra-border/60 flex items-center justify-between">
                  <div>
                    <p className="font-display text-[11px] font-bold uppercase tracking-widest text-asra-charcoal">The Master Guild of ASRA</p>
                    <p className="text-[10px] text-asra-goldDark tracking-wider">Collection de Haute Gravure</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-asra-gold/50 flex items-center justify-center text-xs text-asra-gold">
                    ⚜
                  </div>
                </div>
              </div>
            </article>

            {/* Right Column: Framed Master Crest Emblem with Guild Certificate Seal */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full p-4 bg-white border border-asra-gold/40 shadow-xl rounded-xl">
                {/* Corner Ornaments */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-asra-gold" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-asra-gold" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-asra-gold" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-asra-gold" />

                {/* Inner Mat Frame */}
                <div className="bg-asra-sand/20 border border-asra-border p-5 sm:p-6 flex flex-col items-center text-center relative rounded-lg">
                  {/* Velvet Ribbon Tag */}
                  <div className="absolute -top-3.5 bg-asra-charcoal text-asra-goldLight border border-asra-gold/40 text-[8px] uppercase tracking-[0.25em] px-3 py-0.5 font-semibold shadow-md rounded-full">
                    Official Guild Emblem
                  </div>

                  {/* Gold Crest Initials Image */}
                  <div className="my-3 transform transition-transform hover:scale-105 duration-500 relative">
                    <Image
                      alt="ASRA Wedding Canvas Master Initials Crest"
                      className="w-48 sm:w-52 h-auto max-h-[190px] mx-auto object-contain filter drop-shadow-md"
                      src="/assets/cdn/img_863a6bfc47db.png"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }} fill loading="lazy" sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="border-t border-asra-border w-full pt-3 mt-1">
                    <h3 className="font-cinzel text-xs uppercase tracking-widest font-bold text-asra-charcoal">
                      Seal of Provenance
                    </h3>
                    <p className="text-[10px] text-asra-muted font-light mt-0.5">
                      Certified Master Jewel Inlay &amp; 24K Leaf Standard
                    </p>

                    {/* Certificate Badge */}
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-asra-sand/60 px-3 py-1 border border-asra-gold/30 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-asra-goldDark" />
                      <span className="text-[9px] tracking-wider uppercase font-semibold text-asra-charcoal">
                        Registered Archive No. 892-HYD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Craft Pillars Section (Modernized with shadcn Card & Badge) */}
      <section className="py-12 sm:py-14 bg-white border-y border-asra-border" data-purpose="craft-pillars">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold tracking-[0.3em] text-asra-goldDark uppercase mb-2 border-asra-gold/40"
            >
              The Four Cornerstones
            </Badge>
            <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-asra-charcoal font-bold tracking-tight">
              The Collection Craft Pillars
            </h2>
            <Separator className="w-14 h-[2px] bg-asra-gold mx-auto my-3" />
            <p className="text-xs sm:text-sm text-asra-muted font-light">
              Every bridal canvas, wedding essentials trunk, and anniversary gift suite is shaped around four uncompromised collection standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar I */}
            <Card className="bg-asra-ivory border-asra-border hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-[10px] text-asra-goldDark font-bold tracking-widest">PILLAR I</span>
                  <div className="w-8 h-8 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30 text-asra-goldDark">
                    <Feather className="w-4 h-4" />
                  </div>
                </div>
                <CardTitle className="font-display text-base font-bold text-asra-charcoal">
                  Sovereign Calligraphy &amp; Crests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0">
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Hand-drawn customized initials, heraldic marital insignias, and custom CNC brass stamping dies drafted specifically for your family ancestry.
                </p>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-3 border-t border-asra-border/60">
                <span className="text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                  Customized Heraldry Guild
                </span>
              </CardFooter>
            </Card>

            {/* Pillar II */}
            <Card className="bg-asra-ivory border-asra-border hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-[10px] text-asra-goldDark font-bold tracking-widest">PILLAR II</span>
                  <div className="w-8 h-8 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30 text-asra-goldDark">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <CardTitle className="font-display text-base font-bold text-asra-charcoal">
                  Noble Materials &amp; Provenance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0">
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Full-grain Tuscan vegetable-tanned leathers, Lyon French silk velvet, solid reclaimed teakwood bases, and museum-grade optical crystal acrylics.
                </p>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-3 border-t border-asra-border/60">
                <span className="text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                  100% Certified Origins
                </span>
              </CardFooter>
            </Card>

            {/* Pillar III */}
            <Card className="bg-asra-ivory border-asra-border hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-[10px] text-asra-goldDark font-bold tracking-widest">PILLAR III</span>
                  <div className="w-8 h-8 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30 text-asra-goldDark">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>
                <CardTitle className="font-display text-base font-bold text-asra-charcoal">
                  1-on-1 Bridal Support
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0">
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Dedicated customized stylists, complimentary photorealistic 3D proofing within 6 hours, and zero mass warehousing. Every gift is born on demand.
                </p>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-3 border-t border-asra-border/60">
                <span className="text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                  Personalized Collection Lead
                </span>
              </CardFooter>
            </Card>

            {/* Pillar IV */}
            <Card className="bg-asra-ivory border-asra-border hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-[10px] text-asra-goldDark font-bold tracking-widest">PILLAR IV</span>
                  <div className="w-8 h-8 rounded-full bg-asra-sand/60 flex items-center justify-center border border-asra-gold/30 text-asra-goldDark">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
                <CardTitle className="font-display text-base font-bold text-asra-charcoal">
                  White-Glove Global Handover
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0">
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Fully insured, shock-cushioned and climate-stabilized delivery across 40+ countries. Direct suite &amp; ballroom delivery for royal destination weddings.
                </p>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-3 border-t border-asra-border/60">
                <span className="text-[9px] uppercase tracking-wider text-asra-goldDark font-semibold">
                  Global Palace Courier
                </span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Interactive Artisanal Materials & Guild Discipline (Shadcn Tabs) */}
      <section className="py-12 sm:py-16 bg-asra-sand/30 border-b border-asra-border" data-purpose="interactive-materials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold tracking-[0.3em] text-asra-goldDark uppercase mb-2 border-asra-gold/40"
            >
              Artisanal Material Laboratory
            </Badge>
            <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-asra-charcoal font-bold tracking-tight">
              Noble Mediums of the Maison
            </h2>
            <Separator className="w-14 h-[2px] bg-asra-gold mx-auto my-3" />
            <p className="text-xs sm:text-sm text-asra-muted font-light">
              Explore the sensory textures, archival papers, and metallurgical finishes curated for ASRA wedding keepsakes.
            </p>
          </div>

          <Tabs defaultValue="leather" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/80 border border-asra-gold/30 p-1 flex-wrap h-auto gap-1">
                <TabsTrigger
                  value="leather"
                  className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
                >
                  Tuscan Leather &amp; Teakwood
                </TabsTrigger>
                <TabsTrigger
                  value="silk"
                  className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
                >
                  Lyon Silk Velvet &amp; Zari
                </TabsTrigger>
                <TabsTrigger
                  value="gold"
                  className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
                >
                  24K Gold Leaf &amp; Brass Dies
                </TabsTrigger>
                <TabsTrigger
                  value="acrylic"
                  className="data-[state=active]:bg-asra-gold data-[state=active]:text-white text-xs px-4 py-2"
                >
                  Optical Crystal Acrylic
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Leather */}
            <TabsContent value="leather">
              <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                      Certified Provenance: Santa Croce sull'Arno, Italy
                    </Badge>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                      Full-Grain Vegetable-Tanned Tuscan Hide
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                      Tanned naturally using chestnut bark and mimosa tannins over 40 days, our leather preserves the raw grain structure of every hide. Hand-beveled along every edge, each wedding album vault and keepsake chest develops a lustrous, golden amber patina with age.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Organic Wax Conditioning</div>
                        <div className="text-[10px] text-asra-muted">Resistant to humidity and temperature shifts</div>
                      </div>
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Sustainably Sourced Teak</div>
                        <div className="text-[10px] text-asra-muted">Aged 50+ year plantation reclaimed timber</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
                    <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                      Vault Longevity Standard
                    </div>
                    <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">100+ Years</div>
                    <p className="text-xs text-asra-muted font-light">
                      Engineered for multi-generational longevity without cracking or synthetic delamination.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 2: Silk */}
            <TabsContent value="silk">
              <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                      Certified Provenance: Lyon, France &amp; Varanasi Zari
                    </Badge>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                      Loomed French Silk Velvet &amp; Metallic Zari
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                      Lined with deep French silk velvet that absorbs light to create an opulent backdrop for your keepsake jewelry, vow folios, and bridal accessories. Woven with authentic gold-dipped zari ribbons that never fray.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Microfiber Cushioning</div>
                        <div className="text-[10px] text-asra-muted">Prevents micro-abrasions on rings and gold jewelry</div>
                      </div>
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Fray-Proof Weave</div>
                        <div className="text-[10px] text-asra-muted">Precision hand-stitched borders with silk filament</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
                    <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                      Touch &amp; Texture Index
                    </div>
                    <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">Haute Velvet</div>
                    <p className="text-xs text-asra-muted font-light">
                      Double-sided plush lining in Champagne, Bordeaux, and Royal Midnight Navy.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 3: Gold */}
            <TabsContent value="gold">
              <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                      Certified Standard: 24K Dual-Layer Hot Foil Fusion
                    </Badge>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                      Solid CNC Brass Dies &amp; Pure Gold Leaf
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                      Unlike superficial surface printing, our intaglio debossing uses heavy heated solid brass dies under 2.5 tons of pressure. The 24-karat gold leaf fuses permanently into the fibers of the leather and archival papers.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Permanent Die Vault</div>
                        <div className="text-[10px] text-asra-muted">Your custom couple die is preserved forever in our archive</div>
                      </div>
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Zero Rub-Off Guarantee</div>
                        <div className="text-[10px] text-asra-muted">Thermal fusion resistant to handling and moisture</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
                    <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                      Deboss Depth Precision
                    </div>
                    <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">0.8 mm</div>
                    <p className="text-xs text-asra-muted font-light">
                      Tactile deep-relief intaglio that you can feel with every touch.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab 4: Acrylic */}
            <TabsContent value="acrylic">
              <Card className="bg-white border-asra-border shadow-sm p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <Badge variant="outline" className="text-[10px] text-asra-goldDark uppercase tracking-wider">
                      Optical Grade: Diamond Polished Crystal Acrylic
                    </Badge>
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-asra-charcoal">
                      Sub-Millimeter Optical Laser Etching
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                      Crafted from ultra-pure lucite with 99.4% optical clarity, diamond-faceted at 45-degree angles and illuminated with laser precision for Spotify code plaques, vow displays, and luxury wedding table numbers.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">UV Non-Yellowing</div>
                        <div className="text-[10px] text-asra-muted">Guaranteed to remain crystal clear in sunlight</div>
                      </div>
                      <div className="bg-asra-ivory p-3 border border-asra-border rounded">
                        <div className="text-[11px] font-bold text-asra-charcoal uppercase">Diamond Polished Bevel</div>
                        <div className="text-[10px] text-asra-muted">Smooth, gemstone-grade perimeter finish</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-asra-sand/20 border border-asra-border p-6 text-center rounded-lg">
                    <div className="font-cinzel text-xs uppercase tracking-widest text-asra-goldDark font-bold mb-1">
                      Clarity Rating
                    </div>
                    <div className="font-cormorant text-4xl font-bold text-asra-charcoal my-2">99.4%</div>
                    <p className="text-xs text-asra-muted font-light">
                      Higher optical transmission than standard float glass.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 4. Master Craft Milestones Bar */}
      <section className="bg-asra-charcoal text-white py-10 sm:py-12 border-y border-asra-gold/30" data-purpose="master-craft-milestones">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-asra-gold/20">
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-1">3,500+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Customized Heirlooms Crafted</div>
              <div className="text-[9px] text-gray-400 mt-1 font-light">Cherished across 14 countries</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-1">100%</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Vault Made-To-Order</div>
              <div className="text-[9px] text-gray-400 mt-1 font-light">Zero generic mass-inventory</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-1">40+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Palace &amp; Destination Weddings</div>
              <div className="text-[9px] text-gray-400 mt-1 font-light">Udaipur, Como, Bali &amp; Dubai</div>
            </div>
            <div className="p-2 sm:p-3">
              <div className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-asra-goldLight mb-1">
                4.98<span className="text-xl text-asra-gold">/5</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium">Connoisseur Rating</div>
              <div className="text-[9px] text-gray-400 mt-1 font-light">Verified couple testimonials</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Flagship Studios & Private Salons (Modernized with shadcn Card) */}
      <section className="py-12 sm:py-16 bg-white" data-purpose="flagship-studios" id="salons">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold tracking-[0.3em] text-asra-goldDark uppercase mb-2 border-asra-gold/40"
            >
              Private Viewing &amp; Swatch Tastings
            </Badge>
            <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-asra-charcoal font-bold tracking-tight">
              Our Private Salons &amp; Flagship Studios
            </h2>
            <Separator className="w-14 h-[2px] bg-asra-gold mx-auto my-3" />
            <p className="text-xs sm:text-sm text-asra-muted font-light">
              Experience our material archives in person. Feel hand-loomed velvets, touch engraved brass dies, and review personalized typographic layouts with our creative directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Studio 1: Hyderabad */}
            <Card className="bg-asra-ivory border-asra-border hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>Collection No. 01</span>
                  <Badge variant="outline" className="text-[8px] border-asra-gold/30 bg-asra-gold/10">
                    Foundry &amp; Guild
                  </Badge>
                </div>
                <CardTitle className="font-cinzel text-lg font-bold text-asra-charcoal mb-1">
                  Jubilee Hills Collection
                </CardTitle>
                <CardDescription className="text-xs text-asra-muted font-light flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-asra-goldDark shrink-0" />
                  Road No. 36, Jubilee Hills, Hyderabad 500033
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-2">
                <div className="space-y-2 text-xs text-gray-700 py-3 border-y border-asra-border font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-asra-gold shrink-0" />
                    <span>Live Brass Debossing Foundry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-asra-gold shrink-0" />
                    <span>Customized Wax Initials Archive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-asra-gold shrink-0" />
                    <span>Strictly by Private Appointment</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-0">
                <Button
                  type="button"
                  onClick={() => handleOpenModal('Jubilee Hills Collection (Hyderabad)')}
                  variant="outline"
                  className="w-full text-xs uppercase font-semibold tracking-wider border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white"
                >
                  Reserve Jubilee Hills Salon
                </Button>
              </CardFooter>
            </Card>

            {/* Studio 2: Bengaluru */}
            <Card className="bg-asra-ivory border-asra-border hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>Collection No. 02</span>
                  <Badge variant="outline" className="text-[8px] border-asra-gold/30 bg-asra-gold/10">
                    Design Laboratory
                  </Badge>
                </div>
                <CardTitle className="font-cinzel text-lg font-bold text-asra-charcoal mb-1">
                  Indiranagar Studio
                </CardTitle>
                <CardDescription className="text-xs text-asra-muted font-light flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-asra-goldDark shrink-0" />
                  12th Main Road, Indiranagar, Bengaluru 560038
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-2">
                <div className="space-y-2 text-xs text-gray-700 py-3 border-y border-asra-border font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-asra-gold shrink-0" />
                    <span>Modern Optical Acrylic Gallery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-asra-gold shrink-0" />
                    <span>Contemporary Bridal Gift Suites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-asra-gold shrink-0" />
                    <span>Walk-ins Welcome (Tue–Sun, 11am–8pm)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-0">
                <Button
                  type="button"
                  onClick={() => handleOpenModal('Indiranagar Studio (Bengaluru)')}
                  variant="outline"
                  className="w-full text-xs uppercase font-semibold tracking-wider border-asra-charcoal text-asra-charcoal hover:bg-asra-charcoal hover:text-white"
                >
                  Reserve Bengaluru Visit
                </Button>
              </CardFooter>
            </Card>

            {/* Studio 3: Global WhatsApp Concierge */}
            <Card className="bg-asra-sand/40 border-asra-gold/40 hover:border-asra-gold transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-asra-goldDark font-semibold mb-2">
                  <span>Virtual Salon</span>
                  <Badge variant="outline" className="text-[8px] bg-emerald-50 text-emerald-800 border-emerald-300 font-bold">
                    Live Worldwide
                  </Badge>
                </div>
                <CardTitle className="font-cinzel text-lg font-bold text-asra-charcoal mb-1">
                  Private Support Desk
                </CardTitle>
                <CardDescription className="text-xs text-asra-muted font-light flex items-center gap-1.5 pt-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  Serving UAE, UK, USA, Singapore &amp; Pan-India
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-2">
                <div className="space-y-2 text-xs text-gray-700 py-3 border-y border-asra-border font-light">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Direct 1-on-1 WhatsApp Senior Stylist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Complimentary 3D Digital Proofs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Global Express Diplomatic Shipping</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 sm:p-6 pt-0">
                <a
                  className="w-full"
                  href="https://wa.me/919692668263?text=Hello%20ASRA%20Team%2C%20I%20would%20like%20to%20inquire%20about%20custom%20wedding%20keepsakes"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button className="w-full text-xs uppercase font-semibold tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Connect on WhatsApp
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Heritage & Commissioning FAQ (Shadcn Accordion) */}
      <section className="py-12 sm:py-16 bg-asra-sand/20 border-t border-asra-border" data-purpose="heritage-faq">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge
              variant="outline"
              className="text-[10px] font-semibold tracking-[0.3em] text-asra-goldDark uppercase mb-2 border-asra-gold/40"
            >
              Maison Inquiries
            </Badge>
            <h2 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-asra-charcoal font-bold tracking-tight">
              Heritage &amp; Commissioning FAQ
            </h2>
            <Separator className="w-14 h-[2px] bg-asra-gold mx-auto my-3" />
            <p className="text-xs sm:text-sm text-asra-muted font-light">
              Important details on bespoke lead times, confidentiality charters, and global concierge handling.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="item-1" className="border border-asra-border bg-white rounded-lg">
              <AccordionTrigger className="px-5 py-4 font-serif text-sm font-semibold text-asra-charcoal hover:text-asra-goldDark">
                What is the typical lead time for a bespoke bridal suite or trunk?
              </AccordionTrigger>
              <AccordionContent className="px-5 text-xs text-gray-600 leading-relaxed font-light">
                Standard bespoke commissions require 10 to 18 business days for manual tooling, hot-foil brass debossing, and luxury velvet casing. For urgent wedding celebrations, we offer an expedited 5-day Rush Atelier service with dedicated priority courier handover.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-asra-border bg-white rounded-lg">
              <AccordionTrigger className="px-5 py-4 font-serif text-sm font-semibold text-asra-charcoal hover:text-asra-goldDark">
                Do you offer Non-Disclosure Agreements (NDAs) for high-profile unions?
              </AccordionTrigger>
              <AccordionContent className="px-5 text-xs text-gray-600 leading-relaxed font-light">
                Yes, absolutely. We routinely sign bilateral NDAs for royal, celebrity, and private estate unions. All photographic proofs, initials dies, and event dates remain strictly vaulted and will never be published without explicit written consent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-asra-border bg-white rounded-lg">
              <AccordionTrigger className="px-5 py-4 font-serif text-sm font-semibold text-asra-charcoal hover:text-asra-goldDark">
                Can I order a physical material swatch folio before commissioning?
              </AccordionTrigger>
              <AccordionContent className="px-5 text-xs text-gray-600 leading-relaxed font-light">
                Yes! We can ship a complimentary physical Folio Box featuring leather swatches, French silk velvet ribbons, and stamped 24K gold leaf samples directly to your residence before you finalize your custom order.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-asra-border bg-white rounded-lg">
              <AccordionTrigger className="px-5 py-4 font-serif text-sm font-semibold text-asra-charcoal hover:text-asra-goldDark">
                How is international shipping and climate insurance handled?
              </AccordionTrigger>
              <AccordionContent className="px-5 text-xs text-gray-600 leading-relaxed font-light">
                Every international heirloom parcel is double-boxed in high-density shock absorbers, climate-stabilized to preserve natural waxes and silk fibers, and fully insured through DHL Express Diplomatic handling across 40+ destinations worldwide.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-12 sm:py-16 bg-asra-sand/60 border-t border-asra-border" data-purpose="bridal-support-cta" id="support">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-asra-gold" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-asra-goldDark uppercase">
              Private Bridal Reservations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-asra-gold" />
          </div>
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-asra-charcoal font-bold mb-3 leading-tight">
            Ready to Immortalize Your Wedding Gifts?
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-asra-muted max-w-xl mx-auto mb-6">
            Schedule a customized consultation with our Master Bridal Stylist or order our physical velvet &amp; gold leaf swatch folio delivered directly to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              type="button"
              onClick={() => handleOpenModal('Customized Bridal Salon')}
              className="w-full sm:w-auto px-7 py-5 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Private Consultation
            </Button>
            <a
              className="w-full sm:w-auto"
              href="https://wa.me/919692668263?text=Hello%20ASRA%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20bridal%20consultation"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto px-7 py-5 bg-white hover:bg-asra-cream text-asra-charcoal border-asra-border text-xs font-semibold uppercase tracking-[0.2em]"
              >
                WhatsApp Head Concierge <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-asra-gold" />
              </Button>
            </a>
          </div>
          <p className="text-[9px] text-gray-400 mt-5 tracking-wider uppercase">
            Confidentiality Guaranteed • Non-Disclosure Agreements Honored for High-Profile Unions
          </p>
        </div>
      </section>

      {/* 8. Modernized Salon Reservation Dialog (Shadcn Dialog + Form Controls + Sonner) */}
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
                className="w-full py-5 bg-asra-gold hover:bg-asra-goldDark text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-md transition-all"
              >
                {isSubmitting ? 'Requesting Appointment...' : 'Confirm Appointment Request'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutUsPage;
