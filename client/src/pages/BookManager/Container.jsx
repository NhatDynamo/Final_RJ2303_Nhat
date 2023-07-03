import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../store/Context";
import axiosConfig from "../../store/axiosConfig";

function Conttainer({ books }) {
  //
  const [logged, setLogged] = useContext(Context);
  const [deleteBookID, setDeleteBookID] = useState(undefined);
  const navigate = useNavigate();
  const handleDelete = () => {
    const deleteAction = async () => {
      try {
        await axiosConfig.request({
          method: "DELETE",
          url: "/deleteBook",
          data: {
            id: deleteBookID,
          },
        });

        navigate("/bookManager");
      } catch (error) {
        console.log("error");
      }
    };
    deleteAction();
    navigate("/bookmanager");
  };

  return (
    <>
      {books && (
        <div>
          <div className="d-flex">
            <div className="container">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Mã Sách</th>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Ngày xuất bản</th>
                    <th>Số trang</th>
                    {logged && <th>Hành động</th>}
                  </tr>
                </thead>
                <tbody className="table-dark">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <th>{book.id}</th>
                      <th>{book.title}</th>
                      <th>{book.author}</th>
                      <th>{book.category}</th>
                      <th>{book.date}</th>
                      <th>{book.numberPage}</th>
                      {logged && (
                        <th>
                          <div className="d-flex">
                            <a href={`edit/book/${book.id}`} className="btn btn-outline-success mx-2">
                              Edit
                            </a>
                            <button
                              className="btn btn-outline-danger mx-2"
                              type="button"
                              data-toggle="modal"
                              data-target="#modal-delete"
                              onClick={(e) => {
                                setDeleteBookID(book.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </th>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal fade" id="modal-delete" role="dialog" aria-labelledby="modal-deleteCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Xóa Sách
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Bạn có muốn xóa không?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Thoát
                  </button>
                  <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={handleDelete}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Conttainer;
