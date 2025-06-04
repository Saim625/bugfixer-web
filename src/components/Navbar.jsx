import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
      <h1 className="text-2xl font-bold tracking-tight">
        BugFixer<span className="text-blue-600">Pro</span>
      </h1>
      <nav className="space-x-4">
        <Link to="/login" className="text-sm hover:underline">
          Login
        </Link>
        <Link
          to="/signup"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
};
