import styled from "styled-components";
import clsx from "clsx";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: Variant;
  to?: string;
  as?: "link";
}

const variantStyles = {
  primary: "bg-blue-500 text-white border border-blue-500 hover:bg-blue-600",
  secondary: "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50",
  danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700",
};

const StyledButton = styled.button<{ $variant: Variant; disabled?: boolean }>`
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

export default function Button({ children, className, $variant = "primary", to, disabled, ...props }: ButtonProps) {
  const commonClassNames = clsx("inline-flex items-center justify-center rounded-full px-6 py-2 font-semibold min-w-[72px] min-h-[36px] transition-colors duration-200", variantStyles[$variant], disabled && "opacity-50 pointer-events-none", className);

  if (to) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link to={to} className={commonClassNames} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <StyledButton className={commonClassNames} disabled={disabled} $variant={$variant} {...props}>
      {children}
    </StyledButton>
  );
}
