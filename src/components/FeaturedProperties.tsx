import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Heart, 
  ArrowRight, 
  Filter, 
  Calendar,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Property, CurrencyCode } from '../types';
import { formatPrice } from '../data/exchangeRates';

interface FeaturedPropertiesProps {
  properties: Property[];
  currency: CurrencyCode;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchFilter: string;
  onClearFilter: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewProperty: (property: Property) => void;
  onScheduleViewing: (property: Property) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  currency,
  selectedCategory,
  onSelectCategory,
  searchFilter,
  onClearFilter,
  favorites,
  onToggleFavorite,
  onViewProperty,
  onScheduleViewing,
}) => {
  const [filterTag, setFilterTag] = useState<'All' | 'For Sale' | 'For Rent'>('All');

  // Filter properties by category, search query, and tag
  const filteredProperties = properties.filter((prop) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      prop.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchFilter ||
      prop.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prop.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prop.title.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesTag =
      filterTag === 'All' || prop.tag === filterTag;

    return matchesCategory && matchesSearch && matchesTag;
  });

  return (
    <section id="properties" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div className="space-y-2">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-gold)]">
            FEATURED PROPERTIES
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Handpicked Just for You
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
            Prime residential and commercial assets with guaranteed legal due diligence and high rental yields.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {searchFilter && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-subsurface)] text-xs text-[var(--text-muted)] border border-[var(--border-subtle)]">
              <span>Location: <strong className="text-[var(--text-primary)]">{searchFilter}</strong></span>
              <button 
                onClick={onClearFilter}
                className="hover:text-rose-500 font-bold ml-1 cursor-pointer"
                title="Clear filter"
              >
                ×
              </button>
            </div>
          )}

          <button 
            onClick={() => {
              onSelectCategory('All');
              onClearFilter();
              setFilterTag('All');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors group cursor-pointer"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Houses', 'Apartments', 'Villas', 'Commercial'].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[var(--accent-gold)] text-[#0B0E14] shadow-md font-bold'
                  : 'bg-[var(--bg-subsurface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {(['All', 'For Sale', 'For Rent'] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterTag === tag
                  ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subsurface)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Properties 3-Column Grid */}
      {filteredProperties.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <p className="text-base text-[var(--text-muted)] mb-4">
            No properties found matching your current search parameters.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
              onClearFilter();
              setFilterTag('All');
            }}
            className="gold-glow-btn px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => {
            const isFav = favorites.includes(prop.id);
            const isSale = prop.tag === 'For Sale';

            return (
              <div
                key={prop.id}
                className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl"
              >
                <div>
                  {/* Property Image Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    
                    {/* Top Left: Tag Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md ${
                          isSale
                            ? 'bg-[#10B981] text-white'
                            : 'bg-[#3B82F6] text-white'
                        }`}
                      >
                        {prop.tag}
                      </span>
                    </div>

                    {/* Top Right: Heart / Save Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(prop.id);
                      }}
                      className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 transition-transform active:scale-90 cursor-pointer"
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                      aria-label="Save to favorites"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`}
                      />
                    </button>

                    {/* Bottom ROI Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-medium text-emerald-400 border border-emerald-500/30">
                        <TrendingUp className="w-3 h-3" />
                        <span>ROI ~{prop.roiProjected}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    
                    {/* Title & Location */}
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                        {prop.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                        <span>{prop.location}</span>
                      </div>
                    </div>

                    {/* Formatted Price */}
                    <div className="text-xl sm:text-2xl font-extrabold text-[var(--accent-gold)] tracking-tight">
                      {formatPrice(prop.pricePKR, currency, prop.pricePeriod)}
                    </div>

                    {/* Specs Bar (Beds, Baths, Area) */}
                    <div className="flex items-center justify-between py-3 border-y border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                      {prop.beds > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-[var(--text-subtle)]" />
                          <span><strong>{prop.beds}</strong> Beds</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[var(--text-subtle)]" />
                        <span><strong>{prop.baths}</strong> Baths</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-[var(--text-subtle)]" />
                        <span><strong>{prop.area}</strong></span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-6 pb-6 pt-1 flex items-center gap-2.5">
                  <button
                    onClick={() => onViewProperty(prop)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-subsurface)] hover:bg-[var(--accent-gold)] hover:text-[#0B0E14] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onScheduleViewing(prop)}
                    className="py-2.5 px-3.5 rounded-xl bg-[var(--accent-gold-soft)] hover:bg-[var(--accent-gold)] text-[var(--accent-gold)] hover:text-[#0B0E14] border border-[var(--border-gold)] text-xs font-semibold transition-all shrink-0 cursor-pointer"
                    title="Schedule Private Viewing"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
