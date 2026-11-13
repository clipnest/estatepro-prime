import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryMatrix } from './components/CategoryMatrix';
import { TrustBento } from './components/TrustBento';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PrimeYieldCalculator } from './components/PrimeYieldCalculator';
import { SeoKeywordHub } from './components/SeoKeywordHub';
import { ViewingModal } from './components/ViewingModal';
import { PropertyQuickView } from './components/PropertyQuickView';
import { ConciergeRibbon } from './components/ConciergeRibbon';
import { Footer } from './components/Footer';
import { PROPERTIES } from './data/properties';
import { CurrencyCode, Property } from './types';

export function App() {
  // Theme state: dark (Twilight Noir) or light (Warm Alabaster)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Currency state: PKR (₨), AED (د.إ), USD ($), GBP (£)
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');

  // Category and Search filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mirador_favorites');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  // Modal states
  const [isViewingModalOpen, setIsViewingModalOpen] = useState<boolean>(false);
  const [selectedPropertyForViewing, setSelectedPropertyForViewing] = useState<Property | null>(null);

  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);

  // Initialize theme from localStorage or default to dark (Twilight Noir)
  useEffect(() => {
    const savedTheme = localStorage.getItem('mirador_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.className = 'dark';
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mirador_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('mirador_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.className = nextTheme;
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenScheduleForProperty = (property: Property) => {
    setSelectedPropertyForViewing(property);
    setIsViewingModalOpen(true);
  };

  const handleOpenGeneralSchedule = () => {
    setSelectedPropertyForViewing(null);
    setIsViewingModalOpen(true);
  };

  const handleViewPropertyDetails = (property: Property) => {
    setQuickViewProperty(property);
    setIsQuickViewOpen(true);
  };

  const handleKeywordSearch = (keyword: string) => {
    setSearchFilter(keyword);
    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) {
      propertiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      
      {/* Sticky Top Header & Dual Mode Switcher */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        currency={currency}
        setCurrency={setCurrency}
        onOpenSchedule={handleOpenGeneralSchedule}
        onOpenSearch={() => {
          const el = document.getElementById('hero');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        onOpenFavorites={() => {
          setSelectedCategory('All');
          const el = document.getElementById('properties');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Page Canvas */}
      <main className="flex-1">
        
        {/* Hero Section with Architectural Ambience Simulator & Search */}
        <Hero
          onSearch={(query) => setSearchFilter(query)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 4 Lifestyle Category Cards Matrix */}
        <CategoryMatrix
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('properties');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          selectedCategory={selectedCategory}
        />

        {/* Trust Bento (Penthouse Twilight Backdrop + 4 Security Tiles) */}
        <TrustBento
          onLearnMore={() => {
            const el = document.getElementById('seo-hub');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Handpicked Featured Properties Section */}
        <FeaturedProperties
          properties={PROPERTIES}
          currency={currency}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchFilter={searchFilter}
          onClearFilter={() => setSearchFilter('')}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewProperty={handleViewPropertyDetails}
          onScheduleViewing={handleOpenScheduleForProperty}
        />

        {/* Creative Feature: PrimeYield™ Multi-Currency Investment Calculator */}
        <PrimeYieldCalculator
          currency={currency}
          onOpenSchedule={handleOpenGeneralSchedule}
        />

        {/* 100 Real Estate SEO Keywords Ranking Engine & Knowledge Hub */}
        <SeoKeywordHub
          onSearchKeyword={handleKeywordSearch}
        />

      </main>

      {/* Sticky Bottom Concierge Bar (WhatsApp & Call triggers) */}
      <ConciergeRibbon
        onScheduleCall={handleOpenGeneralSchedule}
      />

      {/* Global Footer */}
      <Footer />

      {/* 2-Step Private Viewing Booking Modal */}
      <ViewingModal
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
        selectedProperty={selectedPropertyForViewing}
        properties={PROPERTIES}
      />

      {/* Property Quick View & Architectural Dossier Modal */}
      <PropertyQuickView
        property={quickViewProperty}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        currency={currency}
        onScheduleViewing={handleOpenScheduleForProperty}
        isFavorite={quickViewProperty ? favorites.includes(quickViewProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

    </div>
  );
}

export default App;
