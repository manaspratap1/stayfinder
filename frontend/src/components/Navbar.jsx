import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeClass = 'text-blue-600 font-semibold';
  const linkClass = 'hover:text-blue-500 transition';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    setUsername(user?.name || '');
    setIsMobileMenuOpen(false); // close menu on route change
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StayFinder
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <Link
            to="/listings"
            className={location.pathname.startsWith('/listings') ? activeClass : linkClass}
          >
            Listings
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/bookings"
                className={location.pathname === '/bookings' ? activeClass : linkClass}
              >
                Bookings
              </Link>
              <Link
                to="/host/dashboard"
                className={location.pathname.startsWith('/host') ? activeClass : linkClass}
              >
                Host Dashboard
              </Link>
              <span className="text-gray-700 font-medium">👤 {username}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={location.pathname === '/login' ? activeClass : linkClass}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={location.pathname === '/register' ? activeClass : linkClass}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col mt-4 space-y-3 text-sm font-medium md:hidden">
          <Link
            to="/listings"
            className={location.pathname.startsWith('/listings') ? activeClass : linkClass}
          >
            Listings
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/bookings"
                className={location.pathname === '/bookings' ? activeClass : linkClass}
              >
                Bookings
              </Link>
              <Link
                to="/host/dashboard"
                className={location.pathname.startsWith('/host') ? activeClass : linkClass}
              >
                Host Dashboard
              </Link>
              <span className="text-gray-700 font-medium">👤 {username}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={location.pathname === '/login' ? activeClass : linkClass}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={location.pathname === '/register' ? activeClass : linkClass}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
