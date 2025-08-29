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
  isOptional?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      className = "",
      type = "text",
      maxLength,
      maxValue,
      error,
      touched = false,
      onInput,
      onBlur,
      isOptional = false,
      name,
      ...props
    },
    ref
  ) => {
    const isNumber = type === "number";
    const isText = type === "text";
    const shouldShowError = touched && error;

    const config = {
      maxLength: isText && maxLength == null ? 250 : maxLength,
      maxValue: maxValue || 99999,
      minValue: 1,
      maxDigits: 5,
    };

    const sanitizeNumberInput = useCallback(
      (value: string): string => {
        if (value === "") return "";

        const cleanValue = value.replace(/\D/g, "");

        const truncatedValue = cleanValue.length > config.maxDigits ? cleanValue.slice(0, config.maxDigits) : cleanValue;

        if (truncatedValue === "") return "";

        let num = Number(truncatedValue);
        if (num < config.minValue) num = config.minValue;
        if (num > config.maxValue) num = config.maxValue;

        return num.toString();
      },
      [config.maxValue, config.maxDigits, config.minValue]
    );

    const handleNumberInput = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const sanitizedValue = sanitizeNumberInput(e.currentTarget.value);
        e.currentTarget.value = sanitizedValue;
        onInput?.(e);
      },
      [onInput, sanitizeNumberInput]
    );

    const getInputStyles = () => {
      const baseStyles = `w-full px-3 py-2 rounded-md bg-gray-100 text-sm border transition-colors
        focus:outline-none focus:ring-2 hover:cursor-text hover:border-gray-400`;

      const errorStyles = shouldShowError
        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

      return `${baseStyles} ${errorStyles}`;
    };

    const getTypeSpecificProps = () => {
      if (!isNumber) {
        return {
          maxLength: config.maxLength,
          onInput,
        };
      }

      return {
        inputMode: "numeric" as const,
        pattern: `^[1-9][0-9]{0,${config.maxDigits - 1}}$`,
        min: config.minValue,
        max: config.maxValue,
        step: 1,
        onInput: handleNumberInput,
      };
    };

    return (
      <div className={className}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {isOptional && <span className="text-gray-400 text-sm ml-1">(optional)</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          className={getInputStyles()}
          onBlur={onBlur}
          {...getTypeSpecificProps()}
          {...props}
        />

        {shouldShowError && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
