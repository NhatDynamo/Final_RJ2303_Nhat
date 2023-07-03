import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// generate access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

// generate RefreshToken
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
};
const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.json("Bạn chưa phải ADMIN");
  }
};


export { generateRefreshToken, generateAccessToken, checkAdmin };
