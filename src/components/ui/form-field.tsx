import type { ComponentProps } from "react";

import { forwardRef } from "react";

interface FormFieldProps extends ComponentProps<"input"> {
  label: string;
}

/* const FormField = ({ label, ...props }: FormFieldProps) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        <span>{label}</span>
        <input className="form-field-input" autoComplete="off" {...props} />
      </label>
    </div>
  );
}; */

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ label, ...props }, ref) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        <span>{label}</span>
        <input ref={ref} className="form-field-input" autoComplete="off" {...props} />
      </label>
    </div>
  );
});

export default FormField;
