import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-100">
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <p className="text-2xl mb-8">
        Oops! The page you're looking for isn't here.
      </p>
      <Link to="/" className="link link-info">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
