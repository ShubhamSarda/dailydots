import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation component
 * Displays main navigation links with active state
 */
export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img 
              src="/src/assets/logo.png" 
              alt="Daily Dots" 
              className="h-8"
            />
          </Link>

          <div className="flex gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/journals"
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                isActive('/journals')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              My Journals
            </Link>
            <Link
              to="/new"
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                isActive('/new')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Add Journal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
