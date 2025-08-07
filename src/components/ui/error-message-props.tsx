interface ErrorMessageProps {
  message: string | null;
  onClick?: () => void;
}

export default function ErrorMessage({ message, onClick }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded cursor-pointer text-sm text-center"
      aria-live="assertive"
      onClick={onClick}
    >
      {"⚠️ " + message}
    </div>
  );
}
