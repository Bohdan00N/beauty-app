import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./utils/routes/route";
import Header from "./components/header/header";
function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
