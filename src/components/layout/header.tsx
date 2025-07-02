import { Link, NavLink } from "react-router-dom";
import WebIcon from "../icons/nodepop-icon";
import AuthButton from "../../pages/auth/auth-button";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left */}
          <div className="flex-shrink-0">
            <Link to="/">
              <WebIcon className="w-8 h-8" />
            </Link>
          </div>

          {/* Center */}
          <div>
            <ul className="flex space-x-8">
              <li>
                <NavLink to="/adverts/new" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600")}>
                  New Advert
                </NavLink>
              </li>
              <li>
                <NavLink to="/adverts" end className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600")}>
                  Adverts List
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div>
            <AuthButton className="text-blue-600 font-semibold" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
