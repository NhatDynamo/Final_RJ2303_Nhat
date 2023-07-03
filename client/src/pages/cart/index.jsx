import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useState, useEffect } from "react";
import axiosConfig from "../../store/axiosConfig";
import CartModal from "./Deletemodal";
import CreateOrderModal from "./CreateOrder";
import "./style.css";
import { BsTrash } from "react-icons/bs";
import { useContext } from "react";
import Context from "../../store/Context";
function MyCart() {
  const [items, setItems] = useState(undefined);
  const [information, setInformation] = useState(undefined);
  const [cartItemId, setCartItemId] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState(0);
  const [logged, setLogged] = useContext(Context);

  useEffect(() => {
    if (logged) {
      const getCartItems = async () => {
        const data = await axiosConfig.request({
          method: "GET",
          url: "/getAllCartItems",
        });
        setItems(data.data);
        if (data.data.length > 0) {
          // setTotalPrice(123);
          setTotalPrice(
            data.data
              .reduce((total, v) => total + v.price * v.quantity, 0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          );
        }
      };
      const getInformations = async () => {
        const user = await axiosConfig.request({
          method: "GET",
          url: "/getInformations",
        });
        //   console.log(user.data);
        setInformation(user.data);
      };

      getInformations();
      getCartItems();
    }
  }, []);

  const changeQuantityInput = (e, item) => {
    const temp = items;
    const newItem = item;
    if (parseInt(e.target.value) < 1 || !e.target.value) {
      e.target.value = 1;
    }
    newItem.quantity = e.target.value;
    temp[temp.indexOf(item)] = newItem;
    setItems(temp);
    document.getElementById("totalPrice").innerText =
      items
        .reduce((total, v) => total + v.price * v.quantity, 0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };
  return (
    <>
      {items && (
        <div>
          <Header />
          {/* <Category /> */}
          <div className="background-color-page pb-5">
            <h4 className="d-flex container pt-5">GIỎ HÀNG</h4>
            <div className="container bg-light">
              <div className="row cpl-xl-8">
                <table className="table">
                  <thead>
                    <td className="col-xl-2">Chọn tất cả</td>
                    <td className="col-xl-3">Tiêu đề sách</td>
                    <td className="col-xl-2">Số lượng</td>
                    <td className="col-xl-2">Đơn giá</td>
                    <td className="col-xl-2"></td>
                  </thead>
                </table>
              </div>
              <div className="col-xl-4"></div>
            </div>
            <div className="row container m-auto pt-4">
              <div className="col-xl-8 bg-light mr-3 pb-4">
                <div className="mt-5">
                  <table className="table">
                    <tbody>
                      {items.map((item) => (
                        <tr className="d-flex my-5 " key={item.id}>
                          <td className="center-itemCart border-0">
                            <div>
                              <img className="image-size-mini" src={item.image} alt="" />
                            </div>
                          </td>
                          <td colSpan={2} className="center-itemCart border-0">
                            <h6>{item.title}</h6>
                          </td>
                          <td className="center-itemCart border-0">
                            <div className="group-input d-flex quantity">
                              <div className="form-outline mb-4 cartQuantitySize">
                                <input
                                  type="number"
                                  className="form-control form-control-lg quantity cartQuantitySize"
                                  name="quantity"
                                  min={1}
                                  defaultValue={item.quantity}
                                  onChange={(e) => changeQuantityInput(e, item)}
                                  required
                                />
                              </div>
                            </div>
                          </td>
                          <td className="center-itemCart border-0">
                            <h6 className="ml-3 col-xl-2">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h6>
                          </td>
                          <td className="center-itemCart border-0">
                            <h6 className="ml-3 col-xl-2 ">
                              <div
                                className="btn btn-outline-danger hover-pointer"
                                onClick={() => {
                                  setCartItemId(item.id);
                                }}
                                data-toggle="modal"
                                data-target="#CartItemDelete"
                              >
                                <BsTrash />
                              </div>
                            </h6>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-xl-3 bg-light ml-3">
                <div className="d-flex justify-content-around">
                  <div>Giao tới</div>
                </div>
                <div className="d-flex mt-3">
                  <div>{information.uname}</div>
                </div>
                <div className="d-flex mt-3">
                  <div>{information.numberPhone}</div>
                </div>
                <div className="mt-5">
                  Tổng số tiền:
                  <h5 id="totalPrice">{totalPrice}đ</h5>
                </div>
                <div>
                  <button className="btn btn-outline-primary" data-toggle="modal" data-target="#CreateOrderModal">
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <CartModal CartItemId={cartItemId} />
          <CreateOrderModal items={items} />
          <Footer />
        </div>
      )}
    </>
  );
}

export default MyCart;
