import React, { useEffect, useState } from "react";
import "./index.css";
import db from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import edit from "../../images/edit.svg";
import delet from "../../images/delet.svg";
import close from "../../images/close.svg";
import { SidebarAdmin } from "./sidebarAdmin";
import tab from "../../images/tab.svg";
import AirDatepickerReact from "../../utils/datepicker-react";
import localeUk from "air-datepicker/locale/uk";
export const Upcoming = () => {
  const [base, setBase] = useState([]);
  const [editData, setEditData] = useState(null);
  const [stateModal, setStateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (querySnapshot) => {
        const now = Date.now();
        const bookingsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const bookingDateTime = data.date.seconds * 1000;
          if (bookingDateTime >= now) {
            bookingsData.push({ id: doc.id, ...data });
          }
        });
        setBase(bookingsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time updates:", error);
        setLoading(false); 
      }
    );

    return () => unsubscribe();
  }, []);

  const convertFirestoreTimestampToDate = (timestamp) => {
    return new Date(timestamp.seconds * 1000);
  };

  const formatDate = (timestamp) => {
    const date = convertFirestoreTimestampToDate(timestamp);
    return new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const docRef = doc(db, "bookings", id);
      await updateDoc(docRef, updatedData);
      alert("Дані успішно оновлені!");
    } catch (error) {
      console.error("Помилка при оновленні документа:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "bookings", id);
      await deleteDoc(docRef);
      alert("Дані успішно видалені!");
    } catch (error) {
      console.error("Помилка при видаленні документа:", error);
    }
  };

  const saveChanges = async () => {
    if (editData) {
      await handleUpdate(editData.id, editData);
      setEditData(null);
    }
  };
  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const timestamp = {
        seconds: Math.floor(selectedDate.getTime() / 1000),
        nanoseconds: 0,
      };
      setEditData({ ...editData, date: timestamp });
    }
  };

  return (
    <div className="categCont">
      <button
        className="btnmodalswitch"
        onClick={() => setStateModal(!stateModal)}
      >
        <img className="tab" src={tab} alt="Tab" />
      </button>
      <div
        className={`sidebar ${
          stateModal === true ? "sidebar-opened" : "sidebar-closed"
        }`}
      >
        {" "}
        <SidebarAdmin />
      </div>

      <h2>Графік записів</h2>
      {editData && (
        <>
          <div className="overlay" onClick={() => setEditData(null)}></div>
          <div className="modal">
            <h3>Редагування</h3>
            <label>
              <span>Процедура:</span>
              <input
                className="inputAdminEdit"
                type="text"
                value={editData.procedureName}
                onChange={(e) =>
                  setEditData({ ...editData, procedureName: e.target.value })
                }
              />
            </label>
            <label>
              <span>Дата:</span>
              <AirDatepickerReact
                minDate={new Date()}
                locale={localeUk}
                onDateChange={handleDateChange}
                autoClose
                isMobile
                disableNavWhenOutOfRange
                placeholder={formatDate(editData.date)}
                required
                className="datepicker"
                value={new Date(editData.date.seconds * 1000)}
              />
            </label>
            <label>
              <span>Час:</span>
              <input
                className="inputAdminEdit"
                type="text"
                value={editData.time}
                onChange={(e) =>
                  setEditData({ ...editData, time: e.target.value })
                }
              />
            </label>
            <label>
              <span>Майстер:</span>
              <input
                className="inputAdminEdit"
                type="text"
                value={editData.master}
                onChange={(e) =>
                  setEditData({ ...editData, master: e.target.value })
                }
              />
            </label>
            <button className="btnmodal" onClick={saveChanges}>
              Зберегти
            </button>
            <button
              className="btnmodalCancel"
              onClick={() => setEditData(null)}
            >
              <img src={close} alt="Close" />
            </button>
          </div>
        </>
      )}
{loading ? (
        <div className="loader">Завантаження...</div> // Ваш индикатор загрузки
      ) : (
        <table
          className="table"
          border="1"
          style={{ borderCollapse: "collapse", width: "fit-content" }}
        >
          <thead>
            <tr>
              <th className="itemTable">Процедура</th>
              <th className="itemTable">Дата</th>
              <th className="itemTable">Час</th>
              <th className="itemTable">Майстер</th>
              <th className="itemTable">Дії</th>
            </tr>
          </thead>
          <tbody>
            {base.length > 0 ? (
              base.map((row) => (
                <tr key={row.id}>
                  <td className="itemTable">{row.procedureName}</td>
                  <td className="itemTable">{formatDate(row.date)}</td>
                  <td className="itemTable">{row.time}</td>
                  <td className="itemTable">{row.master}</td>
                  <td className="itemTableSvg">
                    <button
                      className="iconAdmin"
                      onClick={() => setEditData(row)}
                    >
                      <img src={edit} alt="Edit" />
                    </button>
                    <button
                      className="iconAdmin"
                      onClick={() => handleDelete(row.id)}
                    >
                      <img src={delet} alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="itemTable">
                  Немає майбутніх записів
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};