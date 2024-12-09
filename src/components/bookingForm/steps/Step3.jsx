import React from "react";

const Step3 = ({ category, procedure, data, onSelect }) => {
  const masters = Object.keys(data).filter((masterKey) =>
    data[masterKey].procedures.includes(procedure.name)
  );

  return (
    <div className="step">
      <h2>Оберіть майстра</h2>
      <ul className="list">
        {masters.map((masterKey) => {
          const master = data[masterKey];
          return (
            <li key={masterKey} className="list-item">
              <button onClick={() => onSelect(master.name)} className="btn">
                {master.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Step3;
