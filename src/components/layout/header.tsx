import { Link, NavLink } from "react-router-dom";
import IconLong from "../icons/nodepop-react-icon-long";
import AuthButton from "../../pages/auth/auth-button";

const activeLinkClasses = "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";
const inactiveLinkClasses = "text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out";
const authButtonClasses = "text-blue-600 font-semibold rounded-md border border-blue-600 px-4 py-1 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out";

function Header() {
  return (
    <header className="bg-gray-100 shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 rounded-xl overflow-hidden w-60">
            <Link to="/" aria-label="Homepage" className="hover:opacity-80 transition-opacity duration-200 block w-full h-full">
              <IconLong className="w-full h-full" />
            </Link>
          </div>

          <ul className="flex space-x-10 items-center text-base font-medium">
            <li>
              <NavLink to="/adverts/new" className={({ isActive }) => (isActive ? activeLinkClasses : inactiveLinkClasses)}>
                New Advert
              </NavLink>
            </li>
            <li>
              <NavLink to="/adverts" end className={({ isActive }) => (isActive ? activeLinkClasses : inactiveLinkClasses)}>
                Adverts List
              </NavLink>
            </li>
          </ul>

          <div>
            <AuthButton className={authButtonClasses} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
