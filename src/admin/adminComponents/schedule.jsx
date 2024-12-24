import React, { useEffect, useState } from "react";
import "./index.css";
import { SidebarAdmin } from "./sidebarAdmin";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../../firebaseConfig";

import edit from "../../images/edit.svg";
import delet from "../../images/delet.svg";
import tab from "../../images/tab.svg";


export const Schedule = () => {
  const [stateModal, setStateModal] = useState(false);
 const [base, setBase] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (querySnapshot) => {
        const bookingsData = [];
        querySnapshot.forEach((doc) => {
          bookingsData.push({ id: doc.id, ...doc.data() });
        });
        setBase(bookingsData);
      },
      (error) => {
        console.error("Error fetching real-time updates:", error);
      }
    );

    return () => unsubscribe();
  }, []);

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

  return (
    <div className="categCont">
      <button
        className="btnmodalswitch"
        onClick={() => setStateModal(!stateModal)}
      ><img className="tab" src={tab} alt="Tab" /></button>
      <div
        className={`sidebar ${
          stateModal === true ? "sidebar-opened" : "sidebar-closed"
        }`}
      >
        {" "}
        <SidebarAdmin />
      </div>
      <h2>Графік майстрів</h2>
      <table
        className="table"
        border="1"
        style={{ borderCollapse: "collapse", width: "fit-content" }}
      >
        <thead>
          <tr>
            <th className="itemTable">Процедура</th>
            <th className="itemTable">Час</th>
            <th className="itemTable">Майстер</th>
            <th className="itemTable">Дії</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(base) && base.length > 0 ? (
            base.map((row, index) => (
              <tr key={row.id || index}>
                <td className="itemTable">{row.procedureName}</td>
                <td className="itemTable">{row.time}</td>
                <td className="itemTable">{row.master}</td>
                <td className="itemTableSvg">
                  <button
                    className="iconAdmin"
                    onClick={() => setEditData(row)}
                  >
                    {" "}
                    <img src={edit} alt="Edit" />
                  </button>
                  <button
                    className="iconAdmin"
                    onClick={() => handleDelete(row.id)}
                  >
                    {" "}
                    <img src={delet} alt="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="itemTable">
                Немає записів
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
