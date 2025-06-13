import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const activeClass = 'text-blue-600 font-semibold';
  const linkClass = 'hover:text-blue-500 transition';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    setUsername(user?.name || '');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">StayFinder</Link>

      <div className="space-x-6 text-sm font-medium flex items-center">
        <Link
          to="/listings"
          className={location.pathname.startsWith('/listings') ? activeClass : linkClass}
        >
          Listings
        </Link>

        {isLoggedIn && (
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

            <span className="text-gray-700 font-medium">
              👤 {username}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition"
            >
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
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
    </nav>
  );
}

export default Navbar;
