import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, LogOut, User } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { logout } from "../utils/userSlice";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user || !user.firstName) return null; // Hide on unauthenticated pages like login/signup/complete-profile

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(logout);
      navigate("/login");
    } catch (err) {
      console.log("Logout Error: " + err.message);
      alert("An error occured during logout. Please try again");
    }
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          BugFixer<span className="text-gray-900"> Pro</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/bugs" className="hover:text-blue-600">
            Bugs
          </Link>
          <Link to="/report-bug" className="hover:text-blue-600">
            Report a Bug
          </Link>
        </nav>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
            Welcome, {user.firstName}
          </span>
          <Link
            to="/profile"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <User className="w-5 h-5 text-gray-600" />
          </Link>
          <button
            onClick={handleLogout}
            className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
