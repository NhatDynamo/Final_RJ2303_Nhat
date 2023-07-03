import { useState } from "react";
import { AppName } from "./variable";
import Context from "./Context";
import jwtDecode from "jwt-decode";

function Provider({ children }) {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem(AppName)) ? true : false);
  let admin = false;
  if (logged) {
    admin = jwtDecode(JSON.parse(localStorage.getItem(AppName)).accessToken).isAdmin;
  }

  return <Context.Provider value={[logged, setLogged, admin]}>{children}</Context.Provider>;
}

export default Provider;
