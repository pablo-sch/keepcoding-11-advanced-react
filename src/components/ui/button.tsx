import { useNavigate } from "react-router-dom";
import type { ButtonHTMLAttributes } from "react";
import React, { useCallback } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

const Button = React.memo(function Button({ to, onClick, className = "", ...props }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }

      if (!event.defaultPrevented && to) {
        navigate(to);
      }
    },
    [onClick, to, navigate]
  );

  return (
    <button onClick={handleClick} className={`${className} cursor-pointer bg-gray-200`} {...props}>
      {props.children}
    </button>
  );
});

export default Button;
