import React from 'react';
import { useCart } from '../../context/CartContext';

const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-on-surface text-surface px-5 py-3.5 rounded-xl shadow-2xl border border-primary/40 flex items-center gap-3 max-w-md">
        <span className="material-symbols-outlined text-primary-fixed text-[20px]">verified</span>
        <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
};

export default Toast;
