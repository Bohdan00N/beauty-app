import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import BookingForm from "../../components/bookingForm/bookingForm";
import ContactPage from "../../pages/ContactPage/ContactPage";
// import Test from "../../components/bookingForm/test";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/contacts" element={<ContactPage/>}/>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
