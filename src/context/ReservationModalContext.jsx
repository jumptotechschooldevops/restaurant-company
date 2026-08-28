import React, { createContext, useContext, useState, useCallback } from 'react';
import ReservationModal from '../components/ReservationModal';

const ReservationModalContext = createContext(null);

export function useReservationModal() {
  const context = useContext(ReservationModalContext);
  if (!context) {
    throw new Error('useReservationModal must be used within ReservationModalProvider');
  }
  return context;
}

export function ReservationModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(0);

  const openModal = useCallback(() => {
    setSession((prev) => prev + 1);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ReservationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ReservationModal isOpen={isOpen} session={session} onClose={closeModal} />
    </ReservationModalContext.Provider>
  );
}
