import React, { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { collection, doc, getDoc, addDoc, getDocs } from "firebase/firestore";
import "./bookingForm.css";
import AirDatepickerReact from "../../utils/datepicker-react";
import localeUk from "air-datepicker/locale/uk";
import { useNavigate } from "react-router-dom";
const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [base, setBase] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const DT = doc(db, "staff", "personnel");
      const docSnap = await getDoc(DT);
      if (docSnap.exists()) {
        setBase(docSnap.data());
      }
    };
    fetchData();
  }, []);

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handlePreviousStep = () => setCurrentStep(currentStep - 1);

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setCurrentStep(2);
  };

  const handleProcedureSelect = (procedureKey) => {
    setSelectedProcedure(procedureKey);
    setCurrentStep(3);
  };

  const handleMasterSelect = (masterName) => {
    setSelectedMaster(masterName);
    setCurrentStep(4);
  };

  const handleSubmit = async () => {
    try {
      const bookingRef = collection(db, "bookings");
      await addDoc(bookingRef, {
        procedureName: selectedProcedure,
        master: selectedMaster,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientPhone,
        timestamp: new Date(),
      });
      alert("Запис успішний!");
      setCurrentStep(1);
      setSelectedCategory(null);
      setSelectedProcedure(null);
      setSelectedMaster("");
      setSelectedDate("");
      setSelectedTime("");
      setClientName("");
      setClientPhone("");
      navigate("/home");
    } catch (error) {
      alert("Помилка. Спробуйте ще раз.");
    }
  };
  const getProceduresForCategory = (category, base) => {
    const procedures = {};

    if (base[category]) {
      Object.entries(base[category]).forEach(
        ([procedureKey, procedureData]) => {
          procedures[procedureKey] = {
            description: procedureData.description,
            price: procedureData.price,
            duration: procedureData.duration,
          };
        }
      );
    }

    return procedures;
  };

  return (
    <div className="cont">
      {currentStep === 1 && (
        <Step1
          className="page"
          procedures={base}
          onSelect={handleCategorySelect}
        />
      )}
      {currentStep === 2 && selectedCategory && (
        <Step2
          className="page"
          procedures={getProceduresForCategory(selectedCategory, base)}
          onSelect={handleProcedureSelect}
        />
      )}
      {currentStep === 3 && selectedProcedure && (
        <Step3
          className="page"
          base={base}
          selectedCategory={selectedCategory}
          selectedProcedure={selectedProcedure}
          onSelect={handleMasterSelect}
        />
      )}
      {currentStep === 4 && selectedMaster && (
        <Step4
          className="page"
          slots={slots}
          setSlots={setSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={setSelectedDate}
          onSelectTime={setSelectedTime}
          bookedSlots={bookedSlots}
          setBookedSlots={setBookedSlots}
          onNext={handleNextStep}
          onBack={handlePreviousStep}
        />
      )}
      {currentStep === 5 && selectedDate && selectedTime && (
        <Step5
          className="page"
          clientName={clientName}
          clientPhone={clientPhone}
          setClientName={setClientName}
          setClientPhone={setClientPhone}
          onNext={handleNextStep}
          onBack={handlePreviousStep}
        />
      )}
      {currentStep === 6 && (
        <Confirmation
          className="page"
          selectedCategory={selectedCategory}
          selectedProcedure={selectedProcedure}
          selectedMaster={selectedMaster}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          clientName={clientName}
          clientPhone={clientPhone}
          onBack={handlePreviousStep}
          onSubmit={handleSubmit}
        />
      )}

      <div className="btn_div">
        {currentStep > 1 && (
          <button className="btnBack" onClick={handlePreviousStep}>
            Назад
          </button>
        )}
      </div>
    </div>
  );
};

const Step1 = ({ procedures, onSelect }) => {
  if (!procedures || Object.keys(procedures).length === 0) {
    return <p>Завантаження...</p>;
  }
  const sortedCategories = Object.keys(procedures).sort((a, b) =>
    a.localeCompare(b, "uk-UA")
  );
  return (
    <div className="page">
      <h2>Оберіть категорію</h2>
      <ul className="card_list">
        {sortedCategories.map((categoryKey) => (
          <li
            className="card_item"
            key={categoryKey}
            onClick={() => onSelect(categoryKey)}
          >
            {categoryKey}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Step2 = ({ procedures, onSelect }) => {
  const [openCards, setOpenCards] = useState({});

  const toggleDescription = (event, procedureKey) => {
    event.stopPropagation();
    setOpenCards((prevState) => ({
      ...prevState,
      [procedureKey]: !prevState[procedureKey],
    }));
  };

  if (!procedures || Object.keys(procedures).length === 0) {
    return <p>Немає доступних процедур для обраної категорії.</p>;
  }
  const sortedProcedures = Object.keys(procedures).sort((a, b) =>
    a.localeCompare(b, "uk-UA")
  );
  return (
    <div className="page">
      <h2>Оберіть процедуру</h2>
      <ul className="card_list">
        {sortedProcedures.map((procedureKey) => {
          const procedure = procedures[procedureKey];
          const isOpen = openCards[procedureKey];

          return (
            <li
              className="card_item"
              key={procedureKey}
              onClick={() => onSelect(procedureKey)}
            >
              <strong>{procedureKey}</strong>
              {isOpen && (
                <p className="card_description">
                  {procedure.description} ({procedure.duration},{" "}
                  {procedure.price} грн)
                </p>
              )}
              <button
                className="toggle-btn"
                onClick={(e) => toggleDescription(e, procedureKey)}
              >
                {isOpen ? "Скрыть" : "Детальніше"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Step3 = ({ base, selectedCategory, selectedProcedure, onSelect }) => {
  const procedure = base[selectedCategory]?.[selectedProcedure];

  if (!procedure || !procedure.masters) {
    return <p>Немає доступних майстрів для обраної процедури.</p>;
  }
  const availableMasters = [...procedure.masters].sort((a, b) =>
    a.localeCompare(b, "uk-UA")
  );
  return (
    <div className="page">
      <h2>Оберіть майстра</h2>
      <ul className="card_list">
        {availableMasters.map((masterName) => (
          <li
            className="card_item"
            key={masterName}
            onClick={() => {
              onSelect(masterName);
            }}
          >
            {masterName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Step4 = ({
  slots,
  setSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  bookedSlots,
  setBookedSlots,
  onNext,
}) => {
  const generateTimeSlots = () => {
    const timeSlots = [];
    const start = new Date().setHours(10, 0, 0, 0);
    const end = new Date().setHours(20, 0, 0, 0);

    for (let current = start; current < end; current += 30 * 60 * 1000) {
      const time = new Date(current).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      timeSlots.push(time);
    }
    return timeSlots;
  };
  useEffect(() => {
    setSlots(generateTimeSlots());
  }, [setSlots]);

  const handleDateChange = async (date) => {
    try {
      if (date instanceof Date && !isNaN(date)) {
        onSelectDate(date);
        const formattedDate = new Intl.DateTimeFormat("uk-UA", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(date);

        const querySnapshot = await getDocs(collection(db, "bookedSlots"));
        const bookedTimes = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((doc) => doc.date === formattedDate)
          .map((doc) => doc.time);

        setBookedSlots(bookedTimes || []);
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      setBookedSlots([]);
    }
  };

  return (
    <div className="page">
      <h2>Дата та час</h2>
      <AirDatepickerReact
        minDate={new Date()}
        locale={localeUk}
        value={selectedDate}
        onDateChange={handleDateChange}
        autoClose
        isMobile
        placeholder="обрати дату"
        required
      />
      <div className="time-slot-container">
        {slots.map((time) => {
          const isBooked = (bookedSlots || []).includes(time);
          const isSelected = selectedTime === time;
          const className = `time-slot ${isBooked ? "booked" : ""} ${
            isSelected ? "selected" : ""
          }`;
          return (
            <button
              key={time}
              className={className}
              onClick={() => onSelectTime(time)}
              disabled={isBooked}
            >
              {time}
            </button>
          );
        })}
      </div>
      <button
        className="btnNext"
        onClick={onNext}
        disabled={!selectedDate || !selectedTime}
      >
        Продовжити
      </button>
    </div>
  );
};

const Step5 = ({
  clientName,
  clientPhone,
  setClientName,
  setClientPhone,
  onNext,
}) => {
  const isPhoneValid = (phone) => {
    return /^\+?380\d{9}$/.test(phone) || /^0\d{9}$/.test(phone);
  };
  const handleNameChange = (e) => {
    const input = e.target.value;
    const capitalizedName = input.charAt(0).toUpperCase() + input.slice(1);
    setClientName(capitalizedName);
  };
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/[^+\d]/g, "");
    setClientPhone(input);
  };
  return (
    <div className="page">
      <h2>Ваші дані</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Ваше ім'я"
        value={clientName}
        onChange={handleNameChange}
      />
      <input
        className="input-field"
        type="tel"
        placeholder="Ваш номер телефону"
        value={clientPhone}
        onChange={handlePhoneChange}
      />
      <button
        className="btnNext"
        onClick={onNext}
        disabled={!clientName || !isPhoneValid(clientPhone)}
      >
        Продовжити
      </button>
    </div>
  );
};

const Confirmation = ({
  selectedProcedure,
  selectedMaster,
  selectedDate,
  selectedTime,
  clientName,
  clientPhone,
  onSubmit,
}) => {
  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(selectedDate)
    : "";

  return (
    <div className="page last_check">
      <h2>Підтвердження запису</h2>
      <p className="finalCheck">Процедура: {selectedProcedure}</p>
      <p className="finalCheck">Майстер: {selectedMaster}</p>
      <p className="finalCheck">Дата: {formattedDate}</p>
      <p className="finalCheck">Час: {selectedTime}</p>
      <p className="finalCheck">Ваше ім'я: {clientName}</p>
      <p className="finalCheck">Ваш номер телефону: {clientPhone}</p>
      <button className="btnNext" onClick={onSubmit}>
        Підтвердити
      </button>
    </div>
  );
};

export default BookingForm;
