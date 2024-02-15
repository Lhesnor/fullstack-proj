import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const errorMessage = error.statusText || error.message;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        Sorry, an unexpected error has occurred: <i>{errorMessage}</i>
      </p>
      <Link to={"/"}>Back to the main page</Link>
    </div>
  );
}
