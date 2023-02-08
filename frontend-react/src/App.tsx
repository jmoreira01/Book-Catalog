import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import BookCreate from "./pages/books/BookCreate";
import BookEdit from "./pages/books/BookEdit";
import BookIndex from "./pages/books/BookIndex";
import AuthorEdit from "./pages/authors/AuthorEdit";
import AuthorCreate from "./pages/authors/AuthorCreate";
import Authors from "./pages/authors/Authors";

  export default function App() {
    return (
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/books' element={<Books/>} />
          <Route path='/bookIndex' element={<BookIndex/>} />
          <Route path='/newBook' element={<BookCreate/>} />
          <Route path='/editBook/:id' element={<BookEdit/>} />
          <Route path='/authors' element={<Authors/>} />
          <Route path='/editAuthor/:id' element={<AuthorEdit/>} />
          <Route path='/newAuthor' element={<AuthorCreate/>} />
        </Routes>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
      </div>
    );
  }