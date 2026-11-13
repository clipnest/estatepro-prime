import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Award, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  BookOpen, 
  FileText,
  Filter
} from 'lucide-react';
import { SEO_KEYWORDS_100 } from '../data/seoKeywords';
import { SeoKeywordItem } from '../types';

interface SeoKeywordHubProps {
  onSearchKeyword: (keyword: string) => void;
}

export const SeoKeywordHub: React.FC<SeoKeywordHubProps> = ({ onSearchKeyword }) => {
  const [activePillar, setActivePillar] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const pillars = [
    'All',
    'Luxury Residential',
    'Prime Locations',
    'Investment & ROI',
    'Architectural Scales',
    'Legal & Concierge',
  ];

  const filteredKeywords = SEO_KEYWORDS_100.filter((item) => {
    const matchesPillar = activePillar === 'All' || item.pillar === activePillar;
    const matchesSearch =
      !searchTerm ||
      item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesPillar && matchesSearch;
  });

  const faqs = [
    {
      q: 'How do 100% verified title deeds protect real estate buyers in Lahore, Islamabad, and Karachi?',
      a: 'In prime Pakistani real estate, clear legal ownership is paramount. Every property cataloged by EstatePro / Mirador Prime undergoes a rigorous 4-step forensic legal audit: revenue registry ownership confirmation, municipal NOC validation, encumbrance search, and biometric seller verification. This eliminates dispute risks and guarantees peace of mind for both domestic buyers and overseas diaspora investors.'
    },
    {
      q: 'What is the ROI difference between a 1 Kanal house in DHA Lahore versus a luxury penthouse in E-11 Islamabad?',
      a: 'A 1-Kanal architectural modern house in DHA Phase 6 Lahore typically delivers a 7.5% - 9.0% annual rental yield alongside steady 10% - 14% annual land value appreciation. Conversely, executive luxury apartments in E-11 Islamabad cater to diplomatic and corporate tenants, producing 8.5% - 11.0% net rental yields with rapid capital liquidity.'
    },
    {
      q: 'How can overseas Pakistani and GCC investors repatriate real estate rental yields and capital gains?',
      a: 'Investors utilizing State Bank of Pakistan approved Roshan Digital Accounts (RDA) or authorized banking escrow retain 100% legal rights to repatriate rental income and asset disposition gains abroad with zero friction, backed by official tax compliance certificates and bilateral tax treaties.'
    },
    {
      q: 'What architectural amenities add the highest resale premium to modern luxury villas?',
      a: 'Properties featuring double-height ceiling voids, private heated swimming pools, solar photovoltaic battery arrays (20kW+), imported Italian marble finishes, basement home cinemas, and Lutron smart home automation command a 18% to 25% resale valuation premium over standard builds.'
    }
  ];

  return (
    <section id="seo-hub" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-gold-soft)] border border-[var(--border-gold)] text-[var(--accent-gold)] text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google Search Engine Optimization & Knowledge Hub</span>
        </div>
        
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          100 High-Intent Real Estate Keywords & Market Matrix
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal">
          Explore our authoritative property index containing 100 search-engine optimized keywords. Click any term to search matching architectural listings and live investment opportunities.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-8">
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter across 100 keywords (e.g. DHA Lahore, ROI, 1 Kanal, Dubai, Escrow)..."
            className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)] transition-all shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-bold px-1.5 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Pillar Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {pillars.map((pillar) => (
            <button
              key={pillar}
              onClick={() => setActivePillar(pillar)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activePillar === pillar
                  ? 'bg-[var(--accent-gold)] text-[#0B0E14] shadow-md font-bold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              {pillar}
              {pillar === 'All' && ` (${SEO_KEYWORDS_100.length})`}
            </button>
          ))}
        </div>

      </div>

      {/* Keywords Chips Matrix */}
      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl mb-16">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <span>
            Showing <strong className="text-[var(--text-primary)]">{filteredKeywords.length}</strong> of 100 Strategic SEO Keywords
          </span>
          <span className="hidden sm:inline text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> High Commercial Search Intent
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredKeywords.map((item) => (
            <div
              key={item.id}
              onClick={() => onSearchKeyword(item.keyword)}
              className="p-3 rounded-xl bg-[var(--bg-subsurface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mb-1">
                  <span className="font-mono text-[var(--accent-gold)]">#{item.id}</span>
                  <span className="px-1.5 py-0.5 rounded bg-black/20 text-[var(--text-subtle)] font-medium">
                    {item.searchVolume}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                  {item.keyword}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
                <span className={`font-semibold ${
                  item.intent === 'Transactional'
                    ? 'text-emerald-400'
                    : item.intent === 'Commercial'
                    ? 'text-sky-400'
                    : 'text-amber-400'
                }`}>
                  {item.intent}
                </span>
                <span className="text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] flex items-center gap-0.5">
                  Filter <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google SEO FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--accent-gold)]">
            SEARCH INTENT & REGULATORY GUIDES
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Frequently Asked Property Acquisition Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;

            return (
              <div
                key={index}
                className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[var(--text-primary)] hover:text-[var(--accent-gold)] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-subtle)] pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
