import { useState } from "react";

const tagOptions = ["motor", "lifestyle", "mobile", "work"];

type TagsDropdownProps = {
  selectedTags: string[];
  onChange: (selected: string[]) => void;
};

function TagsDropdown({ selectedTags, onChange }: TagsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (tag: string) => {
    const updated = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    onChange(updated);
  };

  return (
    <div>
      <button type="button" onClick={toggleDropdown}>
        Select tags
      </button>

      {isOpen && (
        <ul>
          {tagOptions.map((tag) => (
            <li key={tag}>
              <input type="checkbox" id={`tag-${tag}`} onChange={() => handleCheckboxChange(tag)} checked={selectedTags.includes(tag)} />
              <label htmlFor={`tag-${tag}`}>{tag}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsDropdown;
