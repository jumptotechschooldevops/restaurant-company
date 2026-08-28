import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useReservationModal } from '../context/ReservationModalContext';
import MenuCard from '../components/MenuCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useReservationModal();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getMenu();
        setFeaturedItems(data.filter(item => item.featured).slice(0, 6)); // Top 6 featured
      } catch (error) {
        console.error("Failed to load featured items");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <SEO
        title="Authentic Italian Cuisine"
        description="Enjoy handcrafted pasta, wood-fired pizzas, fresh seafood, and premium steaks at Bella Vista Italian Kitchen."
        schema={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "Bella Vista Italian Kitchen",
          "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&q=80",
          "@id": "",
          "url": "https://www.bellavista.com",
          "telephone": "(312) 555-9876",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "100 Michigan Avenue",
            "addressLocality": "Chicago",
            "addressRegion": "IL"
          }
        }}
      />
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&q=80"
            alt="Bella Vista Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-charcoal/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-cream mb-6 leading-tight"
          >
            Authentic Italian Cuisine Made with Passion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-cream/90 mb-10 max-w-2xl mx-auto"
          >
            Enjoy handcrafted pasta, wood-fired pizzas, fresh seafood, premium steaks, and homemade desserts prepared daily with the finest ingredients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              type="button"
              onClick={openModal}
              className="bg-brand-burgundy text-brand-cream px-8 py-4 rounded-md font-semibold text-lg hover:bg-brand-burgundy/90 transition-colors shadow-lg"
            >
              Online Reservation
            </button>
            <Link
              to="/menu"
              className="bg-brand-white text-brand-charcoal px-8 py-4 rounded-md font-semibold text-lg hover:bg-brand-white/90 transition-colors shadow-lg"
            >
              View Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-burgundy mb-4">Chef's Specials</h2>
            <p className="text-brand-charcoal/70 max-w-2xl mx-auto">
              Discover our most beloved dishes, crafted with seasonal ingredients and traditional Italian techniques.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
             <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-brand-burgundy font-semibold hover:text-brand-burgundy/80 transition-colors group"
            >
              Explore Full Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Short About Section */}
      <section className="py-20 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                alt="Restaurant interior"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-gold p-8 rounded-2xl shadow-lg hidden md:block">
                <p className="text-4xl font-serif font-bold text-brand-charcoal mb-1">25+</p>
                <p className="text-brand-charcoal/80 font-medium">Years of Excellence</p>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-burgundy mb-6">A Taste of Italy in Every Bite</h2>
              <p className="text-brand-charcoal/80 mb-6 leading-relaxed">
                At Bella Vista, we believe that great food starts with great ingredients. That's why we source our produce locally when possible and import our specialty cheeses, olive oils, and cured meats directly from Italy.
              </p>
              <p className="text-brand-charcoal/80 mb-8 leading-relaxed">
                Our head chef, Marco Rossi, brings generations of family recipes to your table, ensuring an authentic dining experience that will transport you straight to the heart of Tuscany.
              </p>
              <Link
                to="/about"
                className="inline-block border-2 border-brand-burgundy text-brand-burgundy px-6 py-3 rounded-md font-semibold hover:bg-brand-burgundy hover:text-brand-cream transition-colors"
              >
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
