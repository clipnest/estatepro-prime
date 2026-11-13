export type CurrencyCode = 'PKR' | 'AED' | 'USD' | 'GBP';

export type AmbienceTime = 'dawn' | 'midday' | 'twilight';

export interface Property {
  id: string;
  slug: string;
  title: string;
  category: 'Houses' | 'Apartments' | 'Villas' | 'Commercial';
  tag: 'For Sale' | 'For Rent';
  location: string;
  city: string;
  pricePKR: number;
  pricePeriod?: string; // e.g. "/ month"
  beds: number;
  baths: number;
  area: string; // e.g. "1 Kanal", "2,200 sqft", "2 Kanal"
  areaSqft: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  floorPlanUrl?: string;
  architecturalStyle: string;
  yearBuilt: number;
  roiProjected: number; // e.g. 8.4%
  isFeatured?: boolean;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  count: string;
  image: string;
  iconName: 'home' | 'building' | 'crown' | 'briefcase';
}

export interface ViewingBookingData {
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: 'Morning (10:00 - 13:00)' | 'Afternoon (14:00 - 17:00)' | 'Sunset Twilight (17:00 - 19:30)';
  tourType: 'In-Person Private Tour' | 'Live HD Video Walkthrough' | 'VIP Capital Advisory Call';
  clientLocation: string;
  notes?: string;
}

export interface SeoKeywordItem {
  id: number;
  keyword: string;
  pillar: 'Luxury Residential' | 'Prime Locations' | 'Investment & ROI' | 'Architectural Scales' | 'Legal & Concierge';
  searchVolume: string;
  intent: 'Transactional' | 'Commercial' | 'Informational';
  description: string;
  tags: string[];
}
