import axios from "axios";
import axiosConfig from "../../store/axiosConfig";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import "./style.css";
import Context from "../../store/Context";
import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { AppName } from "../../store/variable";
import { FaStore } from "react-icons/fa";
import Auth from "../../pages/auth";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [logged, setLogged] = useContext(Context);
  const [user, setUser] = useState(undefined);
  const [numberCartItem, setNumberCartItem] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      // console.log(numberCartItem);
      const data = jwtDecode(JSON.parse(localStorage.getItem(AppName)).accessToken);
      setUser(data);
    }
  }, [logged]);
  useEffect(() => {
    const getCountItem = async () => {
      const count = await axiosConfig.request({ method: "GET", url: "/getCountItem" });
      // console.log(count);
      setNumberCartItem(count.data);
    };
    getCountItem();
  }, []);

  const LogoutAciton = async () => {
    try {
      const res = await axios.post(`/logout`, { token: JSON.parse(localStorage.getItem(AppName)).refreshToken });
      if (res.data) {
        setLogged(false);
        navigate("/");
        localStorage.removeItem(AppName);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a94ff" }}>
      <div className="d-flex justify-content-around pt-4 px-3 container">
        {user && user.isAdmin == 0  && (
          <Link to={"/"} className="mt-2" style={{ color: "white" ,textDecoration: "none" }}>
            <FaStore className = "mr-2" style={{ width: "30px", height: "30px" }} />
            NMN Book Store 
          </Link>
        )}
        <div style={{ width: "50%" }}>
          <div className="form-outline mb-4 d-flex ">
            <input type="text" id="form3Example3" className="form-control form-control-lg" placeholder="Tìm kiếm theo sản phẩm, danh mục,..." />
            <button className="btn btn-primary">
              <AiOutlineSearch style={{ fontSize: "20px" }} />
            </button>
          </div>
        </div>
        {!user ? (
          <>
            <Auth />
            <div style={{ color: "white", fontSize: "15px" }}>
              <AiOutlineUser style={{ fontSize: "30px" }} />
              <div type="button" className="d-inline-block mt-2" data-toggle="modal" data-target="#LoginModal">
                Đăng Nhập/Đăng Ký
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown mt-2">
              <div className="btn-user dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <AiOutlineUser style={{ fontSize: "30px" }} />
                {user.uname}
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className="dropdown-item">Thông tin cá nhân</div>
                {user.isAdmin !== 0 && (
                  <>
                    <Link className="dropdown-item" to={"/bookManager"}>
                      Trang quản lý
                    </Link>
                  </>
                )}
                {user.isAdmin == 0 && (
                  <>
                    <Link className="dropdown-item" to={"/myOrder"}>
                      Đơn hàng của tôi
                    </Link>
                  </>
                )}
                <button className="logout-btn" onClick={LogoutAciton} style={{ color: "red" }}>
                  Đăng xuất
                </button>
              </div>
            </div>
            {logged && user.isAdmin == 0 && (
              <Link to={"/myCart"} className="mt-1 cart d-flex text-decoration-none">
                <AiOutlineShoppingCart style={{ fontSize: "30px" }} />
                <p className="mt-3" id="numberCartItem">
                  {numberCartItem}
                </p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
