import React from "react";

const Step2 = ({ category, data, onSelect }) => {
  const procedures = data[category]?.procedures || [];

  return (
    <div className="step">
      <h2>Оберіть процедуру</h2>
      <ul className="list">
        {procedures.map((procedure) => (
          <li key={procedure.name} className="list-item">
            <button onClick={() => onSelect(procedure)} className="btn">
              {procedure.name} — {procedure.price} грн ({procedure.duration})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Step2;
