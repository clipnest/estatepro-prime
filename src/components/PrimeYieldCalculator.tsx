import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatPrice } from '../data/exchangeRates';

interface PrimeYieldCalculatorProps {
  currency: CurrencyCode;
  onOpenSchedule: () => void;
}

export const PrimeYieldCalculator: React.FC<PrimeYieldCalculatorProps> = ({
  currency,
  onOpenSchedule,
}) => {
  // Slider states
  const [propertyPricePKR, setPropertyPricePKR] = useState<number>(65000000); // 6.5 Crore PKR
  const [rentalYieldPercent, setRentalYieldPercent] = useState<number>(8.5); // 8.5% net yield
  const [holdingYears, setHoldingYears] = useState<number>(5); // 5 years
  const [appreciationRate, setAppreciationRate] = useState<number>(9.0); // 9% annual appreciation

  // Financial calculations
  const annualRentalCashflowPKR = Math.round((propertyPricePKR * rentalYieldPercent) / 100);
  const totalRentalCashflowPKR = annualRentalCashflowPKR * holdingYears;
  
  // Future compounded property value
  const futurePropertyValuePKR = Math.round(
    propertyPricePKR * Math.pow(1 + appreciationRate / 100, holdingYears)
  );
  const totalCapitalGainPKR = futurePropertyValuePKR - propertyPricePKR;
  const totalNetReturnPKR = totalRentalCashflowPKR + totalCapitalGainPKR;
  const totalRoiPercentage = Math.round((totalNetReturnPKR / propertyPricePKR) * 100);

  return (
    <section id="calculator" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Container Card */}
      <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-subsurface)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden">
        
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B869]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-gold-soft)] border border-[var(--border-gold)] text-[var(--accent-gold)] text-xs font-semibold tracking-wider uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>PrimeYield™ Financial Intelligence</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Simulate Your Real Estate ROI & Cash Flow
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal">
            Designed for diaspora wealth managers and overseas investors. Calculate multi-currency rental returns, capital compounding, and inflation-hedged yields before acquiring.
          </p>
        </div>

        {/* Grid: Sliders on Left, Results Matrix on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Range Sliders */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Slider 1: Property Valuation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-[var(--text-primary)]">Property Acquisition Value:</span>
                <span className="text-[var(--accent-gold)] font-mono text-base font-bold">
                  {formatPrice(propertyPricePKR, currency)}
                </span>
              </div>
              <input
                type="range"
                min={20000000}
                max={250000000}
                step={5000000}
                value={propertyPricePKR}
                onChange={(e) => setPropertyPricePKR(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[var(--bg-subsurface)] accent-[var(--accent-gold)] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>PKR 20M</span>
                <span>PKR 125M</span>
                <span>PKR 250M+</span>
              </div>
            </div>

            {/* Slider 2: Expected Net Rental Yield */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-[var(--text-primary)]">Expected Annual Rental Yield:</span>
                <span className="text-emerald-400 font-mono text-base font-bold">
                  {rentalYieldPercent.toFixed(1)}% / yr
                </span>
              </div>
              <input
                type="range"
                min={4.0}
                max={14.0}
                step={0.5}
                value={rentalYieldPercent}
                onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[var(--bg-subsurface)] accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>4.0% (Conservative)</span>
                <span>8.5% (Prime Villa)</span>
                <span>14.0% (Commercial)</span>
              </div>
            </div>

            {/* Slider 3: Holding Horizon */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-[var(--text-primary)]">Holding Horizon:</span>
                <span className="text-sky-400 font-mono text-base font-bold">
                  {holdingYears} {holdingYears === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={holdingYears}
                onChange={(e) => setHoldingYears(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[var(--bg-subsurface)] accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>1 Year</span>
                <span>5 Years (Standard)</span>
                <span>10 Years</span>
              </div>
            </div>

            {/* Slider 4: Annual Capital Appreciation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-[var(--text-primary)]">Annual Capital Growth Projection:</span>
                <span className="text-amber-400 font-mono text-base font-bold">
                  {appreciationRate.toFixed(1)}% / yr
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={16.0}
                step={0.5}
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-[var(--bg-subsurface)] accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>3.0% (Baseline)</span>
                <span>9.0% (DHA / Dubai Average)</span>
                <span>16.0% (High Growth)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Yield Matrix Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="p-6 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Projected Financial Matrix ({currency})
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold">
                  Zero Tax Encumbrance
                </span>
              </div>

              {/* Metric 1: Annual Rental Cash Flow */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-[var(--text-muted)]">Estimated Annual Rental Cash Flow</div>
                  <div className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    {formatPrice(annualRentalCashflowPKR, currency)} <span className="text-xs font-normal text-[var(--text-muted)]">/ year</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[var(--text-muted)]">Monthly Payout</div>
                  <div className="text-sm font-semibold text-emerald-400">
                    {formatPrice(Math.round(annualRentalCashflowPKR / 12), currency)} / mo
                  </div>
                </div>
              </div>

              {/* Metric 2: Capital Appreciation */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-[var(--text-muted)]">Projected Capital Appreciation ({holdingYears} Years)</div>
                  <div className="text-lg sm:text-xl font-bold text-amber-400">
                    +{formatPrice(totalCapitalGainPKR, currency)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[var(--text-muted)]">Future Asset Value</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {formatPrice(futurePropertyValuePKR, currency)}
                  </div>
                </div>
              </div>

              {/* Metric 3: Total Combined Net Return & Total ROI */}
              <div className="p-4 rounded-xl bg-[var(--bg-subsurface)] border border-[var(--border-gold)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wide">
                    Total Net Projected Gain
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[var(--accent-gold)]">
                    {formatPrice(totalNetReturnPKR, currency)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[var(--text-muted)]">Total Cumulative Return</div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    +{totalRoiPercentage}%
                  </div>
                </div>
              </div>

              {/* CTA Action */}
              <button
                onClick={onOpenSchedule}
                className="w-full gold-glow-btn py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Book Private Wealth Advisory Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[var(--text-subtle)] leading-normal">
                *Projections are computed using historic capital growth indices across DHA Lahore, Islamabad E-11, and Downtown Dubai. Past performance is not a guarantee of future outcomes.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
