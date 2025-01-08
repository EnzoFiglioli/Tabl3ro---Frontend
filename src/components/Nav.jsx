import { useModal } from "../context/ModalContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import Cookies from "universal-cookie";

const Nav = () => {
  const { session, setSession } = useSession();
  const { openModal } = useModal();
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    
    const token = cookies.get("token");
    setIsLoggedIn(!!token);
    setSession(isLoggedIn);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    setSession(false);
    cookies.remove("token", { path: "/" });
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="flex justify-between items-center p-4 text-white">
      <h1 className="text-2xl font-bold">Tabl3ro</h1>
      <div className="flex items-center gap-4">
        <span onClick={toggleTheme}>
          <i className="fa-solid fa-circle-half-stroke"></i>
        </span>
        {isLoggedIn ? (
          <div className="flex gap-4">
            <Link to="dashboard"><i className="fa-solid fa-house"></i></Link>
            <Link to="notifications"><i className="fa-solid fa-bell"></i></Link>
            <Link to="profile">Profile</Link>
            <button onClick={handleLogout} className="text-red-500">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            className="bg-white dark:text-black font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
