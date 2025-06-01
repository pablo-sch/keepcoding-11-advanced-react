import type { ComponentProps } from "react";

import { forwardRef } from "react";

interface FormFieldProps extends ComponentProps<"input"> {
  label: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ label, ...props }, ref) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        <span className="form-field-span">{label}</span>
        <input className="form-field-input" ref={ref} autoComplete="off" {...props} />
      </label>
    </div>
  );
});

export default FormField;
