import type { ReactNode } from "react";

interface PageProps {
  title: string;
  children: ReactNode;
}

function Page({ title, children }: PageProps) {
  return (
    <div className="main-content">
      <div className="main-title">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default Page;
