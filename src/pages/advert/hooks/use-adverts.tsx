import { useEffect, useState } from "react";
import { getFilteredAdverts, getTags } from "../service";

import type { Advert } from "../types";

import type { FiltersState } from "../../../components/ui/filter-dropdown";

function clampNum(v: number, min = 0, max = 25000) {
  return Math.max(min, Math.min(max, v));
}

function parseFilters(params: URLSearchParams): FiltersState {
  const price = params
    .getAll("price")
    .map(Number)
    .filter((number) => !isNaN(number));

  const minPrice = price.length ? String(Math.min(...price)) : "";
  const maxPrice = price.length ? String(Math.max(...price)) : "";
  const rawSale = params.get("sale");

  return {
    name: params.get("name") || "",
    minPrice,
    maxPrice,
    sale: rawSale === "true" || rawSale === "false" ? rawSale : "all",
    tags: params.get("tags")?.split(",") || [],
  };
}

function serializeFilters(filter: FiltersState) {
  const searchParams = new URLSearchParams();
  const min = filter.minPrice ? clampNum(Number(filter.minPrice)) : null;
  const max = filter.maxPrice ? clampNum(Number(filter.maxPrice)) : null;

  if (min !== null && max !== null && min > max) searchParams.append("price", String(min));
  if (min !== null) searchParams.append("price", String(min));
  if (max !== null && max !== min) searchParams.append("price", String(max));
  if (filter.name) searchParams.set("name", filter.name);
  if (filter.sale !== "all") searchParams.set("sale", filter.sale);
  if (filter.tags.length) searchParams.set("tags", filter.tags.join(","));

  return searchParams;
}

export function useAdverts(searchParams: URLSearchParams) {
  const [filters, setFilters] = useState<FiltersState>(parseFilters(searchParams));
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    (async () => {
      const tags = await getTags();
      setAvailableTags(tags);

      const parsed = parseFilters(searchParams);
      setFilters(parsed);

      const list = await getFilteredAdverts(new URLSearchParams(searchParams));
      setAdverts(list);
    })();
  }, [searchParams]);

  return { filters, availableTags, adverts, serializeFilters };
}
