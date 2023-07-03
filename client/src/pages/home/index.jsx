import { useEffect } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Slider from "../../components/slider";
import axios from "axios";
import Book from "../../components/book";
import { useState } from "react";
const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const data = await axios.get(`/getAllBooks`);
        // console.log(data.data);
        setBooks(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBooks();
  }, []);
  return (
    <>
      <div>
        {" "}
        <Header />
        <Slider />
        <div className="container d-flex flex-wrap ">
          {books.map((book) => (
            <div key={book.id} className="m-auto">
              <Book book={book} />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
