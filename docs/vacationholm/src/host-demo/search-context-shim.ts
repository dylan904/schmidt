export function useSearch() {
  return {
    isFocused: false,
    setIsFocused: () => {},
    uiFilters: {
      island: '', checkIn: '', checkOut: '', minPrice: '', maxPrice: '', bedrooms: '',
      amenities: [], petsAllowed: false, smokingAllowed: false, eventsAllowed: false,
      childrenAllowed: false,
    },
    roomsGuests: { adults: 2, children: 0, infants: 0, pets: 0 },
  };
}
