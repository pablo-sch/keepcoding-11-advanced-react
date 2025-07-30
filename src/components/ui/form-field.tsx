import { forwardRef, useCallback } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  name: string;
  type?: string;
  className?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ id, label, className = "", type = "text", maxLength, onInput, ...props }, ref) => {
  const isNumber = type === "number";
  const isText = type === "text";

  const finalMaxLength = isText && maxLength == null ? 250 : maxLength;

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
      if (num < 1) num = 1;
      if (num > 99999) num = 99999;

      e.currentTarget.value = num.toString();

      if (onInput) onInput(e);
    },
    [onInput]
  );

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        inputMode={isNumber ? "numeric" : undefined}
        pattern={isNumber ? "^[1-9][0-9]{0,4}$" : undefined}
        maxLength={isNumber ? undefined : finalMaxLength}
        min={isNumber ? 1 : props.min}
        max={isNumber ? 99999 : props.max}
        step={isNumber ? 1 : props.step}
        className="w-full px-3 py-2 rounded-md bg-gray-100 text-sm border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            hover:cursor-text hover:border-gray-400 transition-colors"
        onInput={isNumber ? handleNumberInput : onInput}
        {...props}
      />
    </div>
  );
});

FormField.displayName = "FormField";
export default FormField;
