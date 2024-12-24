import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage.jsx";
import BookingForm from "../../components/bookingForm/bookingForm";
import ContactPage from "../../pages/ContactPage/ContactPage";
import AdminPanel from "../../admin/adminPanel.jsx";
import { History } from "../../admin/adminComponents/history.jsx";
import { Schedule } from "../../admin/adminComponents/schedule.jsx";
import { Upcoming } from "../../admin/adminComponents/upcoming.jsx";
// import {Test} from '../../components/bookingForm/test'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/contacts" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/home" />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/upcoming" element={<Upcoming />} />
      <Route path="/admin/history" element={<History />} />
      <Route path="/admin/schedule" element={<Schedule />} />
    </Routes>
  );
};

export default AppRoutes;
