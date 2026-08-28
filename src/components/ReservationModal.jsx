import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReservationForm from './ReservationForm';

export default function ReservationModal({ isOpen, session, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close reservation form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-charcoal/60"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-brand-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2
                  id="reservation-modal-title"
                  className="text-2xl md:text-3xl font-serif font-bold text-brand-burgundy"
                >
                  Online Reservation
                </h2>
                <p className="text-brand-charcoal/70 text-sm mt-1">
                  Book your table in just a few steps.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-brand-charcoal/60 hover:text-brand-burgundy transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <ReservationForm
              key={session}
              idPrefix="modal-"
              compact
              showCancel
              onCancel={onClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
