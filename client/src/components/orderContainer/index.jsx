import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Context from "../../store/Context";
import { useContext } from "react";
function OrderContainer({ orders, option, setOrderOption }) {
  const [, , admin] = useContext(Context);
  // const [totalPrice, setTotalPrice] = useState(orders[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

  return (
    <div className="py-3">
      {" "}
      {orders.map((order, index) => (
        <div style={{ marginBottom: "100px" }} key={index}>
          <h5 className="d-flex ml-3">Đơn hàng: #{order[0].idOrder}</h5>
          <table className="table">
            <tbody>
              {order.map((orderItem) => (
                <tr className="my-1 d-flex" key={orderItem.id}>
                  <td className="border-0">
                    <img className="image-size-mini d-flex" src={orderItem.image} alt="" />
                  </td>
                  <td className="border-0" colSpan={2} style={{ width: "500px" }}>
                    <div className="d-flex flex-column mx-3">
                      <Link className="mt-2" to={`/book/${orderItem.idBook}`}>
                        {orderItem.title}
                      </Link>
                      <div className="d-flex my-2">
                        <AiOutlineUser className="mt-1" />
                        {orderItem.author}
                      </div>
                      <div className="align-items-end d-flex mt-3">x{orderItem.quantity}</div>
                    </div>
                  </td>
                  <td className="border-0">
                    <div>{orderItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                  </td>
                </tr>
              ))}
              {option === "pendding" && (
                <td className="ml-4 border-0">
                  <button type="button" className="btn btn-outline-danger" onClick={(e) => setOrderOption(order[0].idOrder)} data-toggle="modal" data-target="#DestroyOrder">
                    <BsTrash />
                  </button>
                </td>
              )}
              {admin === 1 && (
                <td className="ml-4">
                  <button type="button" className="btn btn-outline-primary" onClick={(e) => setOrderOption(order[0].idOrder)} data-toggle="modal" data-target="#confirmOrder">
                    Xác nhận đơn hàng
                  </button>
                </td>
              )}
              {option === "delevery" && (
                <td className="ml-4">
                  <button type="button" className="btn btn-outline-success" onClick={(e) => setOrderOption(order[0].idOrder)} data-toggle="modal" data-target="#DestroyOrder">
                    Đã nhận được hàng
                  </button>
                </td>
              )}
            </tbody>
          </table>
          <hr />
          <div className="d-flex justify-content-between">
            <h4 className="text-info">Tổng Số Tiền</h4>
            <div>{order[0].totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderContainer;
