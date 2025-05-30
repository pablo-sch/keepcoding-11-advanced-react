// AdvertsPage.tsx
import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { useAdverts } from "./hooks/use-adverts";

import Button from "../../components/ui/button";
import AdvertItem from "./advert-item";

import Page from "../../components/layout/page";
import FilterDropdown, { type FiltersState } from "../../components/ui/filter-dropdown";

const EmptyList = () => (
  <div className="adverts-page-empty">
    <p>Be the first to publish!</p>
    <Link to="/adverts/new">
      <Button variant="primary">Create Advert</Button>
    </Link>
  </div>
);
const NoResults = () => (
  <div className="adverts-page-empty">
    <p>No adverts according to search parameters!</p>
  </div>
);

function AdvertsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, availableTags, adverts, serializeFilters } = useAdverts(searchParams);

  const handleApply = (pending: FiltersState) => {
    const params = serializeFilters(pending);
    setSearchParams(params);
  };

  const hasActive = useMemo(() => {
    return Object.entries(filters).some(([k, v]) => (k === "tags" ? (v as string[]).length > 0 : v !== ""));
  }, [filters]);

  return (
    <Page title="Available Adverts">
      <FilterDropdown initialFilters={filters} availableTags={availableTags} onApply={handleApply} />

      <div className="adverts-page">
        {adverts.length > 0 ? (
          <ul>
            {adverts.map((ad) => (
              <li key={ad.id}>
                <Link to={`/adverts/${ad.id}`}>
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
