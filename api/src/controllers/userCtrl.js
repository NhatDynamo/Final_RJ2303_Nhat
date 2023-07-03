import connect from "../config/connect.js";

const getAllBooks = async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books`);
    // console.log(data[0]);
    res.json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

const getBook = async (req, res) => {
  try {
    const data = await connect.promise().query(`SELECT * FROM books where id = ${req.params.id}`);
    const result = data[0][0];
    const datetext = new Date(result.date);
    // chuyển date từ UTC sang yyyy-mm-dd
    const [day, month, year] = [
      datetext.getDate() > 9 ? datetext.getDate() : `0${datetext.getDate()}`,
      datetext.getMonth() + 1 > 9 ? datetext.getMonth() + 1 : `0${datetext.getMonth()}`,
      datetext.getFullYear(),
    ];
    result.date = `${year}-${month}-${day}`;
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const getInformations = async (req, res) => {
  try {
    const result = await connect.promise().execute(`select * from users where id = ${req.user.id}`);
    return res.json(result[0][0]);
  } catch (error) {
    console.log("error");
  }
};
const deleteCartItem = async (req, res) => {
  // console.log(req.body);
  try {
    await connect.promise().execute(`delete from CartItem where id = ${req.body.id}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const deleteMultipleCartItems = async (data, req, res) => {
  let datatemp = "";
  for (let v of data) {
    datatemp += `id = ${v.id} or `;
  }
  datatemp = datatemp.slice(0, datatemp.length - 3);
  try {
    await connect.promise().execute(`delete from CartItem where ${datatemp} `);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (req, res) => {
  //   console.log(req.body.bookitem);
  const data = req.body.bookitem;
  //   console.log(req.user);
  try {
    const checkInCart = await connect.promise().execute(`select * from CartItem where userId = ${req.user.id} and bookId = ${data.id}`);
    if (checkInCart[0][0]) {
      await connect.promise().execute(`update CartItem set quantity = ${checkInCart[0][0].quantity + 1} where id = ${checkInCart[0][0].id}`);
      return res.json("update success");
    } else {
      await connect.promise().execute(`insert into CartItem values (0, ${req.user.id}, ${data.id}, ${data.quantity})`);
      return res.json("insert success");
    }
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const getAllCartItems = async (req, res) => {
  try {
    const data = await connect
      .promise()
      .execute(`select  books.title, books.price, books.image, CartItem.* from books inner join CartItem on books.id = CartItem.bookId where CartItem.UserId = ${req.user.id} `);
    // console.log(data[0]);
    return res.json(data[0]);
  } catch (error) {
    console.log(error);
  }
};
const getCountItem = async (req, res) => {
  try {
    const count = await connect.promise().execute(`select count(bookId) from CartItem where userId = ${req.user.id}`);
    // res.json(count);
    res.json(count[0][0]["count(bookId)"]);
  } catch (error) {
    console.log(error);
  }
};
const getAllReview = async (req, res) => {
  try {
    const data = await connect
      .promise()
      .execute(`select br.*, u.uname, u.avatar from users as u inner join bookReview as br on  u.id = br.idUser where br.idBook=${req.params.id}`);
  
      res.json(data[0]);
  } catch (error) {
    console.log(error);
  }
};
const createBookReview = async (req, res) => {
  const data = req.body;
  try {
    await connect.promise().execute(`insert into bookReview values (0, ${data.idBook}, ${req.user.id}, ${data.numberStar}, "${data.content}", 0)`);
    return res.json(true);
  } catch (error) {
    console.log(error);
  }
  // console.log(req.body);
};

const updateQuantity = async (req, res) => {
  try {
    console.log(req.body);
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
};
const createOrder = async (req, res) => {
  const data = req.body.items;
  let temp = "";
  const totalPrice = data.reduce((total, value) => {
    return total + value.quantity * value.price;
  }, 0);
  // console.log(totalPrice);
  const date = new Date();
  const dateNow = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  try {
    const createOrderExecute = await connect.promise().execute(`insert into Orders values(0, ${req.user.id}, '${dateNow}' ,"pendding", ${totalPrice})`);
    for (let v of data) {
      temp = temp + `(0, ${createOrderExecute[0].insertId}, ${v.bookId}, ${v.quantity}), `;
    }
    temp = temp.slice(0, temp.length - 2);
    const result = await connect.promise().execute(`insert into OrderLine values ${temp}`);
    const deleteCartItem = deleteMultipleCartItems(data, req, res);
    if (deleteCartItem) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteOrder = async (req, res) => {
  try {
    await connect.promise().execute();
  } catch (error) {
    console.log(error);
  }
};
const AllMyOrder = async (req, res) => {
  // console.log(req.query.option);
  try {
    const data = await connect
      .promise()
      .execute(
        `select OL.*, O.createAt, O.status, O.totalPrice,B.title, B.price, B.image, B.author from (OrderLine as OL inner join Orders as O on O.id = OL.idOrder) inner join books as B on OL.idBook = B.id where O.idUser= ${req.user.id} and O.status="${req.query.option}"`
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
const DestroyOrder = async (req, res) => {
  // console.log(req.body);
  try {
    await connect.promise().execute(`update Orders set status = "destroyed" where id = ${req.body.id}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};
const ConfirmOrder = async (req, res) => {
  // console.log(req.body);
  try {
    await connect.promise().execute(`update Orders set status = "success" where id = ${req.body.id}`);
    res.json(true);
  } catch (error) {
    console.log(error);
  }
};

// const updateBook = async (req, res) => {};
export {
  getAllBooks,
  getInformations,
  getBook,
  getAllCartItems,
  addToCart,
  getCountItem,
  deleteCartItem,
  createBookReview,
  getAllReview,
  updateQuantity,
  createOrder,
  deleteOrder,
  AllMyOrder,
  DestroyOrder,
  ConfirmOrder,
};
