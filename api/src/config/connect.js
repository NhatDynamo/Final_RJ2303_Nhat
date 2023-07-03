import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const connect = mysql.createConnection({
  host: process.env.HOSTDB,
  port: process.env.PORTDB,
  user: process.env.USERDB,
  password: process.env.PASSWDDB,
  database: process.env.DATABASE,
});
connect.connect((error) => {
  if (error) {
    console.log("Error connect to database: " + error);
  } else {
    console.log("Connected to database");
  }
});
export default connect;
