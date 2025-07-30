import { Link } from "react-router-dom";
import Page from "../components/layout/page";
import Button from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <Page title="404 – Page Not Found">
      <div className="flex flex-col justify-center items-center h-[70vh] p-8 text-center text-gray-800">
        <h1 className="text-[6rem] font-bold mb-4 text-red-600">404</h1>
        <p className="text-lg max-w-md mb-8 text-gray-600">Sorry, the page you’re looking for does not exist.</p>
        <Link to="/adverts">
          <Button $variant="primary">Back to Adverts</Button>
        </Link>
      </div>
    </Page>
  );
}
