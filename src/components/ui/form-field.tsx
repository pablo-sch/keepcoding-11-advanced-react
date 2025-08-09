import { forwardRef, useCallback } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  type?: string;
  className?: string;
  maxValue?: number;
  error?: string;
  touched?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, className = "", type = "text", maxLength, maxValue, error, touched = false, onInput, onBlur, ...props }, ref) => {
    const isNumber = type === "number";
    const isText = type === "text";

    const finalMaxLength = isText && maxLength == null ? 250 : maxLength;
    const finalMaxValue = maxValue || 99999;

    const shouldShowError = touched && error;

    const handleNumberInput = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value;

        if (val === "") {
          e.currentTarget.value = "";
          if (onInput) onInput(e);
          return;
        }

        val = val.replace(/\D/g, "");

        if (val.length > 5) val = val.slice(0, 5);

        let num = Number(val);
        if (num < 1 && val !== "") num = 1;
        if (num > finalMaxValue) num = finalMaxValue;

        e.currentTarget.value = num > 0 ? num.toString() : "";

        if (onInput) onInput(e);
      },
      [onInput, finalMaxValue]
    );

    return (
      <div className={className}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          inputMode={isNumber ? "numeric" : undefined}
          pattern={isNumber ? `^[1-9][0-9]{0,4}$` : undefined}
          maxLength={isNumber ? undefined : finalMaxLength}
          min={isNumber ? 1 : props.min}
          max={isNumber ? finalMaxValue : props.max}
          step={isNumber ? 1 : props.step}
          className={`w-full px-3 py-2 rounded-md bg-gray-100 text-sm border transition-colors
            ${
              shouldShowError
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }
            focus:outline-none focus:ring-2 hover:cursor-text hover:border-gray-400`}
          onInput={isNumber ? handleNumberInput : onInput}
          onBlur={onBlur}
          {...props}
        />
        {shouldShowError && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
