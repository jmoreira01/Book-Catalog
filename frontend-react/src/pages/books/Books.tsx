import React, { useState, useEffect } from "react";
import "../.././styles/books/books.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import bookExample from "../../assets/bookExample.jpg";
import ReactPaginate from "react-paginate";
import { BookService } from "./../../services/BookService";
import Toast from "./../../helpers/Toast";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const sortOptions = ["Isbn", "Title", "Author", "Price"];
  const [sort, setSort] = useState(""); // a string that holds the sort order.
  const [pageCount, setPageCount] = useState(1);
  const [updateData, setUpdateData] = useState(true); // whether the data should be updated or not.
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [forcePage, setForcePage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(3);
  const [books, setBooks] = useState([]);
  const bookService = new BookService();

  // !Handles pagination
  const handlePageClick = async (data: any) => {
    const currentPage = data.selected + 1;
    setCurrentPage(currentPage);
    setForcePage(data.selected);
  };

  const getBooks = async () => {
    var response = await bookService.GetAll(
      currentPage,
      pageSize,
      search,
      sort
    );
    if (response.success !== true) {
      Toast.Show("error", "Book not loaded!");
      return;
    }
    if (response.items == null) {
      Toast.Show("error", "Not found!");
      return;
    }
    setBooks(response.items);
    setPageCount(response.totalPages);
    setUpdateData(true);
  };

  //useEffect - inifinite requests avoided
  useEffect(() => {
    if (updateData) {
      getBooks();
      setUpdateData(false); // setData on scope of Use effect to manage data that will modify the app
    }
  }, [updateData]);

  return (
    <div className="App">
      <h1> Books</h1>
      <header></header>
      <button
        type="button"
        className="App__add-book text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => navigate(`/newBook`)}
      >
        <strong>NEW BOOK </strong> 
      </button>
      <div>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <span className="text-gray-500 sm:text-sm"></span>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => (
              setSearch(e.target.value), setCurrentPage(0), setForcePage(0)
            )}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
        </div>
      </div>
    
      <div className="App__sort">
        <label htmlFor="sort">Sort: </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => (
            setSort(e.target.value), setCurrentPage(0), setForcePage(0)
          )}
        >
          {sortOptions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-white ">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className=" App__book-list grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {books.map(
              (book: {
                id: number;
                isbn: string;
                title: string;
                authorName: string;
                price: number;
              }) => (
                // eslint-disable-next-line no-template-curly-in-string
                <div key={book.id}>
                  <div className=" App__book-card aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <a
                      href={`https://www.wook.pt/pesquisa/${book.title}`}
                      target="_blank"
                      className="group"
                      rel="noreferrer"
                    >
                      {" "}
                      <img
                        loading="lazy"
                        src={bookExample}
                        alt=""
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </a>
                  </div>
                  <p
                    className="mt-2 text-sm "
                    style={{ color: "grey", fontSize: "15px" }}
                  >
                    ISBN: {book.isbn}
                  </p>

                  <Button
                    type="button"
                    className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                    style={{
                      width: "100px",
                      height: "35px",
                      backgroundColor: "blue",
                    }}
                    onClick={() => navigate(`/editBook/${book.id}`)}
                  >
                    Details
                  </Button>

                  <h1
                    className="mt-3 text-sm"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    {book.title}
                  </h1>
                  <h3 className="mt-2 text-sm ">{book.authorName}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {book.price}€
                  </p>
                </div>
              )
            )}
            <div></div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={"<-previous"}
          nextLabel={"next ->"}
          breakLabel={"..."}
          forcePage={forcePage}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
