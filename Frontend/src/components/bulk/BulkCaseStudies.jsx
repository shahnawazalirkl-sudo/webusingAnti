import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { BULK_CASE_STUDIES } from '../../data/bulkOrdersData';

const BulkCaseStudies = () => {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-14 bg-surface-container-low border-y border-outline-variant/30">
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <Badge variant="outline" className="text-primary border-primary/30 bg-[#FAF4EB] uppercase tracking-[0.2em] px-3 py-1 font-semibold text-[10px] sm:text-[11px] mb-2">
            Real Celebrations
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-on-surface">
            Destination Wedding &amp; Royal Gala Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
            Discover how ASRA Wedding Canvas designed and delivered memory-making favor suites across India's most prestigious palatial resorts and luxury international destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {BULK_CASE_STUDIES.map((study) => (
            <Card
              key={study.id}
              className="border-outline-variant/30 bg-surface-container-lowest shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <CardContent className="p-5 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[10px] sm:text-[11px] uppercase font-semibold">
                      {study.locationTag}
                    </Badge>
                    <span className="font-mono text-xs text-primary font-bold bg-[#FAF4EB] px-2 py-0.5 rounded border border-primary/20">
                      {study.unitsBadge}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-medium leading-snug text-on-surface mb-2">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-on-surface-variant italic mb-4 leading-relaxed">
                    "{study.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30 mt-2">
                  <div className="w-10 h-10 rounded-full bg-[#FAF4EB] border border-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    {study.initials}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-on-surface font-semibold">{study.couple}</p>
                    <p className="text-[11px] text-outline">{study.subInfo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BulkCaseStudies;
