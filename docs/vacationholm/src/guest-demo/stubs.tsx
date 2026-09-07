import React from 'react';

const currentSearchParams = new URLSearchParams(location.search);
export function useSearchParams() { return currentSearchParams; }
export function useParams() { return { id: 'demo-lagoon' }; }
export function useRouter() { return { push() {}, replace() {}, back() {} }; }
export function useAuth() { return { user: null, profile: null, loading: false, showLoginDialog() {}, signOut() {} }; }
export function useCurrency() { return { userCurrency: 'EUR', convertPrice: (value: number) => value, formatPrice: (value: number) => `€${value.toFixed(2)}` }; }
export function ListingsMap() { return <div className="offline-map"><strong>Map preview unavailable offline</strong><span>Property cards and prices use the real search results UI.</span></div>; }
export function Nearby() { return null; }
export function ListingDetailMap() { return null; }
export function LanguageSwitcher() { return <button type="button" className="text-sm">EN</button>; }
export const hasAnalyticsConsent = () => false;
export const trackSearchImpression = async () => false;
export const trackFunnelEvent = async () => false;
export const trackAvailabilityCalendarInteracted = async () => undefined;
export const trackSearchPerformed = () => undefined;
export const trackSearchResultClick = () => undefined;
export const trackSearchResultsRendered = () => undefined;
export const trackListingSaved = () => undefined;
export const trackListingView = () => undefined;
export const trackPhotoQualityFeedback = () => undefined;
export async function fetchAmenities() { return [
  { icon: 'wifi', label: 'Wi-Fi' }, { icon: 'parking', label: 'Parking' }, { icon: 'pool', label: 'Pool' }, { icon: 'kitchen', label: 'Kitchen' }
]; }
export async function fetchAttractionsByListingId() { return []; }
export async function fetchAttractionsByIsland() { return []; }
export function useTranslation() {
  const labels: Record<string, string> = {
    'common:property.per_night': 'per night',
    'listings:overview.cleaning_fee': 'cleaning fee',
    'listings:amenities.values.wifi': 'Wi-Fi',
    'listings:amenities.values.parking': 'Parking',
    'listings:amenities.values.pool': 'Pool',
    'listings:amenities.values.kitchen': 'Kitchen',
    'common:navigation.sign_in': 'Sign in',
  };
  return { t: (key: string) => labels[key] || key.split('.').pop()?.replaceAll('_', ' ') || key, i18n: { language: 'en' } };
}
