import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  type?: string;
  className?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ id, label, className = "", ...props }, ref) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      id={id}
      ref={ref}
      className="w-full px-3 py-2 rounded-md bg-gray-100 text-sm border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        hover:cursor-pointer hover:border-gray-400 transition-colors"
      {...props}
    />
  </div>
));

FormField.displayName = "FormField";
export default FormField;
