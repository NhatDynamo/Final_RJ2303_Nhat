import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import route from "./src/routes/index.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(path.resolve(), "src/public")));

app.use(route);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
