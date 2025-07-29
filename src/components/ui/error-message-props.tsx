interface ErrorMessageProps {
  message: string | null;
  className?: string;
}

export default function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div role="alert" className={`text-red-600 text-sm font-medium my-1 flex items-center gap-2 ${className}`} aria-live="assertive">
      <span aria-hidden="true">⚠️</span>
      <span>{message}</span>
    </div>
  );
}
