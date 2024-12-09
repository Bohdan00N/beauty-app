import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";

export const fetchPersonnelData = async () => {
  const docRef = doc(db, "staff", "personnel");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : {};
};

export const addBooking = async (bookingDetails) => {
  const bookingsRef = collection(db, "bookings");
  await addDoc(bookingsRef, bookingDetails);
};

export const fetchBookedSlots = async (date) => {
  const formattedDate = new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const querySnapshot = await getDocs(collection(db, "bookedSlots"));
  return querySnapshot.docs
    .map((doc) => doc.data())
    .filter((doc) => doc.date === formattedDate)
    .map((doc) => doc.time);
};
