import React from 'react'
import Calendar from '../calendar/calendar'
import "./bookingForm.css"
const BookingForm = () => {
  return (
    <div className="booking-container">
        <h1>Онлайн запис</h1>
        <form id="booking-form">
            <label htmlFor="service">Послуга:</label>
            <select id="service" name="service">
                <option value="Манікюр">Манікюр</option>
                <option value="Педікюр">Педікюр</option>
                <option value="Массаж">Массаж</option>
                <option value="Фарбування">Фарбування</option>
            </select>
            <label htmlFor="master">Майстер:</label>
            <select id="master" name="master">
                <option value="Марія">Марія</option>
                <option value="Катерина">Катерина</option>
                <option value="Віка">Віка</option>
                <option value="Сергій">Сергій</option>
            </select>
            <Calendar/>
            <div className="time-slots">
                <h3>Обід</h3>
                <div className="time-slot-group" id="afternoon-slots">
                </div>
                <h3>Вечір</h3>
                <div className="time-slot-group" id="evening-slots">
                </div>
            </div>
            <button type="submit">Записатись</button>
        </form>

        <div id="booking-list">
            <h2>Записи:</h2>
            <ul id="list"></ul>
        </div></div>
  )
}
export default BookingForm