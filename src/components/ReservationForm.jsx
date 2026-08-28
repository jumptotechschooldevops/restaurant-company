import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { Button } from './Button';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
};

const TIME_OPTIONS = [
  { value: '17:00', label: '5:00 PM' },
  { value: '17:30', label: '5:30 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '18:30', label: '6:30 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '19:30', label: '7:30 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '20:30', label: '8:30 PM' },
  { value: '21:00', label: '9:00 PM' },
];

const inputClassName =
  'w-full rounded-md border border-brand-charcoal/20 bg-brand-cream/50 focus:border-brand-burgundy focus:ring-brand-burgundy px-4 py-2.5';

function formatTime(time) {
  const option = TIME_OPTIONS.find((slot) => slot.value === time);
  return option ? option.label : time;
}

export default function ReservationForm({
  idPrefix = '',
  onSuccess,
  onCancel,
  showCancel = false,
  compact = false,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState('idle');
  const [confirmation, setConfirmation] = useState(null);

  const fieldId = (name) => `${idPrefix}${name}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const result = await api.createReservation(formData);
      setConfirmation(result.confirmationCode);
      setStatus('success');
      onSuccess?.(result, formData);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <CheckCircle2 className="w-14 h-14 text-brand-olive mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-brand-burgundy mb-3">Table Reserved!</h3>
        <p className="text-brand-charcoal/80 mb-5">
          Thank you, {formData.name}. Your reservation has been confirmed. We have sent the details to{' '}
          {formData.email}.
        </p>
        <div className="bg-brand-cream p-4 rounded-lg mb-5">
          <p className="text-sm text-brand-charcoal/60 uppercase tracking-wider mb-1">Confirmation Code</p>
          <p className="text-xl font-mono font-bold text-brand-charcoal">{confirmation}</p>
        </div>
        <p className="text-sm text-brand-charcoal/60">
          We look forward to serving you on {new Date(formData.date).toLocaleDateString()} at{' '}
          {formatTime(formData.time)}.
        </p>
        {showCancel && onCancel && (
          <div className="mt-6">
            <Button type="button" onClick={onCancel}>
              Close
            </Button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-6'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor={fieldId('name')} className="block text-sm font-medium text-brand-charcoal mb-1">
            Name *
          </label>
          <input
            type="text"
            id={fieldId('name')}
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor={fieldId('email')} className="block text-sm font-medium text-brand-charcoal mb-1">
            Email *
          </label>
          <input
            type="email"
            id={fieldId('email')}
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor={fieldId('phone')} className="block text-sm font-medium text-brand-charcoal mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id={fieldId('phone')}
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor={fieldId('guests')} className="block text-sm font-medium text-brand-charcoal mb-1">
            Number of Guests *
          </label>
          <select
            id={fieldId('guests')}
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className={inputClassName}
          >
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={fieldId('date')} className="block text-sm font-medium text-brand-charcoal mb-1">
            Date *
          </label>
          <input
            type="date"
            id={fieldId('date')}
            name="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.date}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor={fieldId('time')} className="block text-sm font-medium text-brand-charcoal mb-1">
            Time *
          </label>
          <select
            id={fieldId('time')}
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className={inputClassName}
          >
            <option value="">Select a time</option>
            {TIME_OPTIONS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">
          There was an error processing your reservation. Please try again or call us.
        </p>
      )}

      <div className={`flex flex-col sm:flex-row gap-3 ${compact ? '' : 'pt-4 border-t border-brand-charcoal/10'}`}>
        {showCancel && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="sm:order-1">
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size={compact ? 'md' : 'lg'}
          className="w-full sm:w-auto sm:min-w-[200px]"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Confirming...' : 'Book Reservation'}
        </Button>
      </div>
    </form>
  );
}
