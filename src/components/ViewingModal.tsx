import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Mail, 
  User, 
  Video, 
  Eye, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Property, ViewingBookingData } from '../types';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
  properties: Property[];
}

export const ViewingModal: React.FC<ViewingModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  properties,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<ViewingBookingData>({
    propertyId: selectedProperty?.id || (properties[0]?.id || ''),
    propertyTitle: selectedProperty?.title || (properties[0]?.title || 'General Property Consultation'),
    fullName: '',
    email: '',
    phone: '',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTimeSlot: 'Sunset Twilight (17:00 - 19:30)',
    tourType: 'In-Person Private Tour',
    clientLocation: 'Dubai, UAE',
    notes: '',
  });

  if (!isOpen) return null;

  const handlePropertyChange = (propId: string) => {
    const found = properties.find((p) => p.id === propId);
    setFormData({
      ...formData,
      propertyId: propId,
      propertyTitle: found ? found.title : 'General Consultation',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5B869', '#10B981', '#ffffff', '#3B82F6'],
    });
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl overflow-hidden text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[var(--text-primary)]">
                Schedule Private Viewing
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {step === 1 ? 'Step 1: Select Date, Time & Tour Format' : 'Step 2: Guest Details & Concierge Notes'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subsurface)] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif-luxury text-2xl font-bold text-[var(--text-primary)]">
                Appointment Requested!
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Our Private Client Desk has received your request for <strong>{formData.propertyTitle}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-subsurface)] text-left text-xs space-y-2 border border-[var(--border-subtle)]">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Format:</span>
                <span className="font-semibold text-[var(--accent-gold)]">{formData.tourType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Date & Slot:</span>
                <span className="font-semibold">{formData.preferredDate} ({formData.preferredTimeSlot.split(' ')[0]})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Client Contact:</span>
                <span className="font-semibold">{formData.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/97143128900?text=Hi%20EstatePro%20team,%20I%20just%20scheduled%20a%20viewing%20for%20${encodeURIComponent(formData.propertyTitle)}%20on%20${formData.preferredDate}`}
                target="_blank"
                rel="noreferrer"
                className="w-full gold-glow-btn py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Instant WhatsApp Confirmation</span>
              </a>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-[var(--bg-subsurface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="p-6 space-y-5">
            
            {step === 1 && (
              <div className="space-y-4">
                
                {/* Select Property */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Target Property
                  </label>
                  <select
                    value={formData.propertyId}
                    onChange={(e) => handlePropertyChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[var(--bg-surface)]">
                        {p.title} — {p.location} ({p.tag})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tour Format */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Viewing Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'In-Person Private Tour', icon: Eye, label: 'In-Person Tour' },
                      { id: 'Live HD Video Walkthrough', icon: Video, label: '4K Live Video' },
                      { id: 'VIP Capital Advisory Call', icon: Phone, label: 'VIP Wealth Call' },
                    ].map((fmt) => {
                      const Icon = fmt.icon;
                      const selected = formData.tourType === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, tourType: fmt.id as any })}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            selected
                              ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-subsurface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          <Icon className="w-4 h-4 mb-2" />
                          <span className="text-xs font-bold leading-tight">{fmt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Preferred Lighting & Time Slot
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                  >
                    <option value="Morning (10:00 - 13:00)">Morning (10:00 - 13:00) — Natural Daylighting</option>
                    <option value="Afternoon (14:00 - 17:00)">Afternoon (14:00 - 17:00) — Golden Sun</option>
                    <option value="Sunset Twilight (17:00 - 19:30)">Sunset Twilight (17:00 - 19:30) — Signature Pool Illumination</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full gold-glow-btn py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    WhatsApp Phone Number (with Country Code) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +971 50 123 4567 or +92 300 1234567"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tariq@domain.com"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Current Location / Residence
                  </label>
                  <input
                    type="text"
                    value={formData.clientLocation}
                    onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })}
                    placeholder="e.g. Dubai, London, Riyadh, Lahore"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                    Special Inquiries or Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Specify any questions regarding title deed verification, floor plans, or repatriation..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--bg-subsurface)] text-[var(--text-primary)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-[var(--bg-subsurface)] hover:bg-[var(--bg-elevated)] text-xs font-semibold cursor-pointer border border-[var(--border-subtle)]"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="w-2/3 gold-glow-btn py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Confirm Reservation</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
