import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { getFilteredAdverts, getTags } from "../../pages/advert/service";

import AdvertItem from "./advert-item";

import Button from "../../components/ui/button";
import Page from "../../components/layout/page";

import FilterDropdown, { type FilterCriteria } from "../../components/ui/filter-dropdown";
import type { Advert } from "./types";

// ................................................
const EmptyList = () => (
  <div className="adverts-page-empty">
    <p>Be the first to publish!</p>
    <Link to="/adverts/new">
      <Button>Create Advert</Button>
    </Link>
  </div>
);
// ................................................
const NoResults = () => (
  <div className="adverts-page-empty">
    <p>No adverts found!</p>
  </div>
);

// =======================================================================================================================================================
export default function AdvertsPage() {
  // -----------------------------------------------------------------------------------------------------------
  const [searchParams, setSearchParams] = useSearchParams();
  const [dbTags, setDbTags] = useState<string[]>([]);
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>({
    name: "",
    price: "",
    sale: "all",
    tags: [],
  });
  /*   const [dropdownOpen, setDropdownOpen] = useState(false);
   */ // -----------------------------------------------------------------------------------------------------------
  // Load tags only once on mount
  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags();
      setDbTags(tags);
    }
    fetchTags();
  }, []);

  // -----------------------------------------------------------------------------------------------------------
  // Initial load of filters and adverts on mount (only once)
  useEffect(() => {
    // Extract filters from URL
    const initialFilters: FilterCriteria = {
      name: searchParams.get("name") || "",
      price: searchParams.get("price") || "",
      sale: (searchParams.get("sale") as "true" | "false" | "all") || "all",
      tags: searchParams.getAll("tags"),
    };
    setFilters(initialFilters);

    async function fetchInitialAdverts() {
      // Convert URLSearchParams to object for API
      const filtersObj = Object.fromEntries(searchParams.entries());
      const advertsList = await getFilteredAdverts(filtersObj);
      setAdverts(advertsList);
    }
    fetchInitialAdverts();
  }, []);
  // -----------------------------------------------------------------------------------------------------------
  // When applying filters, update URL, filters state, and adverts
  const handleApply = useCallback(async (newFilters: FilterCriteria) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.name) params.set("name", newFilters.name);
    if (newFilters.price) params.set("price", newFilters.price);
    if (newFilters.sale !== "all") params.set("sale", newFilters.sale);
    newFilters.tags.forEach((tag) => params.append("tags", tag));

    setSearchParams(params);

    const filtersObj = Object.fromEntries(params.entries());
    const advertsList = await getFilteredAdverts(filtersObj);
    setAdverts(advertsList);

    /*     setDropdownOpen(false);
     */
  }, []);
  // -----------------------------------------------------------------------------------------------------------
  const hasActive = useMemo(() => {
    return Object.entries(filters).some(([k, v]) => (k === "tags" ? (v as string[]).length > 0 : v !== ""));
  }, [filters]);
  // =======================================================================================================================================================
  return (
    <Page title="Available Adverts">
      <FilterDropdown appliedFilters={filters} dbTags={dbTags} onApply={handleApply} />
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
