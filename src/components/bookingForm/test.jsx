import React, { useEffect, useState } from "react";
import "./bookingForm.css";
import localeUk from "air-datepicker/locale/uk";
import AirDatepickerReact from "../../utils/datepicker-react";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import db from "../../firebaseConfig";
import { data } from "../../utils/database";
const Test = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [master, setMaster] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const generateTimeSlots = () => {
    const start = new Date();
    start.setHours(10, 0, 0, 0);
    const end = new Date();
    end.setHours(20, 0, 0, 0);
    const timeSlots = [];

    while (start < end) {
      timeSlots.push(
        start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      start.setMinutes(start.getMinutes() + 30);
    }
    return timeSlots;
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  const handleDateChange = async (date) => {
    if (date instanceof Date && !isNaN(date)) {
      setSelectedDate(date);
      const formattedDate = formatDate(date);
      const querySnapshot = await getDocs(collection(db, "bookedSlots"));
      const bookedTimes = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((doc) => doc.date === formattedDate)
        .map((doc) => doc.time);
      setBookedSlots(bookedTimes);
    }
  };

  const set = async () => {
    try {
      await setDoc(doc(db, "staff", "personnel"), data);
      console.log("Дані успішно записані в Firestore.");
    } catch (error) {
      console.error("Помилка запису в Firestore:", error);
    }
  };
  useEffect(() => {
    setSlots(generateTimeSlots());
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSlotClick = async () => {
    if (
      service &&
      master &&
      selectedDate &&
      selectedTime &&
      name &&
      phone &&
      phone.length === 10 &&
      phone.startsWith("0") &&
      !bookedSlots.includes(selectedTime)
    ) {
      const formattedDate = formatDate(selectedDate);
      const formattedBooking = `${service} у майстра ${master} ${formattedDate} на ${selectedTime}`;

      await addDoc(collection(db, "bookedSlots"), {
        name,
        phone,
        service,
        master,
        date: formattedDate,
        time: selectedTime,
      });

      setBookedSlots([...bookedSlots, formattedBooking]);
      alert(formattedBooking);

      setService("");
      setMaster("");
      setName("");
      setPhone("");
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      alert(
        "Всі поля повинні бути заповнені і номер телефону має бути коректним"
      );
    }
  };

  return (
    <div className="booking-container">
      <h1 className="formh1">Онлайн запис</h1>
      <form id="booking-form" className="bookForm">
        <label htmlFor="name">Ваше ім'я:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
          placeholder="Введіть ім'я"
        />

        <label htmlFor="phone">Номер телефону:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          pattern="^0[0-9]{9}$"
          maxLength="10"
          required
          placeholder="Введіть номер"
        />

        <label htmlFor="service">Послуга:</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Оберіть послугу
          </option>
          <option value="Манікюр">Манікюр</option>
          <option value="Педікюр">Педікюр</option>
          <option value="Массаж">Массаж</option>
          <option value="Фарбування">Фарбування</option>
        </select>

        <label htmlFor="master">Майстер:</label>
        <select
          value={master}
          id="master"
          onChange={(e) => setMaster(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Оберіть майстра
          </option>
          <option value="Марія">Марія</option>
          <option value="Катерина">Катерина</option>
          <option value="Віка">Віка</option>
          <option value="Сергій">Сергій</option>
        </select>

        <label htmlFor="date">Дата:</label>
        <AirDatepickerReact
          minDate={new Date()}
          locale={localeUk}
          value={selectedDate}
          onDateChange={handleDateChange}
          autoClose
          isMobile
          placeholder="Оберіть дату"
          required
        />

        <h3 className="time-pick">Оберіть час:</h3>
        <div className="time-slot-container">
          {slots.map((time, index) => {
            const isBooked = bookedSlots.includes(time);
            const isSelected = selectedTime === time;
            const className = `time-slot ${isBooked ? "booked" : ""} ${
              isSelected ? "selected" : ""
            }`;

            return (
              <button
                type="button"
                key={index}
                className={className}
                onClick={() => setSelectedTime(time)}
                disabled={isBooked}
              >
                {time}
              </button>
            );
          })}
        </div>

        <button className="book_button" type="button" onClick={handleSlotClick}>
          Записатись
        </button>
      </form>
      <button onClick={set}>A</button>
    </div>
  );
};

export default Test;
