import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building, 
  Home, 
  Users, 
  Star, 
  ShieldCheck, 
  Sun, 
  Sunset, 
  Moon, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AmbienceTime } from '../types';

interface HeroProps {
  onSearch: (query: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectCategory }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [ambience, setAmbience] = useState<AmbienceTime>('twilight');

  // Ambience images for the architectural villa
  const AMBIENCE_IMAGES: Record<AmbienceTime, { url: string; label: string; mood: string; overlay: string }> = {
    dawn: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
      label: 'Golden Hour Dawn',
      mood: 'Warm morning radiance & crisp sunrise horizon',
      overlay: 'from-amber-950/40 via-stone-900/60 to-[#0B0E14]',
    },
    midday: {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
      label: 'Midday Sunlight',
      mood: 'Brilliant natural clarity & azure pool illumination',
      overlay: 'from-sky-950/30 via-slate-900/50 to-[#0B0E14]',
    },
    twilight: {
      url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=90',
      label: 'Twilight Noir',
      mood: 'Evening golden glow through double-height glass walls',
      overlay: 'from-[#0B0E14]/50 via-[#0B0E14]/75 to-[#0B0E14]',
    },
  };

  const currentAmbience = AMBIENCE_IMAGES[ambience];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      onSearch(searchLocation.trim());
      const el = document.getElementById('properties');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchLocation(tag);
    onSearch(tag);
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-6 pb-12 sm:pb-16">
      
      {/* Background Architectural Canvas with Ambience Switcher */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentAmbience.url}
          alt="Modern Architectural Villa at Twilight"
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-in-out scale-105"
        />
        {/* Cinematic Gradient Overlays for perfect readability */}
        <div className={`absolute inset-0 bg-gradient-to-b ${currentAmbience.overlay} transition-all duration-1000`} />
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-[0.88]" />
      </div>

      {/* Floating Ambience Simulator Control (Creative Feature) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-end pt-2">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white/80 shadow-lg">
          <span className="hidden sm:inline px-2.5 text-[11px] font-medium text-white/60">
            Ambience:
          </span>
          <button
            onClick={() => setAmbience('dawn')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
              ambience === 'dawn'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'hover:text-white text-white/60'
            }`}
            title="Preview Villa at Dawn"
          >
            <SunriseIcon className="w-3.5 h-3.5" />
            <span>Dawn</span>
          </button>
          <button
            onClick={() => setAmbience('midday')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
              ambience === 'midday'
                ? 'bg-sky-500/25 text-sky-300 border border-sky-400/40 shadow-sm'
                : 'hover:text-white text-white/60'
            }`}
            title="Preview Villa at Midday"
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Midday</span>
          </button>
          <button
            onClick={() => setAmbience('twilight')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
              ambience === 'twilight'
                ? 'bg-[#E5B869]/30 text-[#E5B869] border border-[#E5B869]/50 shadow-sm'
                : 'hover:text-white text-white/60'
            }`}
            title="Preview Villa at Twilight"
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Twilight</span>
          </button>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Search, Tags */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-sm">
              <Home className="w-3.5 h-3.5 text-[#E5B869]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-white/95">
                Modern Living Awaits
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Find Your <br />
              <span className="bg-gradient-to-r from-white via-[#F5DEB3] to-[#E5B869] bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-white/80 max-w-2xl font-normal leading-relaxed">
              Discover premium properties in top locations. Modern design. Better lifestyle. Brighter tomorrow. Curated villas, penthouses, and high-yield capital assets.
            </p>

            {/* Multi-parameter Hero Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl">
              <div className="relative flex items-center p-1.5 sm:p-2 rounded-full bg-white/95 dark:bg-[#141923]/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#E5B869]">
                <div className="flex items-center pl-3 sm:pl-4 text-[var(--accent-gold)]">
                  <MapPin className="w-5 h-5 text-[#E5B869]" />
                </div>
                
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Enter location (e.g. Lahore, Dubai, Islamabad)..."
                  className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base font-medium text-slate-900 dark:text-white bg-transparent placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none"
                />

                <button
                  type="submit"
                  className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#E5B869] to-[#D4A350] text-[#0B0E14] hover:shadow-lg hover:shadow-[#E5B869]/30 transition-all transform active:scale-95 cursor-pointer shrink-0"
                  aria-label="Submit search"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </form>

            {/* Popular Search Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm">
              <span className="text-white/70 font-medium">Popular:</span>
              {['Lahore', 'Karachi', 'Islamabad', 'Dubai', 'London'].map((city) => (
                <button
                  key={city}
                  onClick={() => handleQuickTagClick(city)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-white/90 text-xs font-medium transition-all hover:border-[#E5B869] cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Floating Glass Architectural Badge */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="p-6 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/15 text-white max-w-xs shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E5B869]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-[#E5B869] mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">Signature Standard</span>
              </div>
              <h3 className="font-cursive-luxury text-2xl font-normal leading-snug mb-1 text-[#F8FAFC]">
                More Than Just Properties
              </h3>
              <p className="text-xs text-white/70 font-medium tracking-wide">
                A Better Way of Living
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span>100% Title Verified</span>
                <span className="text-[#E5B869] font-semibold">Private Desk</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Proof Bar (4 Metrics) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-black/55 backdrop-blur-xl border border-white/10 text-white shadow-xl">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-3 p-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#E5B869]/15 border border-[#E5B869]/30 text-[#E5B869] shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
                1,200+
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 font-medium">
                Properties Listed
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3 p-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
                850+
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 font-medium">
                Happy Clients
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3 p-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
                4.9/5
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 font-medium">
                Client Rating
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3 p-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 font-medium">
                Secure Process
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

function SunriseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v6" />
      <path d="m4.93 10.93 4.24-4.24" />
      <path d="m19.07 10.93-4.24-4.24" />
      <path d="M2 18h20" />
      <path d="M20 18a8 8 0 0 0-16 0" />
    </svg>
  );
}
