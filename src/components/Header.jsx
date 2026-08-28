import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useReservationModal } from '../context/ReservationModalContext';
import { cn } from '../utils/cn';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { openModal } = useReservationModal();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Events & Catering', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleOpenReservation = () => {
    setIsMobileMenuOpen(false);
    openModal();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-cream/95 backdrop-blur-sm border-b border-brand-burgundy/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-bold text-brand-burgundy font-serif tracking-tight">
              Bella Vista
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-burgundy",
                  isActive(link.path) ? "text-brand-burgundy" : "text-brand-charcoal/80"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              type="button"
              onClick={openModal}
              className="bg-brand-burgundy text-brand-cream px-4 py-2 rounded-md hover:bg-brand-burgundy/90 transition-colors text-sm font-medium"
            >
              Online Reservation
            </button>
            <Link to="/menu" className="hidden lg:block bg-brand-burgundy text-brand-cream px-4 py-2 rounded-md font-semibold text-sm hover:bg-brand-burgundy/90 transition-colors shadow-sm mr-2">
              Order Online
            </Link>
            <Link to="/cart" className="relative p-2 text-brand-charcoal hover:text-brand-burgundy transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-brand-cream transform translate-x-1/4 -translate-y-1/4 bg-brand-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-brand-charcoal">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-brand-cream bg-brand-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-charcoal hover:text-brand-burgundy"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-brand-burgundy/10 bg-brand-cream px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-3 rounded-md text-base font-medium",
                isActive(link.path) ? "bg-brand-burgundy/10 text-brand-burgundy" : "text-brand-charcoal hover:bg-brand-burgundy/5"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <button
              type="button"
              onClick={handleOpenReservation}
              className="w-full flex justify-center py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-brand-cream bg-brand-burgundy hover:bg-brand-burgundy/90"
            >
              Online Reservation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
