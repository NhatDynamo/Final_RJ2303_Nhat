import express from "express";
import multer from "multer";
import * as AdminCtrl from "../controllers/AdminCtrl.js";
const upload = multer({ dest: "src/public/images" });
const router = express.Router();
// router.post("/createBooks");
router.get("/test", (req, res) => {
  console.log("123");
});
router.get("/AllOrders", AdminCtrl.getAllOrders);
router.post("/uploadFile", upload.single("file"), AdminCtrl.uploadFile);
router.post("/createBook", AdminCtrl.createBook);
router.put("/editBook", AdminCtrl.editBook);
router.delete("/deleteBook", AdminCtrl.deleteBook);
router.put("/confirmOrderAdmin", AdminCtrl.confirmOrderAdmin);
export default router;
