import React from 'react';
import { Headphones, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface ConciergeRibbonProps {
  onScheduleCall: () => void;
}

export const ConciergeRibbon: React.FC<ConciergeRibbonProps> = ({ onScheduleCall }) => {
  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-8 z-30 max-w-5xl mx-auto">
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B0E14]/95 text-white backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Headset Icon + Text */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-[#E5B869] border border-white/10 shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Need Help Finding the Right Property?
            </div>
            <div className="text-[11px] sm:text-xs text-white/70">
              Our team is ready to assist you. Get expert advice today!
            </div>
          </div>
        </div>

        {/* Right: WhatsApp & Schedule Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
          <a
            href="https://wa.me/97143128900?text=Hello%20EstatePro%20Concierge,%20I%20would%20like%20to%20speak%20with%20a%20luxury%20property%20advisor."
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto px-4 py-2.5 rounded-full bg-gradient-to-r from-[#E5B869] to-[#D4A350] hover:from-[#F0C77A] hover:to-[#E5B869] text-[#0B0E14] text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 fill-[#0B0E14]" />
            <span>Contact on WhatsApp</span>
          </a>

          <button
            onClick={onScheduleCall}
            className="w-full md:w-auto px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#E5B869]" />
            <span>Schedule a Call</span>
          </button>
        </div>

      </div>
    </div>
  );
};

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
