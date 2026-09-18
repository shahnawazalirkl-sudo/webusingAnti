import React from 'react';
import { Button } from '@/components/ui/button';

const ShopPagination = ({
  currentPage,
  totalPages,
  totalFiltered,
  showAllProducts,
  onPageChange,
  onToggleShowAll,
}) => {
  if (totalFiltered === 0) return null;

  return (
    <nav
      aria-label="Catalog pagination"
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-xs"
    >
      <span className="font-body-sm text-xs text-on-surface-variant" aria-live="polite">
        {showAllProducts ? (
          <>
            Showing all <strong className="text-on-surface font-semibold">{totalFiltered}</strong> Handcrafted Designs
          </>
        ) : (
          <>
            Page <strong className="text-on-surface font-semibold">{currentPage}</strong> of{' '}
            <strong className="text-on-surface font-semibold">{totalPages}</strong> •{' '}
            {totalFiltered} Handcrafted Designs
          </>
        )}
      </span>

      <div className="flex items-center gap-1.5">
        {/* Previous Page Button */}
        <Button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || showAllProducts}
          variant="outline"
          size="icon"
          className="w-9 h-9 rounded-lg"
          aria-label="Previous page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </Button>

        {/* Page Number Buttons */}
        {!showAllProducts &&
          [...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = currentPage === pageNum;
            return (
              <Button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                variant={isActive ? 'default' : 'outline'}
                size="icon"
                className={`w-9 h-9 rounded-lg text-xs font-bold ${
                  isActive ? 'shadow-xs' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </Button>
            );
          })}

        {/* Next Page Button */}
        <Button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || showAllProducts}
          variant="outline"
          size="icon"
          className="w-9 h-9 rounded-lg"
          aria-label="Next page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </Button>
      </div>

      {/* View All / Paginate Toggle */}
      <Button
        onClick={onToggleShowAll}
        variant={showAllProducts ? 'secondary' : 'outline'}
        size="sm"
        className="h-9 px-3.5 text-xs font-semibold gap-1.5"
        aria-pressed={showAllProducts}
      >
        <span>{showAllProducts ? 'Paginate Catalog' : `View All (${totalFiltered})`}</span>
        <span className="material-symbols-outlined text-[16px]">
          {showAllProducts ? 'compress' : 'expand_all'}
        </span>
      </Button>
    </nav>
  );
};

export default ShopPagination;
