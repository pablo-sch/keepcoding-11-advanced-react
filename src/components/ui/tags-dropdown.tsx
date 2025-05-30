// TagsDropdown.tsx
import { useState, useEffect } from "react";
import { getTags } from "../../pages/advert/service"; // ajusta la ruta

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
      <button type="button" onClick={toggleDropdown}>
        {selectedTags.length > 0 ? `Tags: ${selectedTags.join(", ")}` : "Select tags"}
      </button>

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
