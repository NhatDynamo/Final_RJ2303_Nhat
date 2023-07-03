import express from "express";
import * as userCtrl from "../controllers/userCtrl.js";

const router = express.Router();
router.post("/addToCart", userCtrl.addToCart);
router.delete("/deleteCartItem", userCtrl.deleteCartItem);
router.get("/getCountItem", userCtrl.getCountItem);
router.get("/getAllCartItems", userCtrl.getAllCartItems);
router.get("/getInformations", userCtrl.getInformations);
router.post("/createBookReview", userCtrl.createBookReview);
router.put("/updateQuantity", userCtrl.updateQuantity);
router.post("/createOrder", userCtrl.createOrder);
router.delete("/deleteOrder", userCtrl.deleteOrder);
router.get("/getAllOrders", userCtrl.AllMyOrder);
router.put("/DestroyOrder", userCtrl.DestroyOrder);
router.put("/ConfirmOrder", userCtrl.ConfirmOrder);

export default router;
