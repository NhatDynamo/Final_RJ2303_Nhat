import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/managerSidebar";
import axiosConfig from "../../store/axiosConfig";
import OrderContainer from "../../components/orderContainer";
import OrderModal from "./OrderModal";
function ManageOrder() {
  const [option, setOption] = useState("pendding");
  const [orders, setOrders] = useState([]);
  const [confirmOrder, setConfirmOrder] = useState(undefined);
  useEffect(() => {
    const getOrders = async () => {
      const data = await axiosConfig.request({ method: "GET", url: `/AllOrders` });
      // data.data
      const temp = Object.keys(data.data).map((key) => data.data[key]);
      setOrders(temp);
      console.log(temp);
    };
    getOrders();
  }, [option]);
  return (
    <div>
      <Header />
      <div className="row">
        <div className="col-xl-2 mt-4">
          <Sidebar option={"manageOrder"} />
        </div>
        <div className="col-xl-8 d-flex my-5">
          <div className="container">
            <div>
              <OrderContainer orders={orders} option={option} setOrderOption={setConfirmOrder} />
            </div>
            <OrderModal confirmOrder={confirmOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageOrder;
