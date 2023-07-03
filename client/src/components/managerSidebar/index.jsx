import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "./style.css";

function ManagerSidebar({ option }) {
  return (
    <div>
      <div className="list-group list-group-flush mx-3">
        <Link
          to={"/bookmanager"}
          className={clsx(
            "list-group-item",
            "list-group-item-action",
            "py-2",
            "ripple",
            { active: option === "manager" }
          )}
          aria-current="true"
        >
          <i className="fas fa-tachometer-alt fa-fw me-3"></i>
          <span>Trang quản lý</span>
        </Link>
        <Link
          to={"/createBook"}
          className={clsx(
            "list-group-item",
            "list-group-item-action",
            "py-2",
            "ripple",
            { active: option === "createBook" } 
          )}
        >
          <i className="fas fa-chart-area fa-fw me-3"></i>
          <span>Thêm sách</span>
        </Link>
        <Link
          to={"/manageOrders"}
          className={clsx(
            "list-group-item",
            "list-group-item-action",
            "py-2",
            "ripple",
            { active: option === "manageOrder" }
          )}
        >
          <i className="fas fa-lock fa-fw me-3"></i>
          <span>Quản lý đơn hàng</span>
        </Link>
      </div>
    </div>
  );
}

export default ManagerSidebar;