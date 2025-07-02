import type { ReactNode } from "react";

interface PageProps {
  title: string;
  children: ReactNode;
}

function Page({ title, children }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6 border-b border-gray-300 pb-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default Page;
