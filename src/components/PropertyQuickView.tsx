import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Heart, 
  Calendar, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  TrendingUp, 
  Phone
} from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { formatPrice } from '../data/exchangeRates';

interface PropertyQuickViewProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onScheduleViewing: (p: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyQuickView: React.FC<PropertyQuickViewProps> = ({
  property,
  isOpen,
  onClose,
  currency,
  onScheduleViewing,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(property.id)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 transition-transform active:scale-90 cursor-pointer"
            title="Toggle Favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 transition-transform active:scale-90 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Hero */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={property.gallery[activeImageIndex] || property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute bottom-4 left-4 z-10 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md ${
              property.tag === 'For Sale' ? 'bg-[#10B981] text-white' : 'bg-[#3B82F6] text-white'
            }`}>
              {property.tag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
              {property.architecturalStyle}
            </span>
          </div>

          {/* Gallery Thumbnails */}
          {property.gallery.length > 1 && (
            <div className="absolute bottom-4 right-4 z-10 flex gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
              {property.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#E5B869] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-[var(--text-muted)]">Official Asking Price</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent-gold)]">
                {formatPrice(property.pricePKR, currency, property.pricePeriod)}
              </div>
            </div>
          </div>

          {/* Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--bg-subsurface)] border border-[var(--border-subtle)]">
              <div className="text-[11px] text-[var(--text-muted)]">Bedrooms</div>
              <div className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5 mt-0.5">
                <Bed className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{property.beds > 0 ? `${property.beds} Suites` : 'Open Floor'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-subsurface)] border border-[var(--border-subtle)]">
              <div className="text-[11px] text-[var(--text-muted)]">Bathrooms</div>
              <div className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5 mt-0.5">
                <Bath className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{property.baths} Baths</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-subsurface)] border border-[var(--border-subtle)]">
              <div className="text-[11px] text-[var(--text-muted)]">Total Footprint</div>
              <div className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5 mt-0.5">
                <Maximize2 className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{property.area}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-subsurface)] border border-[var(--border-subtle)]">
              <div className="text-[11px] text-[var(--text-muted)]">Projected ROI</div>
              <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <TrendingUp className="w-4 h-4" />
                <span>{property.roiProjected}% / year</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Architectural Overview
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-primary)]/90 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          {/* Key Features List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Verified Amenities & Security
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Security Guarantee Badge */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-emerald-400">100% Genuine Title Guarantee</div>
              <div className="text-[var(--text-muted)]">
                Property verified by Mirador Prime Legal Counsel with certified revenue registry documentation.
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onScheduleViewing(property);
              }}
              className="w-full sm:w-2/3 gold-glow-btn py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Private Viewing Walkthrough</span>
            </button>

            <a
              href={`https://wa.me/97143128900?text=Hello%20Mirador%20team,%20I%20am%20inquiring%20about%20${encodeURIComponent(property.title)}%20(${property.location})`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-1/3 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
