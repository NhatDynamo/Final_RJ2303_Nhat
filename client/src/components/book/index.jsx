import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.css";

function Book({ book }) {
  return (
    <Link to={`book/${book.id}`} className="card m-3" style={{ width: "230px" }}>
      <div style={{ height: "250px" }}>
        <img src={book.image} alt="" className="h-100" />
      </div>
      <p className="product-name">{book.title}</p>
      <h6 className="text-dark d-flex ml-3">Tác giả: {book.author}</h6>
      <h5 className="text-danger d-flex ml-3">{book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</h5>
      <div className="d-flex ml-3">
        <div className="d-flex mr-2 mb-2 btn btn-outline-primary" style={{ fontSize: "12px", width: "75px" }}>
          FreeShip+
        </div>
        <p>
          5<AiFillStar style={{ color: "orange" }} />
        </p>
        <p className="ml-3 text-dark">Đã bán: 3</p>
      </div>
    </Link>
  );
}

export default Book;