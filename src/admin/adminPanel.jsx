import React, { useState } from "react";
import "./adminPanel.css";
import { SidebarAdmin } from "./adminComponents/sidebarAdmin";
const AdminPanel = () => {
  const LOGIN = process.env.REACT_APP_LOGIN;
  const PASSWORD = process.env.REACT_APP_PASSWORD;

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(""); 

  const submit = () => {
    if (login !== LOGIN) {
      setError("Неправильний логін");
      return;
    }
    if (password !== PASSWORD) {
      setError("Неправильний пароль");
      return;
    }
    setIsAuthenticated(true);
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <div className="adminCont">
        <h1 className="h1admin">Вхід у систему</h1>
        <input
          className="input"
          type="text"
          placeholder="Логін"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={submit}>
          Увійти
        </button>
        {error && <p className="error">{error}</p>} {/* Відображення помилок */}
      </div>
    );
  }

  return (
    <SidebarAdmin/>
  );
};

export default AdminPanel;
