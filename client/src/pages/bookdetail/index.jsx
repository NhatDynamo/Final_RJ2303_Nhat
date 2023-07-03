import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AiFillStar, AiOutlineLike } from "react-icons/ai";
import { BsShieldCheck } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import axiosConfig from "../../store/axiosConfig";
import Context from "../../store/Context";
import { ToastContainer, toast } from "react-toastify";
function BookDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(undefined);
  const [logged, setLogged] = useContext(Context);
  useEffect(() => {
    const getBook = async () => {
      try {
        const data = await axios.get(`/getBook/${id}`);
        // console.log(data);
        setBook(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, []);
  const setQuantityAction = (e) => {
    if (!e.target.value) {
      setQuantity(1);
    } else
      try {
        // console.log(e.target.value);
        setQuantity(parseInt(e.target.value));
      } catch (error) {
        setQuantity(1);
      }
  };
  const minusAction = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // console.log("rerender");
  const addProduct = async () => {
    const result = await axiosConfig.request({
      method: "POST",
      url: "/addToCart",
      data: {
        bookitem: {
          id: book.id,
          quantity: quantity,
        },
      },
    });

    if (result.data === "insert success") {
      const numberCartItem = document.getElementById("numberCartItem");
      // console.log();
      numberCartItem.innerHTML = parseInt(numberCartItem.textContent) + 1;
    }
    toast.success("Thêm sản phẩm thành công", { position: "bottom-right", theme: "dark" });
  };
  return (
    <>
      {book && (
        <>
          <Header />
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Trang chủ</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {book.title}
                </li>
              </ol>
            </nav>
            <div className="row" style={{ marginTop: "50px" }}>
              <img className="col-xl-3" src={book.image} />

              <div className="col-xl-6">
                <h4 className="d-flex">{book.title}</h4>
                <div>
                  <p className="d-flex">Đã bán: 5</p>
                  <p className="d-flex">
                    Đánh giá: 5 <AiFillStar style={{ color: "orange" }} />
                  </p>
                </div>
                <h3 className="d-flex" style={{ fontWeight: "normal" }}>
                  {book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </h3>
                <p className="d-flex">Số lượng</p>
                <div className="group-input d-flex">
                  <button
                    className="btn btn-outline-primary mb-4"
                    id="btn-minus"
                    onClick={(e) => {
                      minusAction();
                    }}
                  >
                    -
                  </button>
                  <div className="form-outline mb-4 " style={{ width: "70px" }}>
                    <input type="text" className="form-control form-control-lg quantity" name="quantity" onChange={(e) => setQuantityAction(e)} value={quantity} required />
                  </div>
                  <button
                    className="btn btn-outline-primary mb-4 btn-plus"
                    onClick={(e) => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-outline-danger px-5 py-3 float-left mt-4" onClick={(e) => addProduct(e)}>
                  Chọn mua
                </button>
              </div>
              <div className="col-xl-3">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="col" className="col-3 ">
                        <BsShieldCheck />
                        <div className="benefit-item text-12">
                          <span>
                            Hoàn tiền
                            <br />
                            <b>111%</b>
                            <br />
                            nếu hàng giả
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="col-3 ">
                        <AiOutlineLike />
                        <div className="benefit-item text-12">
                          <span>
                            Mở hộp
                            <br />
                            kiểm tra
                            <br />
                            nhận hàng
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="col-3 ">
                        <GiReturnArrow />
                        <div className="benefit-item text-12">
                          <span>
                            Đổi trả trong <br />
                            <b>30 ngày</b> <br /> nếu sp lỗi
                          </span>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ToastContainer />
          <div className="container mt-5">
            <div className="w-50 ">
              <h4 className="d-flex">
                Thông tin chi tiết
              </h4>
              <table className="table row secondary-color">
                <div className="col-xl-4">
                  <div className="m-3 d-flex">Tác giả:</div>
                  <div className="m-3 d-flex">Thể loại:</div>
                  <div className="m-3 d-flex">Số trang:</div>
                  <div className="m-3 d-flex">Loại bìa:</div>
                  <div className="m-3 d-flex">Ngày xuất bản:</div>
                </div>
                <div className="col-xl-6">
                  <div className="m-3 d-flex">{book.author}</div>
                  <div className="m-3 d-flex">{book.category}</div>
                  <div className="m-3 d-flex">{book.numberPage}</div>
                  <div className="m-3 d-flex">Bìa mềm</div>
                  <div className="m-3 d-flex">{book.date}</div>
                </div>
              </table>
            </div>
          </div>
          <div className="container my-4 p-0">
            <h4 className="d-flex ml-2">Mô Tả Sản Phẩm</h4>
            <div className="light-color w-50">
              <div className="p-5">
                <div className="d-flex"> {book.description}</div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default BookDetail;
