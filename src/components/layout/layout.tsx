import { type ReactNode } from "react";
import Footer from "./footer";
import Header, {type HeaderProps} from "./header";


interface LayoutProps extends HeaderProps{
  title: string;
  children: ReactNode;
}

function Layout({ title, children, isLoggedIn, onLogout }: LayoutProps) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout}/>
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;