import React from "react";

const Confirmation = ({ formData, onSubmit, onBack }) => {
  return (
    <div className="step">
      <h2>Підтвердіть ваш запис</h2>
      <ul className="confirmation-list">
        <li>Категорія: {formData.selectedCategory}</li>
        <li>Процедура: {formData.selectedProcedure?.name}</li>
        <li>Майстер: {formData.selectedMaster}</li>
        <li>Дата: {formData.selectedDate}</li>
        <li>Час: {formData.selectedTime}</li>
        <li>Ім'я: {formData.clientName}</li>
        <li>Телефон: {formData.clientPhone}</li>
      </ul>

      <button onClick={onBack} className="btn-back">
        Назад
      </button>
      <button onClick={onSubmit} className="btn-submit">
        Підтвердити
      </button>
    </div>
  );
};

export default Confirmation;
