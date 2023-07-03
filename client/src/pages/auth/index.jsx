import axios from "axios";
import { useState, useContext } from "react";
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";
import { AppName } from "../../store/variable";
import Context from "../../store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Auth = () => {
  const [user, setUser] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [logged, setLogged] = useContext(Context);
  const [passwdConfirm, setPasswdConfirm] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [registerOption, setRegisterOption] = useState(false);
  const registerAction = (e) => {
    e.preventDefault();
    if (passwdConfirm !== password) {
      toast.error("Mật khẩu nhập lại không khớp", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
    } else {
      const action = async () => {
        try {
          const result = await axios.post("/register", { uname: user, passwd: password, email });
          if (result.data === "success") {
            toast.success("Đăng Ký thành công", {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark",
            });
          } else {
            toast.error("Người dùng đã tồn tại", {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark",
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      action();
    }
  };
  const changeOption = (e) => {
    setRegisterOption(!registerOption);
  };
  const LoginAction = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/login", { email: email, passwd: password });
      console.log(result);
      if (result.data) {
        localStorage.setItem(AppName, JSON.stringify(result.data));
        setLogged(true);
        window.location.reload();
        window.location.replace("/bookmanager");
      } else {
        toast.error("Thông tin tài khoản mật khẩu không chính xác", { theme: "dark", position: "bottom-right" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="LoginModal"
      tabIndex={"-1"}
      role="dialog"
      aria-labelledby="LoginModalTitle"
      aria-hidden="true"
      // style={Ơ}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "800px" }} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex">
            <div className="mx-3 w-50">
              <div>
                <h2>Xin Chào</h2>
                <p>Đăng nhập hoặc tạo tài khoản</p>
              </div>
              <form onSubmit={registerOption ? registerAction : LoginAction} id="auth-form">
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    form="auth-form"
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={(e) => setPassword(e.target.value)} name="password" required />
                </div>
              </form>
              {!registerOption ? (
                <>
                  {/* login form */}
                  <button type="submit" form="auth-form" className="btn btn-danger my-2">
                    Đăng Nhập
                  </button>
                  <div className="my-2">
                    Bạn chưa có tài khoản?
                    <button className="btn btn-primary ml-2 my-2" onClick={(e) => changeOption(e)}>
                      Đăng Ký
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* register form */}
                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" placeholder="User" onChange={(e) => setUser(e.target.value)} name="user" required />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="PasswordConfirm"
                      onChange={(e) => setPasswdConfirm(e.target.value)}
                      name="passwordConfirm"
                      form="auth-form"
                      required
                    />
                  </div>

                  <button type="submit" form="auth-form" className="btn btn-danger my-2">
                    Đăng Ký
                  </button>
                  <div className="my-2">
                    Bạn đã có tài khoản?
                    <button className="btn btn-primary ml-2 my-2" onClick={(e) => changeOption(e)}>
                      Đăng Nhập
                    </button>
                  </div>
                </>
              )}

              <div className="btn btn-outline-primary mx-2">
                <AiOutlineFacebook />
              </div>
              <div className="btn btn-outline-danger mx-2">
                <AiOutlineGoogle />
              </div>
            </div>
            <div style={{ backgroundColor: "rgb(219, 238, 255) 85%)" }}>
              <img className="ml-3" src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" style={{ width: "60%", marginTop: "15%" }} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Auth;
