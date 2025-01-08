import React from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Выход из системы
    navigate("/admin");
     // Перенаправление на /admin
  };

  return (
    <button onClick={handleLogout} className="btn">
      Вийти
    </button>
  );
};

export default LogoutButton;
