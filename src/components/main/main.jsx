import { useNavigate } from "react-router-dom";
import "./main.css";

const Main = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/booking");
  };

  return (
    <div className="maincont">
      <h1 className="mainh1"><span className="span_main">Beauty house </span>Michelle</h1>
      <button onClick={handleButton} className="mainbtn">
        Онлайн запис
      </button>
    </div>
  );
};

export default Main;
