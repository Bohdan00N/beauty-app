import React, { useEffect, useState } from "react";
import "./bookingForm.css";
import localeUk from "air-datepicker/locale/uk";
import AirDatepickerReact from "../../utils/datepicker-react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../firebaseConfig";

const BookingForm = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [service, setService] = useState("");
  const [master, setMaster] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  // Генерация слотов времени
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
      start.setMinutes(start.getMinutes() + 15);
    }
    return timeSlots;
  };

  // Форматирование даты
  const formatDate = (date) =>
    new Intl.DateTimeFormat("uk-UA", { day: "numeric", month: "long", year: "numeric" }).format(date);

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

  useEffect(() => {
    setSlots(generateTimeSlots());
  }, []);

  // Збереження броні в базі даних
  const handleSlotClick = async () => {
    if (service && master && selectedDate && selectedTime && !bookedSlots.includes(selectedTime)) {
      const formattedDate = formatDate(selectedDate);
      const formattedBooking = `${service} у майстра ${master} ${formattedDate} на ${selectedTime}`;
      
      await addDoc(collection(db, "bookedSlots"), {
        service,
        master,
        date: formattedDate,
        time: selectedTime,
      });

      setBookedSlots([...bookedSlots, formattedBooking]);
      alert(formattedBooking);
      setService("");
      setMaster("");
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      alert("Всі поля повинні бути заповнені");
    }
  };

  return (
    <div className="booking-container">
      <h1 className="formh1">Онлайн запис</h1>
      <form id="booking-form" className="bookForm">
        <label htmlFor="service">Послуга:</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
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
        />

        <h3>Оберіть час:</h3>
        <div className="time-slot-container">
          {slots.map((time, index) => {
            const isBooked = bookedSlots.includes(time);
            const isSelected = selectedTime === time;
            const className = `time-slot ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`;

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
    </div>
  );
};

export default BookingForm;
