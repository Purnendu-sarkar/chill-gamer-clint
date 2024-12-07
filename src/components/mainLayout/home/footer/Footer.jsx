import { Facebook, GamepadIcon, Github, Twitter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <GamepadIcon className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">ChillGamer</span>
            </Link>
            <p className="text-gray-400">
              Your go-to destination for honest and chill game reviews.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-purple-400">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link to="/add-review" className="text-gray-400 hover:text-purple-400">
                  Add Review
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="text-gray-400 hover:text-purple-400">
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400">
                <X className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ChillGamer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;