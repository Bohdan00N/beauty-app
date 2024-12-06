import React from "react";
import "./contactpage.css";
import instagram from "../../images/instagram.svg";
const ContactPage = () => {
  return (
    <div className="contact_container">
      <h1 className="h1_contacts">Наші контакти</h1>
      <div className="block_contacts">
        <h2 className="h2_contacts">Адреса</h2>
        <h5 className="h2_contacts">м.Лозова вул.Соборна 5</h5>
        <h5 className="h5_contacts">2 поверх</h5>
      </div>
      <div className="block_contacts">
        <h2 className="h2_contacts">Графік роботи</h2>
        <h5 className="h2_contacts">Без вихідних</h5>
        <h5 className="h5_contacts">З 9:00 до 20:00</h5>
      </div>
      <h2 className="h2_contacts_">Контакти</h2>
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

        <div className="instblock">
          <h5 className="text_inst">Інстаграм</h5>
          <a
            className="img_link"
            href="https://www.instagram.com/beauty.house.michelle"
          >
            <img src={instagram} alt="Instagram" />
          </a>
        </div>
      </div>
      <div className="icons_container">
        {/* <p className="p">Геопозиція</p>
        <a className="img_a" href="https://maps.app.goo.gl/s5ZPLJvvmkDoQAsU6">
          <img src={geo_icon} alt="Geo" />
        </a> */}
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d163.95640094069373!2d36.31435624518719!3d48.89057353008248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1732488667397!5m2!1sru!2sua"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
export default ContactPage;
