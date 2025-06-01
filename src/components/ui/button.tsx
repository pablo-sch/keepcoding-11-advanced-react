import { useNavigate } from "react-router-dom";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

function Button({ to, onClick, ...props }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }

    if (!event.defaultPrevented && to) {
      navigate(to);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
