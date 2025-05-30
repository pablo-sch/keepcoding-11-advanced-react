import { useState, useRef, useCallback, useEffect } from "react";

import Button from "../../components/ui/button";

import "./filter-dropdown.css";

export type FiltersState = {
  name: string;
  minPrice: string;
  maxPrice: string;
  sale: "true" | "false" | "all";
  tags: string[];
};

type Props = {
  initialFilters: FiltersState;
  availableTags: string[];
  onApply: (filters: FiltersState) => void;
};

export default function FilterDropdown({ initialFilters, availableTags, onApply }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep uncontrolled inputs in sync if initialFilters change
  useEffect(() => {
    if (!panelRef.current) return;
    const form = panelRef.current;
    form.querySelector<HTMLInputElement>("input[name=name]")!.value = initialFilters.name;
    form.querySelector<HTMLInputElement>("input[name=minPrice]")!.value = initialFilters.minPrice;
    form.querySelector<HTMLInputElement>("input[name=maxPrice]")!.value = initialFilters.maxPrice;
    form.querySelectorAll<HTMLInputElement>("input[name=sale]").forEach((el) => {
      el.checked = el.value === initialFilters.sale;
    });
    form.querySelectorAll<HTMLInputElement>("input[name=tags]").forEach((el) => {
      el.checked = initialFilters.tags.includes(el.value);
    });
  }, [initialFilters, availableTags]);

  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  const apply = useCallback(() => {
    if (!panelRef.current) return;
    const form = panelRef.current;

    // Read raw values
    const name = (form.querySelector<HTMLInputElement>("input[name=name]")!.value || "").trim();
    let rawMin = form.querySelector<HTMLInputElement>("input[name=minPrice]")!.value;
    let rawMax = form.querySelector<HTMLInputElement>("input[name=maxPrice]")!.value;

    // Clamp helper
    const clamp = (str: string) => {
      const n = Number(str);
      if (!str || isNaN(n)) return "";
      if (n < 0) return "0";
      if (n > 25000) return "25000";
      return String(n);
    };

    // 1) clamp both
    const minClamped = clamp(rawMin);
    const maxClamped = clamp(rawMax);

    // 2) if both present and min > max, set max = min
    const finalMin = minClamped;
    const finalMax = minClamped && maxClamped && Number(minClamped) > Number(maxClamped) ? minClamped : maxClamped;

    // 3) write corrections back to inputs
    form.querySelector<HTMLInputElement>("input[name=minPrice]")!.value = finalMin;
    form.querySelector<HTMLInputElement>("input[name=maxPrice]")!.value = finalMax;

    // Read sale and tags
    const sale = form.querySelector<HTMLInputElement>("input[name=sale]:checked")!.value as FiltersState["sale"];
    const tags = Array.from(form.querySelectorAll<HTMLInputElement>("input[name=tags]:checked")).map((cb) => cb.value);

    // Build filters object
    const filters: FiltersState = {
      name,
      minPrice: finalMin,
      maxPrice: finalMax,
      sale,
      tags,
    };

    onApply(filters);
  }, [onApply]);

  return (
    <div className="filter-dropdown">
      <button type="button" onClick={toggle}>
        Filter Adverts
      </button>

      {isOpen && (
        <div className="filter-panel" ref={panelRef}>
          <div className="filter-panel-label">
            <label>Name</label>
            <input name="name" type="text" defaultValue={initialFilters.name} placeholder="Advert Name" />
            <label>Min Price</label>
            <input name="minPrice" type="number" defaultValue={initialFilters.minPrice} placeholder="0" min={0} max={25000} />
            <label>Max Price</label> <input name="maxPrice" type="number" defaultValue={initialFilters.maxPrice} placeholder="25000" min={0} max={25000} />
          </div>
          {/*
          <div className="filter-panel-fieldset"></div>
          <div className="filter-panel-label"></div> */}

          <fieldset>
            <legend>Type</legend>
            {(["all", "true", "false"] as const).map((opt) => (
              <label key={opt}>
                <input name="sale" type="radio" value={opt} defaultChecked={initialFilters.sale === opt} />
                {opt === "all" ? "All" : opt === "true" ? "Sale" : "Purchase"}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Tags</legend>
            {availableTags.map((tag) => (
              <label key={tag}>
                <input name="tags" type="checkbox" value={tag} defaultChecked={initialFilters.tags.includes(tag)} />
                {tag}
              </label>
            ))}
          </fieldset>

          <Button onClick={apply}>Apply Filters</Button>
        </div>
      )}
    </div>
  );
}
