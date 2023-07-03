import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BookManager from "../src/pages/BookManager";
import CreateBook from "../src/pages/createBook";
import BookDetail from "./pages/bookdetail";
import MyCart from "./pages/cart";
import MyOrder from "./pages/Orders";
import ManageOrder from "./pages/manadeOrder";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logged" element={<Home />} />
        <Route path="/bookManager" element={<BookManager />} />
        <Route path="/edit/book/:id" element={<CreateBook option={"update"} />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/myCart" element={<MyCart />} />
        <Route path="/myOrder" element={<MyOrder />} />
        <Route path="/manageOrders" element={<ManageOrder />} />
      </Routes>
    </div>
  );
}

export default App;
