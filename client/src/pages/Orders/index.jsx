import clsx from "clsx";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/header";
import axiosConfig from "../../store/axiosConfig";
import "./style.css";
import OrderModal from "./OrderModal";
import OrderContainer from "../../components/orderContainer";
import Footer from "../../components/footer";

function MyOrders() {
  const [option, setOption] = useState("pendding");
  const [orders, setOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(undefined);
  useEffect(() => {
    const getOrders = async () => {
      const data = await axiosConfig.request({ method: "GET", url: `/getAllOrders?option=${option}` });
      // data.data
      const temp = Object.keys(data.data).map((key) => data.data[key]);
      setOrders(temp);
      console.log(temp);
    };
    getOrders();
  }, [option]);
  return (
    <div className="background-color-page pb-3">
      <Header />
      <div className="container mt-5 content-bg p-2">
        <div className="d-flex justify-content-around">
          <div className={clsx("btn", {"active-option": option === "pendding" })} onClick={(e) => setOption("pendding")}>
            Chờ xác nhận
          </div>
          <div className={clsx("btn", {"active-option": option === "delevery" })} onClick={(e) => setOption("delevery")}>
            Đang giao hàng
          </div>
          <div className={clsx("btn", {"active-option": option === "success" })} onClick={(e) => setOption("success")}>
            Đã giao hàng
          </div>
          <div className={clsx("btn", {"active-option": option === "destroyed" })} onClick={(e) => setOption("destroyed")}>
            Đã hủy
          </div>
        </div>
      </div>
      <div className="container mt-5 content-bg">
        <div>
          <OrderContainer orders={orders} option={option} setOrderOption={setDeleteOrder} />
        </div>
        <OrderModal Order={deleteOrder} option={option} />
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;
