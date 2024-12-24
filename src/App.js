import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./utils/routes/route";
import Header from "./components/header/header";

const AppContent = () => {
  const location = useLocation();

  const hideHeader = location.pathname.startsWith("/admin");

  return (
    <div className="container">
      {!hideHeader && <Header />}
      <AppRoutes />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;