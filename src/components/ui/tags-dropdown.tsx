import { useState, useEffect } from "react";
import { getTags } from "../../pages/advert/service";
import Button from "./button";

type TagsDropdownProps = {
  selectedTags: string[];
  onChange: (selected: string[]) => void;
};

export default function TagsDropdown({ selectedTags, onChange }: TagsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    getTags().then((tags) => {
      if (mounted) setOptions(tags);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (tag: string) => {
    const updated = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    onChange(updated);
  };

  return (
    <div className="tags-dropdown">
      <Button type="button" onClick={toggleDropdown}>
        {selectedTags.length > 0 ? `${selectedTags.join(", ")}` : "Select tags"}
      </Button>

      {isOpen && (
        <ul className="tags-list">
          {options.map((tag) => (
            <li key={tag}>
              <label>
                <input type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={() => handleCheckboxChange(tag)} />
                {tag}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
