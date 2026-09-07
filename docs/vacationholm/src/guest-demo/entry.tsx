import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchPage from '@listings-page/search';
import ListingDetailPage from '@listings-page/listing';
import { Header } from '@listings/components/header';
import { SearchProvider } from '@listings/contexts/search-context';

const view = new URLSearchParams(location.search).get('view');
createRoot(document.getElementById('root')!).render(
  <SearchProvider>
    <div className={view === 'listing' ? 'guest-listing-shell' : 'guest-search-shell'}>
      <Header />
      {view === 'listing' ? <ListingDetailPage /> : <SearchPage />}
    </div>
  </SearchProvider>
);
