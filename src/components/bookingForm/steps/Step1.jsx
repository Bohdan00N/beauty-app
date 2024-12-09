import React from "react";

const Step1 = ({ data, onSelect }) => {
  const categories = Object.keys(data);

  return (
    <div className="step">
      <h2>Оберіть категорію процедур</h2>
      <ul className="list">
        {categories.map((category) => (
          <li key={category} className="list-item">
            <button onClick={() => onSelect(category)} className="btn">
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Step1;
