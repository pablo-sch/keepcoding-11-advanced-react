import { useRef, useEffect, useState, useCallback } from "react";
import Button from "../../components/ui/button";

export type FilterCriteria = {
  name: string;
  price: string;
  sale: "true" | "false" | "all";
  tags: string[];
};

type Props = {
  appliedFilters: FilterCriteria;
  dbTags: string[];
  onApply: (filters: FilterCriteria) => void;
  onToggle?: (isOpen: boolean) => void;
};

function FilterDropdown({ appliedFilters, dbTags, onApply }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const saleRefs = {
    all: useRef<HTMLInputElement>(null),
    true: useRef<HTMLInputElement>(null),
    false: useRef<HTMLInputElement>(null),
  };
  const tagRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (nameRef.current) nameRef.current.value = appliedFilters.name;
    if (priceRef.current) priceRef.current.value = appliedFilters.price;

    Object.entries(saleRefs).forEach(([key, ref]) => {
      if (ref.current) ref.current.checked = appliedFilters.sale === key;
    });

    dbTags.forEach((tag) => {
      if (!tagRefs.current[tag]) return;
      tagRefs.current[tag]!.checked = appliedFilters.tags.includes(tag);
    });
  }, [appliedFilters, dbTags]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const handleApplyClick = useCallback(() => {
    if (!nameRef.current || !priceRef.current) return;

    const selectedSale = Object.entries(saleRefs).find(([, ref]) => ref.current?.checked)?.[0] ?? "all";
    const selectedTags = dbTags.filter((tag) => tagRefs.current[tag]?.checked);

    onApply({
      name: nameRef.current.value,
      price: priceRef.current.value,
      sale: selectedSale as "true" | "false" | "all",
      tags: selectedTags,
    });
  }, [dbTags, onApply]);

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown}>{isOpen ? "Close Filters" : "Filter Adverts"}</button>
      <div className={`absolute z-10 mt-2 w-80 bg-white shadow-lg border rounded p-4 transition-all duration-200 ${isOpen ? "block" : "hidden"}`}>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <input name="name" type="text" placeholder="Name" className="border px-2 py-1 rounded" ref={nameRef} />
            <label className="font-medium">Price</label>
            <input name="price" type="number" className="border px-2 py-1 rounded" ref={priceRef} />
          </div>

          <fieldset className="space-y-2">
            <legend className="font-semibold">Type</legend>
            {(["all", "true", "false"] as const).map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input type="radio" name="sale" value={opt} ref={saleRefs[opt]} />
                <span>{opt === "all" ? "All" : opt === "true" ? "Sale" : "Purchase"}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="font-semibold">Tags</legend>
            {dbTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tag}
                  ref={(el) => {
                    tagRefs.current[tag] = el;
                  }}
                />
                <span>{tag}</span>
              </label>
            ))}
          </fieldset>

          <Button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleApplyClick}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterDropdown;
