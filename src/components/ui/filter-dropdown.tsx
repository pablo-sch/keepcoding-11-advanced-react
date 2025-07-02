import { useState, useEffect, useCallback } from "react";
import Button from "../../components/ui/button";

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
  onClose?: () => void;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FilterDropdown({ initialFilters, availableTags, onApply, onClose, isOpen, onToggle }: Props) {
  // Use a single state to control the form
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  // When the initial filters change, update the state
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Function to update a simple field
  const updateField = (field: keyof FiltersState, value: string | string[]) => {
    setFilters((f) => ({ ...f, [field]: value }));
  };

  // Function to update tags (checkboxes)
  const toggleTag = (tag: string) => {
    setFilters((f) => {
      if (f.tags.includes(tag)) {
        // Remove tag
        return { ...f, tags: f.tags.filter((t) => t !== tag) };
      } else {
        // Add tag
        return { ...f, tags: [...f.tags, tag] };
      }
    });
  };

  // Apply filters with validations similar to the previous implementation
  const apply = useCallback(() => {
    // Clamp helper
    const clamp = (str: string) => {
      const n = Number(str);
      if (!str || isNaN(n)) return "";
      if (n < 0) return "0";
      if (n > 25000) return "25000";
      return String(n);
    };

    const minClamped = clamp(filters.minPrice);
    let maxClamped = clamp(filters.maxPrice);

    // If min > max, set max = min
    if (minClamped && maxClamped && Number(minClamped) > Number(maxClamped)) {
      maxClamped = minClamped;
    }

    // Update the state with corrected values before applying
    const correctedFilters = {
      ...filters,
      minPrice: minClamped,
      maxPrice: maxClamped,
    };

    setFilters(correctedFilters);

    onApply(correctedFilters);
    if (onClose) onClose();
  }, [filters, onApply, onClose]);

  return (
    <div className="relative inline-block">
      <div className="relative">
        <Button onClick={onToggle}>Filter Adverts</Button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-80 bg-white shadow-lg border rounded p-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="font-medium">Name</label>
                <input name="name" type="text" value={filters.name} placeholder="Advert Name" onChange={(e) => updateField("name", e.target.value)} className="border px-2 py-1 rounded" />

                <label className="font-medium">Min Price</label>
                <input name="minPrice" type="number" value={filters.minPrice} placeholder="0" min={0} max={25000} onChange={(e) => updateField("minPrice", e.target.value)} className="border px-2 py-1 rounded" />

                <label className="font-medium">Max Price</label>
                <input name="maxPrice" type="number" value={filters.maxPrice} placeholder="25000" min={0} max={25000} onChange={(e) => updateField("maxPrice", e.target.value)} className="border px-2 py-1 rounded" />
              </div>

              <fieldset className="space-y-2">
                <legend className="font-semibold">Type</legend>
                {(["all", "true", "false"] as const).map((opt) => (
                  <label key={opt} className="flex items-center space-x-2">
                    <input name="sale" type="radio" value={opt} checked={filters.sale === opt} onChange={() => updateField("sale", opt)} />
                    <span>{opt === "all" ? "All" : opt === "true" ? "Sale" : "Purchase"}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="font-semibold">Tags</legend>
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input name="tags" type="checkbox" value={tag} checked={filters.tags.includes(tag)} onChange={() => toggleTag(tag)} />
                    <span>{tag}</span>
                  </label>
                ))}
              </fieldset>

              <Button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={apply}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
