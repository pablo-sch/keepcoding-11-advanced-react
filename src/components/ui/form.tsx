interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  layout?: "normal" | "withPreview";
  previewSrc?: string | null;
  variant?: "standard" | "search";
}

export default function Form({ children, layout = "normal", previewSrc, variant = "standard", ...props }: FormProps) {
  if (layout === "withPreview") {
    return (
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 max-w-lg flex items-center justify-center bg-gray-100 p-4">
          <div className="w-full h-full bg-white rounded-lg shadow flex items-center justify-center ">
            <img src={previewSrc || "/image-placeholder.jpg"} alt="Preview" className="h-full w-auto rounded-lg" style={{ maxHeight: "100%", objectFit: "contain" }} />
          </div>
        </div>

        <form className="bg-gray-100 p-6 rounded-lg shadow space-y-6 w-full md:w-1/2 max-w-md flex flex-col" {...props} style={{ minHeight: "300px" }}>
          {children}
        </form>
      </div>
    );
  }

  const baseClass = variant === "search" ? "w-full bg-gray-100 flex justify-center items-center gap-4 rounded-md p-2" : "max-w-xl mx-auto bg-gray-100 p-6 rounded-lg shadow space-y-6";
  return (
    <form className={baseClass} {...props}>
      {children}
    </form>
  );
}
