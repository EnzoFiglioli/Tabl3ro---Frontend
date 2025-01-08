import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./pages/register.jsx";
import { ModalProvider } from "./context/ModalContext";
import { SessionProvider } from "./context/SessionContext";
import { ProtectedRoute } from "./context/ProtectedRoutes";

createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  </SessionProvider>
);
