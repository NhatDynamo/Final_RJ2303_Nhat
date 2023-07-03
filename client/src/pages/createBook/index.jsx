import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import axiosConfig from "../../store/axiosConfig";
import Context from "../../store/Context";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Sidebar from "../../components/managerSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./container";
function CreateBook({ option }) {
  const [logged, setLogged] = useContext(Context);
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState("http://localhost:3001/images/default-book.png");
  const [book, setBook] = useState({ id: 0, title: "", author: "", numberPage: 0, description: "", date: "", category: "", image: "", price: 0 });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate("/bookmanager");
    }
  });
  useEffect(() => {
    if (option) {
      const getBook = async () => {
        try {
          const result = await axios.get(`/editBook/${id}`);
          const data = result.data;
          setBook(data);
          setImage(data.image);
        } catch (error) {
          console.log(error);
        }
      };
      getBook();
    }
  }, []);
  // console.log(book);
  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        formData.append("filename", file.name);
      }
      try {
        if (file) {
          const result = await axiosConfig.request({
            method: "POST",
            url: "/uploadFile",
            data: formData,
          });
          setImage(`http://localhost:3001/images/${result.data}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    uploadFile();
  }, [file]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const deleteImage = async () => {
    try {
      axiosConfig.request({
        method: "DELETE",
        url: "/deleteImage",
        data: {
          image: image.slice(29, image.length),
        },
      });
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const createBookAction = async () => {
      try {
        const result = await axiosConfig.request({
          method: option ? "PUT" : "POST",
          url: option ? "/editBook" : "/createBook",
          data: {
            book: { ...book, image: image },
          },
        });
        if (result.data) {
          navigate("/bookManager");
        } else {
          if (!option) {
            toast.error("Sách đã tồn tại", {
              position: "bottom-right",
              theme: "dark",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    createBookAction();
  };
  return (
    <>
      <Header />
      <div className="row">
        <div className="col-xl-2 mt-4">
          <Sidebar option={"createBook"} />
        </div>
        <div className="col-xl-8 d-flex mt-5">
          {/* container form */}
          <Container handleSubmit={handleSubmit} handleChange={handleChange} book={book} />
          <div style={{ marginLeft: "50px" }}>
            <button className="form-outline mb-4 btn btn-outline-primary">
              <input
                type="file"
                className="form-control form-control-lg"
                id="upload-image-user"
                name="image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                hidden
              />

              <label htmlFor="upload-image-user" id="upload-image-label" className="btn-image-user m-0">
                Chọn File
              </label>
            </button>
            <button
              className="btn btn-outline-danger mb-4 ml-3"
              onClick={(e) => {
                deleteImage();
              }}
            >
              Xóa ảnh
            </button>
            <div>
              <img src={image} style={{ width: "300px", height: "400px" }} />
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateBook;
