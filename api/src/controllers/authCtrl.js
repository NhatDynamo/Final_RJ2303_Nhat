import * as JWTAuth from "../middleware/JWTAuth.js";
import sha256 from "crypto-js/sha256.js";
import dotenv from "dotenv";
import connect from "../config/connect.js";
dotenv.config();

const login = async (req, res) => {
  const user = { email: req.body.email, hash: sha256(req.body.passwd, process.env.KEY_ENCRYPT_PASS).toString() };

  // console.log(user);
  try {
    const data = await connect.promise().execute(`Select * from users where email = '${user.email}' and passwd = '${user.hash}'`);
    // console.log(data[0][0]);
    if (data[0].length != 0) {
      const userResult = {
        id: data[0][0].id,
        uname: data[0][0].uname,
        email: data[0][0].email,
        isAdmin: data[0][0].isAdmin,
      };
      res.json({
        accessToken: JWTAuth.generateAccessToken(userResult),
        refreshToken: JWTAuth.generateRefreshToken(userResult),
      });
    } else {
      res.json(false);
    }
  } catch (error) {
    res.json(error);
  }
};

const logout = async (req, res) => {
  const refreshToken = req.body.token;
  res.json(true);
};


const register = async (req, res) => {
  const user = { uname: req.body.uname, hash: sha256(req.body.passwd, process.env.KEY_ENCRYPT_PASS), email: req.body.email };
  const checkUser = await connect.promise().execute(`Select * from users where email = '${user.email}' or uname = '${user.uname}'`);
  if (checkUser[0].length == 0) {
    connect.promise().execute(`insert into users(uname, passwd, email, isAdmin) values('${user.uname}', '${user.hash}', '${user.email}', 0)`);
    res.json("success");
  } else {
    res.json(false);
  }
};
export { login, logout, register };
