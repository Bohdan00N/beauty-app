import React from "react";
import "./contactpage.css";
import instagram from "../../images/instagram.svg";
import geo_icon from "../../images/geo_icon.svg";
const ContactPage = () => {
  return (
    <div className="contact_container">
      <h1 className="h1_contacts">Наші контакти</h1>
      <div className="block_contacts">
        <h2 className="h2_contacts">Адреса</h2>
        <h5 className="h5_contacts">м.Лозова вул.Соборна 5</h5>
        <h5 className="h5_contacts">2 поверх</h5>
      </div>
      <div className="block_contacts">
        <h2 className="h2_contacts">Графік роботи</h2>
        <h5 className="h5_contacts">Без вихідних</h5>
        <h5 className="h5_contacts">З 9:00 до 20:00</h5>
      </div>
      <h2 className="h2_contacts">Контакти</h2>
      <div className="block_contacts_2">
        <div>
          <h5 className="h5_contacts">Телефон для запису</h5>
          <a
            className="tele"
            href="tel:+380996888282"
            aria-label="Зателефонувати за номером +38 099 688 82 82"
          >
            +38 099 688 82 82
          </a>
        </div>
      </div>

      <div className="contacts_svg">
        <div className="instblock">
          <a
            className="img_link"
            href="https://www.instagram.com/beauty.house.michelle"
          >
            <p className="text_inst">Інстаграм</p>
            <img className="img_inst" src={instagram} alt="Instagram" />
          </a>
        </div>
        <div className="instblock">
          <a
            className="img_link"
            href="https://maps.app.goo.gl/s5ZPLJvvmkDoQAsU6"
          >
            <p className="text_inst">Геопозиція</p>
            <img className="img_inst" src={geo_icon} alt="Geo" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
