import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./utils/routes/route";
import Header from "./components/header/header";

const AppContent = () => {
  const location = useLocation();
  const [isCssLoaded, setIsCssLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "App.css";

    link.onload = () => {
      setIsCssLoaded(true);
    };

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const hideHeader = location.pathname.startsWith("/admin");

  if (!isCssLoaded) {
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );
  }

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
