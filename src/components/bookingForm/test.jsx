import React from "react";
import "./bookingForm.css";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebaseConfig";
import { database } from "../../utils/database";

export const Test = () => {
  const set = async () => {
    try {
      await setDoc(doc(db, "staff", "personnel"), database);
      console.log("Дані успішно записані в Firestore.");
    } catch (error) {
      console.error("Помилка запису в Firestore:", error);
    }
  };
  return (
    <div>
      <button onClick={set}>A</button>
    </div>
  );
};
