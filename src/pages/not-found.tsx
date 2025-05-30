import { Link } from "react-router-dom";
import Page from "../components/layout/page";
import Button from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <Page title="404 – Page Not Found">
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>404</h1>
        <p>Sorry, the page you’re looking for does not exist.</p>
        <Link to="/adverts">
          <Button variant="primary">Back to Adverts</Button>
        </Link>
      </div>
    </Page>
  );
}
