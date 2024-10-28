import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../firebaseConfig"; // Импортируйте Firestore
import "./timeslots.css"
const TimeSlots = () => {
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Генерация слотов времени
  const generateTimeSlots = () => {
    const start = new Date();
    start.setHours(10, 0, 0, 0); // Начало с 10:00
    const end = new Date();
    end.setHours(20, 0, 0, 0); // Конец в 20:00
    const timeSlots = [];

    while (start < end) {
      timeSlots.push(start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      start.setMinutes(start.getMinutes() + 15); // Увеличиваем на 15 минут
    }

    return timeSlots;
  };

  useEffect(() => {
    setSlots(generateTimeSlots());

    // Получаем данные о забронированных слотах из Firestore
    const fetchBookedSlots = async () => {
      const querySnapshot = await getDocs(collection(db, "bookedSlots"));
      const bookedTimes = querySnapshot.docs.map(doc => doc.data().time);
      setBookedSlots(bookedTimes);
    };

    fetchBookedSlots();
  }, []);

  const handleSlotClick = async (time) => {
    if (!bookedSlots.includes(time)) {
      // Добавляем новый слот времени в Firestore
      await addDoc(collection(db, "bookedSlots"), { time });
      setBookedSlots([...bookedSlots, time]); // Обновляем локальное состояние
    }
  };

  return (
    <div>
      <h3>Выберите время:</h3>
      <div className="time-slot-container">
        {slots.map((time, index) => (
          <button
            key={index}
            className={`time-slot ${bookedSlots.includes(time) ? "booked" : ""}`}
            onClick={() => handleSlotClick(time)}
            disabled={bookedSlots.includes(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
