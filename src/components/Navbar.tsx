import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  PhoneCall, 
  Compass, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { EXCHANGE_RATES } from '../data/exchangeRates';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  onOpenSchedule: () => void;
  onOpenSearch: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  currency,
  setCurrency,
  onOpenSchedule,
  onOpenSearch,
  favoritesCount,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-xl border-b border-[var(--border-subtle)] bg-[var(--glass-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Monogram */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#E5B869] to-[#99732B] text-[#0B0E14] shadow-md shadow-[#E5B869]/20 transition-transform duration-300 group-hover:scale-105">
              <Building2 className="w-6 h-6 stroke-[2]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[var(--bg-canvas)]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  EstatePro
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] border border-[var(--border-gold)]">
                  PRIME
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-[var(--text-muted)]">
                Find. Invest. Live Better
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[var(--text-muted)]">
            <a href="#hero" className="hover:text-[var(--accent-gold)] transition-colors duration-200">
              Home
            </a>
            <a href="#properties" className="hover:text-[var(--accent-gold)] transition-colors duration-200">
              Properties
            </a>
            <a href="#categories" className="hover:text-[var(--accent-gold)] transition-colors duration-200">
              Categories
            </a>
            <a href="#why-choose-us" className="hover:text-[var(--accent-gold)] transition-colors duration-200">
              About
            </a>
            <a href="#calculator" className="hover:text-[var(--accent-gold)] transition-colors duration-200 flex items-center gap-1">
              <span>PrimeYield™</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono">ROI</span>
            </a>
            <a href="#seo-hub" className="hover:text-[var(--accent-gold)] transition-colors duration-200 flex items-center gap-1">
              <span>SEO Hub</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] font-mono font-bold">100</span>
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="appearance-none cursor-pointer pl-2.5 pr-7 py-1.5 text-xs font-semibold rounded-lg bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)] transition-all"
                aria-label="Select currency"
              >
                {(Object.keys(EXCHANGE_RATES) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                    {c} ({EXCHANGE_RATES[c].symbol})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--text-muted)]">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Favorites Icon Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-subsurface)] border border-transparent hover:border-[var(--border-subtle)] transition-all"
              title="Saved Favorites"
              aria-label="Saved properties"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Search Quick Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subsurface)] border border-transparent hover:border-[var(--border-subtle)] transition-all"
              title="Quick Search"
              aria-label="Search properties"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-[var(--bg-subsurface)] border border-[var(--border-subtle)] transition-all"
              title={theme === 'dark' ? 'Switch to Warm Alabaster Light Mode' : 'Switch to Twilight Noir Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-[#E5B869] animate-spin-slow transition-transform hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 transition-transform hover:-rotate-45" />
              )}
            </button>

            {/* Primary Action Button (Get Started / Schedule Viewing) */}
            <button
              onClick={onOpenSchedule}
              className="gold-glow-btn px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-muted)] border border-[var(--border-subtle)]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#E5B869]" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text-primary)] bg-[var(--bg-subsurface)] border border-[var(--border-subtle)]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-subsurface)] text-[var(--text-primary)]"
            >
              Home
            </a>
            <a 
              href="#properties" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-subsurface)] text-[var(--text-primary)]"
            >
              Properties
            </a>
            <a 
              href="#categories" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-subsurface)] text-[var(--text-primary)]"
            >
              Categories
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-subsurface)] text-[var(--text-primary)]"
            >
              About
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-subsurface)] text-[var(--text-primary)] flex items-center justify-between"
            >
              <span>PrimeYield™ Calculator</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">ROI Matrix</span>
            </a>
            <a 
              href="#seo-hub" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-subsurface)] text-[var(--text-primary)] flex items-center justify-between"
            >
              <span>100 SEO Keyword Hub</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]">Top Rank</span>
            </a>
          </nav>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-muted)]">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="py-1 px-2 text-xs font-semibold rounded bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
              >
                {(Object.keys(EXCHANGE_RATES) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="gold-glow-btn px-4 py-2 rounded-full text-xs font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
