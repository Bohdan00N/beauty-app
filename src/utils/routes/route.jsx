import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage.jsx";
import BookingForm from "../../components/bookingForm/bookingForm";
import ContactPage from "../../pages/ContactPage/ContactPage";
import AdminPanel from "../../admin/adminPanel.jsx";
import { History } from "../../admin/adminComponents/history.jsx";
import { Schedule } from "../../admin/adminComponents/schedule.jsx";
import { Upcoming } from "../../admin/adminComponents/upcoming.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import { useAuth } from "../../admin/auth/authContext.jsx";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Отримуємо стан авторизації з контексту

  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/contacts" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/home" />} />

      {/* Захищені маршрути */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route
        path="/admin/upcoming"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Upcoming />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/history"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/schedule"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Schedule />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
