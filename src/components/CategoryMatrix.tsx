import React from 'react';
import { Home, Building2, Crown, Briefcase, ArrowUpRight, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface CategoryMatrixProps {
  onSelectCategory: (categoryTitle: string) => void;
  selectedCategory: string;
}

export const CategoryMatrix: React.FC<CategoryMatrixProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="w-5 h-5 text-amber-500" />;
      case 'building':
        return <Building2 className="w-5 h-5 text-sky-500" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-[#E5B869]" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-emerald-500" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="space-y-2">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-gold)]">
            EXPLORE BY CATEGORY
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Find Properties That Fit Your Lifestyle
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
            Discover a wide range of verified properties in the best premier locations.
          </p>
        </div>

        <button 
          onClick={() => onSelectCategory('All')}
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors group cursor-pointer"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.title.toLowerCase();

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.title)}
              className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border ${
                isSelected 
                  ? 'border-[var(--accent-gold)] ring-2 ring-[var(--accent-gold)]/40 shadow-xl' 
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-gold)] bg-[var(--bg-surface)]'
              }`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Card Content Footer */}
              <div className="p-5 flex items-center justify-between bg-[var(--bg-surface)]">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--bg-subsurface)] border border-[var(--border-subtle)] group-hover:border-[var(--border-gold)] transition-colors shadow-sm shrink-0">
                    {getIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-normal">
                      {cat.subtitle}
                    </p>
                    <span className="text-[11px] font-semibold text-[var(--text-subtle)]">
                      {cat.count}
                    </span>
                  </div>
                </div>

                {/* Arrow Button */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-subsurface)] text-[var(--text-muted)] group-hover:bg-[var(--accent-gold)] group-hover:text-[#0B0E14] transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
