import connect from "../config/connect.js";
import fs from "fs-extra";
import path from "path";

const uploadFile = async (req, res) => {
  res.json(req.file.filename);
};

const createBook = async (req, res) => {
  const data = req.body.book;
  // console.log(data);
  try {
    const result = await connect.promise().execute(`Select * from books where title = "${data.title}"`);

    if (!result[0][0]) {
      connect
        .promise()
        .execute(
          `insert into books values (0, "${data.title}", "${data.author}", "${data.category}",${data.price}, "${data.date}", ${parseInt(data.numberPage)}, "${data.image}", "${
            data.description
          }")`
        );
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  // console.log(req.body.id);
  try {
    const book = await connect.promise().execute(`select * from books where id = ${req.body.id}`);
    const image = book[0][0].image.slice(29, book[0][0].length);
    await connect.promise().execute(`delete from books where id = ${req.body.id}`);
    await fs.remove(`${path.join(path.resolve(), `src/public/images/${image}`)}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};

const editBook = async (req, res) => {
  const data = req.body.book;

  try {
    // console.log(req.body);
    await connect
      .promise()
      .execute(
        `update books set title = "${data.title}", author = "${data.author}",description = "${data.description}",date = "${data.date}",category = "${data.category}", image = "${data.image}",numberPage = ${data.numberPage}, price = ${data.price} where id = ${data.id}`
      );
    // console.log();
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const getAllBooks = async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books`);
    console.log(data[0]);
    res.json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  // console.log(req.query.option);
  try {
    const data = await connect
      .promise()
      .execute(
        `select OL.*, O.createAt, O.status, O.totalPrice,B.title, B.price, B.image, B.author from (OrderLine as OL inner join Orders as O on O.id = OL.idOrder) inner join books as B on OL.idBook = B.id where O.status="pendding"`
      );
    // console.log(data[0]);
    const result = data[0].reduce(function (r, a) {
      r[a.idOrder] = r[a.idOrder] || [];
      r[a.idOrder].push(a);
      return r;
    }, Object.create(null));
    // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const confirmOrderAdmin = async (req, res) => {
  try {
    await connect.promise().execute(`update Orders set status = "delevery" where id = ${req.body.id}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};

export { createBook, deleteBook, editBook, getAllBooks, uploadFile, getAllOrders, confirmOrderAdmin };
