import React from 'react';
import { Calendar } from 'lucide-react';
import ReservationForm from '../components/ReservationForm';

export default function Reservations() {
  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Calendar className="w-12 h-12 text-brand-burgundy mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-burgundy mb-4">Reserve a Table</h1>
          <p className="text-brand-charcoal/70 max-w-xl mx-auto">
            Join us for an unforgettable dining experience. For parties larger than 8, please contact the restaurant directly.
          </p>
        </div>

        <div className="bg-brand-white rounded-2xl shadow-md p-6 md:p-10">
          <ReservationForm idPrefix="page-" />
        </div>
      </div>
    </div>
  );
}
