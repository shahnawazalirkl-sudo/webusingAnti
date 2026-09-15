import React, { useState } from 'react';

const LocationModal = ({ isOpen, onClose, onSelectCity }) => {
  const [pincode, setPincode] = useState('');
  const [verifiedCity, setVerifiedCity] = useState(null);

  if (!isOpen) return null;

  const popularCities = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Jaipur', 'Udaipur', 'Goa', 'Hyderabad', 'Chennai'];

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setVerifiedCity(`Pincode ${pincode} eligible for Free Insured Express Delivery`);
    } else {
      setVerifiedCity('Please enter a valid 6-digit Indian delivery pincode');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/60 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface p-1 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2.5 text-primary mb-2">
          <span className="material-symbols-outlined text-[24px]">location_on</span>
          <h3 className="font-serif text-lg font-semibold text-on-surface">Select Delivery Location</h3>
        </div>
        <p className="text-body-sm text-xs text-on-surface-variant mb-5">
          Enter your wedding or residence pincode to check dispatch transit times and customized white-glove availability.
        </p>

        <form onSubmit={handlePincodeCheck} className="flex gap-2 mb-4">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit pincode"
            className="flex-1 bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/60 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Check
          </button>
        </form>

        {verifiedCity && (
          <div className="p-3 bg-secondary-container/20 rounded-lg text-xs text-on-surface border border-secondary-container/60 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px]">local_shipping</span>
            <span>{verifiedCity}</span>
          </div>
        )}

        <div className="border-t border-outline-variant/40 pt-4">
          <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-2 font-semibold">
            Popular Wedding Destinations
          </span>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container-high rounded-md text-xs font-medium text-on-surface transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
