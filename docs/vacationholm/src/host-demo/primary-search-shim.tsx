import { Search } from 'lucide-react';

export function PrimarySearch({ handleSearch }: { handleSearch: () => void }) {
  return <button type="button" onClick={handleSearch} className="flex h-12 items-center gap-8 rounded-full border bg-white px-5 text-sm shadow-sm">
    <span className="font-medium">Search islands and dates</span>
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><Search className="h-4 w-4" /></span>
  </button>;
}
