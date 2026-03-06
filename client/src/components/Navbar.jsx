import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          JobScraper
        </Link>

        {user ? (
          <div className="flex gap-6 items-center">
            <Link to="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link to="/history" className="hover:text-blue-200 transition">
              History
            </Link>
            <Link to="/profile" className="hover:text-blue-200 transition">
              Profile
            </Link>
            <span className="text-sm">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-blue-200 transition">
              Login
            </Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
