import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#07090D] text-white pt-20 pb-28 sm:pb-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5B869] to-[#99732B] text-[#0B0E14] font-bold">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-luxury text-xl font-bold tracking-tight text-white">
                    EstatePro
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#E5B869]/20 text-[#E5B869] border border-[#E5B869]/30">
                    PRIME
                  </span>
                </div>
                <span className="text-[11px] text-white/60">
                  Architectural Living. Intelligent Capital.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
              Mirador Prime (EstatePro) curates verified architectural residences, luxury penthouses, and high-yield commercial assets across Dubai, Lahore, Islamabad, Karachi, and London. Backed by 100% forensic title deed guarantees.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Title Deed Forensic Guarantee</span>
            </div>
          </div>

          {/* Regional Offices (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#E5B869]">
              Regional Private Desks
            </h4>
            
            <div className="space-y-3 text-xs text-white/80">
              <div>
                <strong className="text-white block">Dubai DIFC:</strong>
                <span className="text-white/60">Level 14, Gate Precinct 4, DIFC, UAE</span>
              </div>

              <div>
                <strong className="text-white block">Lahore DHA:</strong>
                <span className="text-white/60">Main Boulevard, Phase 6 DHA, Lahore</span>
              </div>

              <div>
                <strong className="text-white block">Islamabad Blue Area:</strong>
                <span className="text-white/60">Jinnah Avenue, Blue Area, Islamabad</span>
              </div>

              <div>
                <strong className="text-white block">London Mayfair:</strong>
                <span className="text-white/60">17 Mayfair Place, London W1J 8AJ, UK</span>
              </div>
            </div>
          </div>

          {/* Direct Helpline & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#E5B869]">
              VIP Helpline
            </h4>
            
            <div className="space-y-2.5 text-xs text-white/80">
              <a href="tel:+97143128900" className="flex items-center gap-2 hover:text-[#E5B869] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>+971 4 312 8900</span>
              </a>

              <a href="mailto:concierge@miradorprime.com" className="flex items-center gap-2 hover:text-[#E5B869] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>concierge@estatepro.com</span>
              </a>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-white/60">
                <Globe className="w-3.5 h-3.5 text-white/40" />
                <span>Multi-Currency Escrow</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#E5B869]">
              Discreet Off-Market Releases
            </h4>
            
            <p className="text-xs text-white/70">
              Receive confidential architectural listings and high-yield property releases before public market exposure.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You are registered for VIP private allocations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private email..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#E5B869]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 px-3 py-1 rounded-lg bg-[#E5B869] text-[#0B0E14] text-xs font-bold hover:bg-[#F0C77A] transition-all cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-white/50 block">
                  Strict client confidentiality guaranteed. Zero spam.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <div>
            © {new Date().getFullYear()} Mirador Prime / EstatePro Real Estate Private Office. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Forensic Title Guarantee</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Representation</a>
            <a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
