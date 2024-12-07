import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GamepadIcon, LogOut } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { useAuth } from '../../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  // console.log(user)

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GamepadIcon className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">ChillGamer</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="hover:text-purple-400 px-3 py-2">Home</Link>
              <Link to="/reviews" className="hover:text-purple-400 px-3 py-2">All Reviews</Link>
              {user ? (
                <>
                  <Link to="/add-review" className="hover:text-purple-400 px-3 py-2">Add Review</Link>
                  <Link to="/my-reviews" className="hover:text-purple-400 px-3 py-2">My Reviews</Link>
                  <Link to="/watchlist" className="hover:text-purple-400 px-3 py-2">Watchlist</Link>
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-8 w-8 rounded-full"
                      data-tooltip-id="user-tooltip"
                      data-tooltip-content={user.displayName}
                    />
                    <button
                      onClick={handleLogout}
                      className="hover:text-purple-400"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-purple-400 px-3 py-2">Login</Link>
                  <Link to="/register" className="hover:text-purple-400 px-3 py-2">Register</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-purple-400">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:text-purple-400 px-3 py-2">Home</Link>
            <Link to="/reviews" className="block hover:text-purple-400 px-3 py-2">All Reviews</Link>
            {user ? (
              <>
                <Link to="/add-review" className="block hover:text-purple-400 px-3 py-2">Add Review</Link>
                <Link to="/my-reviews" className="block hover:text-purple-400 px-3 py-2">My Reviews</Link>
                <Link to="/watchlist" className="block hover:text-purple-400 px-3 py-2">Watchlist</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:text-purple-400 px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-purple-400 px-3 py-2">Login</Link>
                <Link to="/register" className="block hover:text-purple-400 px-3 py-2">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
      <Tooltip id="user-tooltip" />
    </nav>
  );
};

export default Navbar;