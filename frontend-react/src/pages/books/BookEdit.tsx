import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Input from "../../components/Input";
import Toast from "../../helpers/Toast";
import { BookDTO } from "../../models/books/BookDTO";
import { BookEditDTO } from "../../models/books/BookEditDTO";
import { BookService } from "../../services/BookService";
import "../../styles/editBook.css";

export default function BookEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<BookDTO>({} as BookDTO);
    const bookService = new BookService();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setBook({
        ...book,
        [name]: value,
        });
    };

    useEffect(() => {
        loadBook(parseInt(id));
    }, [id]);

    const loadBook = async (id: number) => {
        var response = await bookService.GetById(id);

        if (response.success !== true) {
            Toast.Show("error", "Book not loaded!");
            return;
        }

        if (response.obj == null) {
            Toast.Show("error", "Not Found!");
            return;
        }
        setBook(response.obj);
    };

    const updateBook = async () => {
        const updatedBook: BookEditDTO = {
            id: parseInt(id),
            isbn: book.isbn,
            title: book.title,
            price: book.price,
            //image: book.image,
            author: book.author,
        };

        const response = await bookService.Edit(updatedBook);

        if (response.success !== true) {
            Toast.Show("error", response.message);
            return;
        }

        Toast.Show("success", response.message);
        goBack();
    };

    const deleteBook = async (id: number) => {
        const response = await bookService.DeleteBook(id);

        if (response.success !== true) {
            Toast.Show("error", response.message);
            return;
        }

        Toast.Show("success", response.message);
        goBack();
    };

    const goBack = () => {
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
              id={book && book.id}
              onChange={handleChange}
              isbn={book && book.isbn}
              title={book && book.title}
              price={book && book.price}
          />
          <Button
            style={{ marginLeft: "80px", backgroundColor: "yellow" }}
            onClick={updateBook}
          >
            Save
          </Button>{" "}
          <Button style={{ backgroundColor: "blue" }} onClick={goBack}>
            Go Back
          </Button>{" "}
          <Button
            style={{ marginLeft: "80px", backgroundColor: "red" }}
            onClick={() => deleteBook(parseInt(id))}
          >
            Excluir
          </Button>
    </div>    
    </div>
  );
};