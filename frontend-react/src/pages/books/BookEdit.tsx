import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Input from "../../components/Input";
import Toast from "../../helpers/Toast";
import { BookDTO } from "../../models/books/BookDTO";
import { BookService } from "../../services/BookService";
import "../../styles/editBook.css";

export default function BookEdit () {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDTO>({} as BookDTO);
  const bookService = new BookService();

  useEffect(() => {
    loadBook(parseInt(id));
  }, [id]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const loadBook = async (bookId) => {
    const response = await bookService.GetById(bookId);

    if (!response.success) {
      Toast.Show("error", "Book not loaded!");
      return;
    }

    if (!response.obj) {
      Toast.Show("error", "Not Found!");
      return;
    }

    setBook(response.obj);
  };

  const updateBook = async () => {
    const updatedBook = {
      id: parseInt(id),
      isbn: book.isbn,
      title: book.title,
      price: book.price,
      authorId: book.authorId,
    };

    const response = await bookService.Edit(updatedBook);

    if (!response.success) {
      Toast.Show("error", response.message);
      return;
    }

    Toast.Show("success", response.message);
    navigate(-1);
  };

  const deleteBook = async (bookId) => {
    const response = await bookService.DeleteBook(bookId);

    if (!response.success) {
      Toast.Show("error", response.message);
      return;
    }

    Toast.Show("success", response.message);
    navigate(-1);
  };

  return (
    <div className="new-book-details">
      <h2>Book Details</h2>
      <div className="details-container">
        <div className="field">
          <label>Id:</label>
          <input type="number" value={id} readOnly />
        </div>
        <Input
          isBook={true}
          id={book.id}
          onChange={handleChange}
          isbn={book.isbn}
          title={book.title}
          price={book.price}
        />
        <Button
          style={{ marginLeft: "80px", backgroundColor: "yellow" }}
          onClick={updateBook}
        >
          Save
        </Button>{" "}
        <Button style={{ backgroundColor: "blue" }} onClick={() => navigate(-1)}>
          Go Back
        </Button>{" "}
          <Button
            style={{ marginLeft: "80px", backgroundColor: "red" }}
            onClick={() => deleteBook(parseInt(id))}
          >
            Delete
          </Button>
    </div>    
    </div>
  );
};

