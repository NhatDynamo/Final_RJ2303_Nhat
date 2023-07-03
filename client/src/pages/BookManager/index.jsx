import React from "react";
import axios from "axios";
import Footer from "../../components/footer";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../store/Context";
import Container from "./Container";
import "./style.css";
import Header from "../../components/header";
import Sidebar from "../../components/managerSidebar";

function BookManager() {
  const [logged, setLogged, admin] = useContext(Context);
  const [books, setBooks] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const getBooks = async () => {
      try {
        const result = await axios.get("/getAllBooks");
        setBooks(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!admin) {
      navigate("/");
    }
    getBooks();
  }, []);

  return (
    <>
      {books && (
        <>
          <header>
            <Header />
          </header>
          <div className="container my-5"></div>
          <div className="row">
            <div className="col-xl-2">{logged && <Sidebar option={"manager"} />}</div>
            <div className="col-xl-8">
              <Container books={books} />
              <div className="d-flex ">
                <nav aria-label="..." className="m-auto">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabindex="-1">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item ">
                      <a className="page-link" href="#">
                        2 <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BookManager;
