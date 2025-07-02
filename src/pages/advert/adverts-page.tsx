import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";

import { useAdverts } from "./hooks/use-adverts";

import AdvertItem from "./advert-item";

import Button from "../../components/ui/button";
import Page from "../../components/layout/page";
import FilterDropdown, { type FiltersState } from "../../components/ui/filter-dropdown";

const EmptyList = () => (
  <div className="adverts-page-empty">
    <p>Be the first to publish!</p>
    <Link to="/adverts/new">
      <Button>Create Advert</Button>
    </Link>
  </div>
);

const NoResults = () => (
  <div className="adverts-page-empty">
    <p>No adverts founded!</p>
  </div>
);

function AdvertsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, availableTags, adverts, serializeFilters } = useAdverts(searchParams);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleApply = (pending: FiltersState) => {
    const params = serializeFilters(pending);
    setSearchParams(params);
    setDropdownOpen(false);
  };

  const hasActive = useMemo(() => {
    return Object.entries(filters).some(([k, v]) => (k === "tags" ? (v as string[]).length > 0 : v !== ""));
  }, [filters]);

  return (
    <Page title="Available Adverts">
      <FilterDropdown initialFilters={filters} availableTags={availableTags} onApply={handleApply} onClose={() => setDropdownOpen(false)} isOpen={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)} />
      <div className="adverts-list mt-6 space-y-4">
        {adverts.length > 0 ? (
          <ul className="space-y-4">
            {adverts.map((ad) => (
              <li key={ad.id}>
                <Link to={`/adverts/${ad.id}`} className="block hover:no-underline">
                  <AdvertItem advert={ad} />
                </Link>
              </li>
            ))}
          </ul>
        ) : hasActive ? (
          <NoResults />
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
