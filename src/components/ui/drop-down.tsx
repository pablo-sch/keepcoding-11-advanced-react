type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  label?: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export default function Dropdown({ label, name, value, options, onChange, className = "" }: DropdownProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-gray-100 text-sm border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          hover:cursor-pointer hover:border-gray-400 transition-colors"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
