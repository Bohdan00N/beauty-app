import React, { useState } from "react";
import "./header.css";
import logo from "../../images/logo.svg";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="block">
      <div className="logo">
        <a href="/">
          {" "}
          <img src={logo} alt="Logo" />
        </a>
      </div>
      {/* <ul className="list">
        <li>
          <a href="/">Команда</a>
        </li>
        <li>
          <a href="/">Послуги</a>
        </li>
        <li>
          <a href="/">Контакти</a>
        </li>
      </ul> */}
      <div className={`burger-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <a href="#home">Команда</a>
        <a href="#services">Послуги</a>
        <a href="#contact">Контакти</a>
      </nav>
    </div>
  );
};
export default Header;
