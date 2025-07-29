import type { ReactNode } from "react";

import Title from "../ui/title-props";

interface PageProps {
  title: ReactNode;
  children: ReactNode;
}

function Page({ title, children }: PageProps) {
  return (
    <div className="page-content flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200">
      <Title>{title}</Title>
      <div className="page-children">{children}</div>
    </div>
  );
}

export default Page;
