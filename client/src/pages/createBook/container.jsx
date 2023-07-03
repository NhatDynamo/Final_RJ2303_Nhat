import React from "react";

function Container({ handleSubmit, handleChange, book }) {
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div>
            <div className="d-flex">
              <div className="form-outline mb-4 mr-3">
                <div className="float-left">Tiêu đề</div>
                <input type="text" className="form-control form-control-lg" name="title" placeholder="Tiêu đề" required defaultValue={book.title} onChange={(e) => handleChange(e)} />
              </div>
              <div className="form-outline mb-4 ml-3">
                <div className="float-left">Tác giả </div>
                <input type="text" className="form-control form-control-lg" name="author" onChange={(e) => handleChange(e)} defaultValue={book.author} placeholder="Tác giả" required />
              </div>{" "}
            </div>
            <div className="form-outline mb-4">
              <div className="float-left"> Mô tả sách </div>
              <textarea type="date" className="form-control form-control-lg" name="description" onChange={(e) => handleChange(e)} placeholder="Mô tả sách" rows="4" defaultValue={book.description} cols="50" required></textarea>
            </div>
            <div className="d-flex">
              <div className="form-outline mb-4">
                <div className="float-left"> Ngày xuất bản </div>
                <input type="date" className="form-control form-control-lg mr-3" name="date" onChange={(e) => handleChange(e)} defaultValue={book.date} placeholder="Ngày phát hành" required />
              </div>
              <div className="form-outline mb-4">
                <div className="float-left ml-3"> Số trang </div>
                <input
                  type="number"
                  className="form-control form-control-lg ml-3"
                  name="numberPage"
                  onChange={(e) => handleChange(e)}
                  // defaultValue={book.numberPage}
                  value={book.numberPage}
                  placeholder="Số trang"
                  required
                />
              </div>{" "}
            </div>
            <div className="d-flex">
              <div className="form-group w-50">
                <div className="float-left"> Thể loại </div>
                <select
                  className="form-control form-select"
                  id="exampleFormControlSelect1"
                  name="category"
                  defaultValue={book.category}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value={"Truyện thiếu nhi"} selected={book.category === "Truyện thiếu nhi"}>
                    Truyện thiếu nhi
                  </option>
                  <option value={"Truyện phiêu lưu"} selected={book.category === "Truyện phiêu lưu"}>
                    Truyện phiêu lưu
                  </option>
                  <option value={"Truyện bí ẩn"} selected={book.category === "Truyện bí ẩn"}>
                    Truyện bí ẩn
                  </option>
                  <option value={"Truyện tâm lý"} selected={book.category === "Truyện tâm lý"}>
                    Truyện tâm lý
                  </option>
                  <option value={"Truyện tình cảm"} selected={book.category === "Truyện tình cảm"}>
                    Truyện tình cảm
                  </option>
                  <option value={"Truyện cười"} selected={book.category === "Truyện cười"}>
                    Truyện cười
                  </option>
                  <option value={"Khác"} selected={book.category === "Khác"}>
                    Khác
                  </option>
                </select>
              </div>
              <div className="form-outline mb-4">
                <div className="float-left ml-3"> Giá </div>
                <input
                  type="number"
                  className="form-control form-control-lg ml-3"
                  name="price"
                  onChange={(e) => handleChange(e)}
                  // defaultValue={book.price}
                  value={book.price}
                  placeholder="Giá"
                  required
                />
              </div>{" "}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-outline-success mb-5">
          Lưu lại
        </button>
      </form>
    </div>
  );
}

export default Container;
