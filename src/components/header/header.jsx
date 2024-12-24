import React, { useState } from "react";
import "./header.css";
import geo_icon from "../../images/geo_icon.svg";
import instagram from "../../images/instagram.svg";
// import logo from "../../images/logo.svg";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="block">
      <div className="logo">
        <a  href="/home">
          <p className="logo-text">M</p>
        </a>
      </div>
       <ul className="list">
        <li>
          <a href="/team">Команда</a>
        </li>
        <li>
          <a href="/portfolio">Послуги</a>
        </li>
        <li>
          <a href="/contacts">Контакти</a>
        </li>
      </ul> 
      <div
        className={`burger-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`menu ${isOpen ? "open" : ""}`}>
        <a className='a_list' href="/services">Послуги</a>
        <a className='a_list' href="/team">Команда</a>
        <a className='a_list' href="/portfolio">Портфоліо</a>
        <a className='a_list' href="/contacts">Контакти</a>
          <p className="phone_num">Телефон для запису: <span><a className='tel' href="tel:+380996888282" aria-label="Зателефонувати за номером +38 099 688 82 82">+38 099 688 82 82</a></span></p>
        <ul className="icons_container">
          <li className="icons">
            <a className='img_a' href="https://www.instagram.com/beauty.house.michelle">
            <p className="p">Інстаграм</p>
              <img src={instagram} alt="Instagram" />
            </a>
          </li>
          <li className="icons">
            <a className='img_a' href="https://maps.app.goo.gl/s5ZPLJvvmkDoQAsU6">
          <p className="p">Геопозиція</p>
              <img src={geo_icon} alt="Geo" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
