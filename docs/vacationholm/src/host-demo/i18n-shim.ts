const copy: Record<string, string> = {
  'dashboard:title': 'Host Dashboard',
  'dashboard:subtitle': 'Manage your listings and track your property performance',
  'dashboard:loading': 'Loading dashboard...',
  'dashboard:stats.total_listings': 'Total listings',
  'dashboard:stats.active': 'Active',
  'dashboard:stats.inactive': 'Inactive',
  'dashboard:listings.title': 'Your Listings',
  'dashboard:listings.add_listing': 'Add Listing',
  'dashboard:listings.manage_rates': 'Customize Rates',
  'common:status.active': 'Active',
  'common:status.inactive': 'Inactive',
  'common:actions.loading': 'Loading...',
  'common:actions.view': 'View',
  'common:actions.edit': 'Edit',
  'common:property.guests': 'guests',
  'common:property.bedrooms': 'bedrooms',
  'common:property.beds': 'beds',
  'common:property.bathrooms': 'bathrooms',
  'common:property.per_night': '/ night',
  'common:navigation.add_listing': 'Add a listing',
  'common:navigation.account': 'Account',
  'common:navigation.sign_out': 'Sign out',
  'common:navigation.my_profile': 'My profile',
  'host:dashboard': 'Dashboard',
  'host:settings': 'Settings',
};

export function useTranslation() {
  return { t: (key: string) => copy[key] || key };
}
