import { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: string;
};

type BaseDropdownProps = {
  label?: string;
  name: string;
  options: Option[];
  className?: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  isOptional?: boolean;
};

type SingleDropdownProps = BaseDropdownProps & {
  value: string;
  onChange: (value: string) => void;
  multiple?: false;
};

type MultipleDropdownProps = BaseDropdownProps & {
  value: string[];
  onChange: (value: string[]) => void;
  multiple: true;
  maxSelections?: number;
};

type DropdownProps = SingleDropdownProps | MultipleDropdownProps;

function SingleDropdown({
  label,
  name,
  value,
  options,
  onChange,
  className = "",
  placeholder = "Select an option",
  error,
  touched,
  isOptional = false,
}: SingleDropdownProps) {
  const shouldShowError = touched && error;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {isOptional && <span className="text-gray-400 text-sm ml-1">(optional)</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 rounded-md bg-gray-100 text-sm border transition-colors
          ${
            shouldShowError
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }
          focus:outline-none focus:ring-2 hover:cursor-pointer hover:border-gray-400`}
      >
        {placeholder && value === "" && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value: optValue, label }) => (
          <option key={optValue} value={optValue}>
            {label}
          </option>
        ))}
      </select>
      {shouldShowError && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function MultipleDropdown({
  label,
  name,
  value,
  options,
  onChange,
  className = "",
  placeholder = "Select options",
  maxSelections,
  error,
  touched,
  isOptional = false,
}: MultipleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shouldShowError = touched && error;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (optionValue === "") return;

    const currentValues = value || [];
    const isSelected = currentValues.includes(optionValue);

    if (isSelected) {
      onChange(currentValues.filter((v) => v !== optionValue));
    } else {
      if (!maxSelections || currentValues.length < maxSelections) {
        onChange([...currentValues, optionValue]);
      }
    }
  };

  const removeOption = (optionValue: string) => {
    onChange((value || []).filter((v) => v !== optionValue));
  };

  const getSelectedLabels = () => {
    const currentValues = value || [];
    return currentValues
      .map((val) => options.find((option) => option.value === val))
      .filter((option) => option && option.value !== "")
      .map((option) => ({ value: option!.value, label: option!.label }));
  };

  const selectedItems = getSelectedLabels();
  const hasSelections = selectedItems.length > 0;

  const getDropdownStyles = () => {
    const baseStyles = `w-full px-3 py-2 rounded-md bg-gray-100 text-sm border text-left transition-colors
      focus:outline-none focus:ring-2 hover:cursor-pointer hover:border-gray-400
      flex items-center justify-between`;

    const errorStyles = shouldShowError
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

    return `${baseStyles} ${errorStyles}`;
  };

  return (
    <div className={className} ref={dropdownRef}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {isOptional && <span className="text-gray-400 text-sm ml-1">(optional)</span>}
        </label>
      )}

      {hasSelections && (
        <div className="mb-2 flex flex-wrap gap-1">
          {selectedItems.map((item) => (
            <span
              key={item.value}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
            >
              {item.label}
              <button
                type="button"
                onClick={() => removeOption(item.value)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <button type="button" onClick={() => setIsOpen(!isOpen)} className={getDropdownStyles()}>
        <span className={hasSelections ? "text-gray-900" : "text-gray-500"}>
          {hasSelections ? `${selectedItems.length} tag${selectedItems.length !== 1 ? "s" : ""} selected` : placeholder}
        </span>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options
            .filter((option) => option.value !== "")
            .map(({ value: optionValue, label }) => {
              const isSelected = (value || []).includes(optionValue);
              const isDisabled = Boolean(maxSelections && !isSelected && (value || []).length >= maxSelections);

              return (
                <label
                  key={optionValue}
                  className={`w-full px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer
                    ${isDisabled ? "text-gray-400 cursor-not-allowed hover:bg-transparent" : "text-gray-900"}
                    flex items-center gap-3 transition-colors`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => !isDisabled && toggleOption(optionValue)}
                    disabled={isDisabled}
                    className={`w-4 h-4 rounded border-gray-300 text-blue-600 
                      focus:ring-blue-500 focus:ring-2 focus:ring-offset-0
                      ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  />
                  <span className={`flex-1 ${isSelected ? "font-medium" : ""}`}>{label}</span>
                  {maxSelections && !isSelected && (value || []).length >= maxSelections && (
                    <span className="text-xs text-gray-400">Max reached</span>
                  )}
                </label>
              );
            })}
          {options.filter((opt) => opt.value !== "").length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No options available</div>
          )}
        </div>
      )}

      {shouldShowError && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Dropdown(props: DropdownProps) {
  if (props.multiple) {
    return <MultipleDropdown {...props} />;
  }
  return <SingleDropdown {...props} />;
}

export { SingleDropdown, MultipleDropdown };
