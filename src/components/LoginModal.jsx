import { useState } from "react";
import { useModal } from "../context/ModalContext";
import { useSession } from "../context/SessionContext";
import { baseDir } from "../path.js";
import { useNavigate, Link } from "react-router-dom";

const LoginModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setSession, setSessionData } = useSession();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${baseDir}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Error al iniciar sesión");
      }

      const userData = await response.json();
      setSession(true);
      setSessionData(userData.usuario);
      closeModal(); // Cierra el modal
      navigate("/dashboard"); // Redirige al dashboard o la ruta deseada
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        className="modal-content dark:bg-black bg-white p-8 rounded shadow-lg relative"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          aria-label="Cerrar"
          className="absolute top-4 right-4 p-2 text-black dark:text-white font-bold"
          onClick={closeModal}
        >
          X
        </button>
        <h2 className="dark:text-white text-xl font-bold">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <label htmlFor="email" className="block dark:text-white mt-4">
          Correo Electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ejemplo@correo.com"
          className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="block dark:text-white mt-4">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          className="w-full p-2 border border-gray-300 rounded mt-2 text-black"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-blue-500 dark:text-white rounded hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </button>
        <p className="dark:text-white mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>.
        </p>
      </form>
    </div>
  );
};

export default LoginModal;
