import React, { useEffect, useState } from "react";
import Calendar from "../calendar/calendar";
import "./bookingForm.css";

import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../firebaseConfig";

const BookingForm = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [service, setService] = useState("");
  const [master, setMaster] = useState("");
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

  useEffect(() => {
    setSlots(generateTimeSlots());

    const fetchBookedSlots = async () => {
      const querySnapshot = await getDocs(collection(db, "bookedSlots"));
      const bookedTimes = querySnapshot.docs.map((doc) => doc.data().time);
      setBookedSlots(bookedTimes);
    };

    fetchBookedSlots();
  }, []);

  const handleSlotClick = async () => {
    if (selectedTime && !bookedSlots.includes(selectedTime)) {
      await addDoc(collection(db, "bookedSlots"), {
        service,
        master,
        time: selectedTime,
      });
      setBookedSlots([...bookedSlots, selectedTime]);
    }
  };

  return (
    <div className="booking-container">
      <h1>Онлайн запис</h1>
      <form id="booking-form">
        <label htmlFor="service">Послуга:</label>
        <select
          id="service"
          name="service"
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Выберите услугу</option>
          <option value="Манікюр">Манікюр</option>
          <option value="Педікюр">Педікюр</option>
          <option value="Массаж">Массаж</option>
          <option value="Фарбування">Фарбування</option>
        </select>

        <label htmlFor="master">Майстер:</label>
        <select
          id="master"
          name="master"
          onChange={(e) => setMaster(e.target.value)}
        >
          <option value="">Выберите мастера</option>
          <option value="Марія">Марія</option>
          <option value="Катерина">Катерина</option>
          <option value="Віка">Віка</option>
          <option value="Сергій">Сергій</option>
        </select>

        <Calendar />

        <div>
          <h3>Выберите время:</h3>
          <div className="time-slot-container">
            {slots.map((time, index) => (
              <button
                type="button"
                key={index}
                className={`time-slot ${
                  bookedSlots.includes(time) ? "booked" : ""
                }`}
                onClick={() => setSelectedTime(time)}
                disabled={bookedSlots.includes(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleSlotClick}>
          Записатись
        </button>
      </form>

      <div id="booking-list">
        <h2>Записи:</h2>
        <ul id="list">
          {bookedSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingForm;
