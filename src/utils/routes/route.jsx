import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import BookingForm from "../../components/bookingForm/bookingForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/booking" element={<BookingForm />} />
    </Routes>
  );
};

export default AppRoutes;
