import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Headphones, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Lock,
  FileCheck
} from 'lucide-react';

interface TrustBentoProps {
  onLearnMore: () => void;
}

export const TrustBento: React.FC<TrustBentoProps> = ({ onLearnMore }) => {
  return (
    <section id="why-choose-us" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Bento Container with Penthouse Twilight Visual */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl">
        
        {/* Background Visual: Luxury Penthouse Interior overlooking Skyline */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Penthouse Interior Overlooking City Skyline"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
        </div>

        {/* Bento Content Grid */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-6 space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 text-[#E5B869] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Choose EstatePro</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Your Trusted <br />
              <span className="text-[#E5B869]">Real Estate Partner</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-lg font-normal leading-relaxed">
              We provide expert guidance, verified listings and complete support to help you find the perfect property. Eliminate transaction risk with our verified title deed audits and discreet private office representation.
            </p>

            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="gold-glow-btn px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 cursor-pointer shadow-lg"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Glassmorphic Feature Tiles */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tile 1: Verified Listings */}
            <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-[#E5B869]/50 transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] mb-3.5 group-hover:scale-105 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Verified Listings
              </h3>
              <p className="text-xs text-white/70">
                100% Genuine Properties with certified title deeds and clean revenue checks.
              </p>
            </div>

            {/* Tile 2: Expert Guidance */}
            <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-[#E5B869]/50 transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 mb-3.5 group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Expert Guidance
              </h3>
              <p className="text-xs text-white/70">
                From Start to Finish. Senior partners guide your legal, tax, and asset acquisition.
              </p>
            </div>

            {/* Tile 3: Best Locations */}
            <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-[#E5B869]/50 transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mb-3.5 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Best Locations
              </h3>
              <p className="text-xs text-white/70">
                Prime Areas Only. Handpicked in DHA, E-11, Bahria, Downtown Dubai, and Mayfair.
              </p>
            </div>

            {/* Tile 4: After-Sales Support */}
            <div className="p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-[#E5B869]/50 transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#E5B869]/20 border border-[#E5B869]/40 text-[#E5B869] mb-3.5 group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                After-Sales Support
              </h3>
              <p className="text-xs text-white/70">
                We're Always Here. Full turnkey property management, tenant leasing, and resale.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
