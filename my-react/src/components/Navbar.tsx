import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, UserIcon, LogOutIcon, FileTextIcon } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 shadow-md flex justify-between items-center">
      {}
      <div className="flex space-x-6">
        <Link
          to="/home"
          className={`text-white font-semibold flex items-center gap-2 ${
            location.pathname === "/home" ? "opacity-100" : "opacity-75 hover:opacity-100"
          } transition`}
        >
          <HomeIcon size={20} /> Головна
        </Link>
        <Link
          to="/profile"
          className={`text-white font-semibold flex items-center gap-2 ${
            location.pathname === "/profile" ? "opacity-100" : "opacity-75 hover:opacity-100"
          } transition`}
        >
          <UserIcon size={20} /> Профіль
        </Link>
        <Link
          to="/survey"
          className={`text-white font-semibold flex items-center gap-2 ${
            location.pathname === "/survey" ? "opacity-100" : "opacity-75 hover:opacity-100"
          } transition`}
        >
          <FileTextIcon size={20} /> Анкета
        </Link>
      </div>

      {}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition shadow-md"
      >
        <LogOutIcon size={18} /> Вийти
      </button>
    </nav>
  );
};

export default Navbar;
