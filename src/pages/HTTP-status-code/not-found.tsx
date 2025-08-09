//DEPENDENCIES
import { Link } from "react-router-dom";

//REACT
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";

export default function NotFoundPage() {
  return (
    <Page title="Page Not Found">
      <div className=" min-h-screen flex flex-col items-center p-8 text-center text-gray-800">
        <div className="relative w-[240px] h-[240px] mb-8">
          <img src="/lupe.webp" alt="Search Icon" className="w-full h-full object-contain" />
          <h1 className="absolute bottom-0 -left-15 text-[6rem] font-bold text-pink-600 leading-none">404</h1>{" "}
        </div>

        <p className="text-lg max-w-md mb-8 text-gray-600">Sorry, the page you’re looking for does not exist.</p>

        <Link to="/adverts">
          <Button $variant="primary">Back to Adverts</Button>
        </Link>
      </div>
    </Page>
  );
}
