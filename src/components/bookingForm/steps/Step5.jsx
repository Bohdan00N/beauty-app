import React from "react";

const Step5 = ({ clientName, clientPhone, onNameChange, onPhoneChange, onNext }) => {
  return (
    <div className="step">
      <h2>Введіть ваші дані</h2>
      <div className="form-group">
        <label>Ім'я:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ваше ім'я"
        />
      </div>

      <div className="form-group">
        <label>Телефон:</label>
        <input
          type="tel"
          value={clientPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Ваш телефон"
        />
      </div>

      <button onClick={onNext} disabled={!clientName || !clientPhone} className="btn-next">
        Далі
      </button>
    </div>
  );
};

export default Step5;
