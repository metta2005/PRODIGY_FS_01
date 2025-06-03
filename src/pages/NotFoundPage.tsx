import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">Page not found</p>
      <p className="mt-2 text-gray-600 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button>Return to home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;