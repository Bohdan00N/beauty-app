import React, { useState } from "react";

const Step4 = ({ selectedDate, selectedTime, slots, bookedSlots, onDateChange, onTimeSelect, onNext }) => {
  const [date, setDate] = useState(selectedDate);

  const availableSlots = slots.filter((slot) => !bookedSlots.includes(slot));

  return (
    <div className="step">
      <h2>Оберіть дату та час</h2>
      <div className="form-group">
        <label>Дата:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            onDateChange(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Час:</label>
        <ul className="list">
          {availableSlots.map((slot) => (
            <li key={slot} className="list-item">
              <button onClick={() => onTimeSelect(slot)} className="btn">
                {slot}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onNext} disabled={!selectedTime} className="btn-next">
        Далі
      </button>
    </div>
  );
};

export default Step4;
