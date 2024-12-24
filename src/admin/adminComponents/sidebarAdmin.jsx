import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../adminPanel.css";
export const SidebarAdmin = () => {
  const location = useLocation();

  const handleRefresh = (path) => {
    if (location.pathname === path) {
      window.location.href = path;
    }
  };

  return (
    <div className="adminOpened">
      <ul className="adminUl">
        <li className="adminLi">
          <Link
            to="/admin/upcoming"
            onClick={() => handleRefresh("/admin/upcoming")}
          >
            Актуальні записи
          </Link>
        </li>
        <li className="adminLi">
          <Link
            to="/admin/schedule"
            onClick={() => handleRefresh("/admin/schedule")}
          >
            Графік майстрів
          </Link>
        </li>
        <li className="adminLi">
          <Link
            to="/admin/history"
            onClick={() => handleRefresh("/admin/history")}
          >
            Історія записів
          </Link>
        </li>
      </ul>
    </div>
  );
};
