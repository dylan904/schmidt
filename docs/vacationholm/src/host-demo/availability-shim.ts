export function useSyncAvailability() {
  return { syncListing: async () => {}, syncing: false, error: null };
}
