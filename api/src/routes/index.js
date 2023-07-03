import express from "express";
import * as authController from "../controllers/authCtrl.js";
import connect from "../config/connect.js";
import adminRoute from "./admin.js";
import userRoute from "./userRoute.js";
import passport from "../middleware/passportJWT.js";
import * as userCtrl from "../controllers/userCtrl.js";
import { checkAdmin } from "../middleware/JWTAuth.js";
const router = express.Router();

// router.post("/getAllBook", upload.single("file"), (req, res) => {});

router.get("/getAllBooks", async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books`);
    const results = data[0].map((result) => {
      const datetext = new Date(result.date);
      const [day, month, year] = [
        datetext.getDate() > 9 ? datetext.getDate() : `0${datetext.getDate()}`,
        datetext.getMonth() + 1 > 9 ? datetext.getMonth() + 1 : `0${datetext.getMonth()}`,
        datetext.getFullYear(),
      ];
      result.date = `${year}-${month}-${day}`;
      return result;
    });
    // console.log(results);
    res.json(results);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/failureLogin", (req, res) => {
  console.log("hello");
});
router.get("/editBook/:id", userCtrl.getBook);
router.get("/getAllReview/:id", userCtrl.getAllReview);
router.get("/getBook/:id", userCtrl.getBook);
router.use(passport.authenticate("jwt", { session: false }), userRoute);
router.use(passport.authenticate("jwt", { session: false }), checkAdmin, adminRoute);

export default router;
