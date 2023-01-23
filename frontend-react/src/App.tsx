import React, { useState, useEffect } from "react";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import bookExample from "./assets/bookExample.jpg";
import ReactPaginate from "react-paginate";

function App() {

  const baseUrl = "https://localhost:7180/api/Books";
  const [data, setData] = useState([]); // an array that holds the data retrieved from the back-end API.
  const [updateData, setUpdateData] = useState(true); // whether the data should be updated or not.
  const [selectedBook, setSelectedBook] = useState({ // an object that holds the selected book.
    id: "",
    isbn: "",
    title: "",
    author: "",
    price: ""
  }); 
  const [sort, setSort] = useState(''); // a string that holds the sort order.
  const [search, setSearch] = useState(''); // a string that holds the search term.
  const [modalNewBook, setModalNewBook] = useState(false); // a boolean that determines if the "New Book" modal is open or closed.
  const [modalEdit, setModalEdit] = useState(false); // a boolean that determines if the "Edit Book" modal is open or closed.
  const [modalDelete, setModalDelete] = useState(false); // a boolean that determines if the "Delete Book" modal is open or closed.
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 4;



  // !Handle modals
  // a function that opens or closes a modal based on the passed parameter.
  const handleModal = (modal: string) => {
    switch (modal) {
      case "new":
        setModalNewBook(!modalNewBook);
        break;
      case "edit":
        setModalEdit(!modalEdit);
        break;
      case "delete":
        setModalDelete(!modalDelete);
        break;
      default:
        break;
    }
  };


  // !Handles input changes
  // a function that updates the selectedBook state variable when the input 
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSelectedBook({
      ...selectedBook,
      [name]: value,
    });
  };

  // !Handles sort changes
  // a function that updates the sort state variable when the sort option changes
  const handleSortChange = (e: any) => {
    setSort(e);
  };

  // !Handles pagination
  const handlePageClick = async (data: any) => {
    const currentPage = data.selected + 1;
    const dbBooks = await fetchBookPagination(currentPage);
    setData(dbBooks);
  };

   // !Handles search form submission
   // a function that handles the search form submission and calls the 'handleSearchSubmit' function.
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchSubmit(search, 1);
  };

  // !Fetches search data from API
  // a function that makes an HTTP GET request to the back-end API to retrieve books based on the search query, 
  // and updates the data state variable with the returned data.
  const handleSearchSubmit = async (search: string, pageNumber: number) => {
    try {
      const response = await axios.get(`https://localhost:7180/api/Books/Search?search=${search}&PageNumber=${pageNumber}&PageSize=${pageSize}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

    // Fetches pagination data from API
    const fetchBookPagination = async (currentPage: number, search: string = '') => {
      const res = await fetch(baseUrl + '/Pagination?PageNumber=' + currentPage + '&PageSize=' + pageSize + (search ? '&search=' + search : ''));
      const temp = res.json();
      return temp;
    };

// Edits or deletes a book
const editBook = (book: any, option: any) => {
  setSelectedBook(book);
  (option === "Edit") ? handleModal("edit") : handleModal("delete"); // True = Edit / FALSE = Delete
};

 // Fetches sorted data from API
 const fetchBooks = () => {
  axios.get(`https://localhost:7180/api/Books/Sorting?sort=${sort}`)
    .then(response => setData(response.data))
    .catch(error => console.error(error));
};

// Requests data from API
const requestGet = async () => {
  const response = await (await axios.get(baseUrl)).data;
  const total: number = response.length;
  setPageCount(Math.ceil((total / pageSize)));
  await axios
      .get(`https://localhost:7180/api/Books/getAll`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

// Posts data to API
const requestPost = async () => {
    delete selectedBook.id;
    await axios
      .post(baseUrl, selectedBook) //Envia o request POST por axios
      .then((response) => {
        setData(data.concat(response.data));
        setUpdateData(true);
        handleModal("new");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  // Puts data to API
  const requestPut = async () => {
      await axios
        .put(baseUrl + "/" + selectedBook.id, selectedBook)
        .then((response) => {
          var res = response.data;
          var tempData = data;
          // eslint-disable-next-line
          tempData.map((book): void => {
            //Temp var para guardar os dados das alterações para depois mapear e aferir os registos alterados.
            if (book.id === selectedBook.id) {
              book.isbn = res.isbn;
              book.title= res.title;
              book.author= res.author;
              book.price= res.price;
            }
          });
          setUpdateData(true);
          handleModal("edit");;
        })
        .catch((error) => {
          console.log(error);
        });
    };

// Deletes data from API
  const requestDelete = async () => {
    await axios
      .delete(baseUrl + "/" + selectedBook.id)
      .then((response) => {
        setData(data.filter(book => book.id !== response.data)); //Aplica filtro nos dados para exluir o registo que coincide com o id devolvido pela API. (!==) verifica o valor e tipo, eliminando
        setUpdateData(true);
        handleModal("delete");
      }).catch((error) => {
        console.log(error);
      });
  };

  //useEffect - inifinite requests avoided
  useEffect(() => {
    if(updateData) {
      requestGet();
      setUpdateData(false); // setData on scope of Use effect to manage data that will modify the app
    }                       
  }, [updateData]);
  
  return (
    <div className="App">
      <h1> Book Catalog</h1>
      <header>
      </header>
      <button
        type="button"
        className="App__add-book text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => handleModal("new")}
      >
        Add Book +
      </button>

      <div className="App__sort">
  <label htmlFor="sort"></label>
  <select id="sort" onChange={(e) => handleSortChange(e.target.value)}>
    <option value="title">Title</option>
    <option value="author">Author</option>
    <option value="isbn">ISBN</option>
  </select>
  <button onClick={() => fetchBooks()} className="btn-sort">Sort</button>
</div>

<form 
        className="flex items-center App__search" 
        onSubmit={handleSubmit}
      >
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input 
            type="text" 
            id="search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search" 
            required
          />
        </div>
        <button 
          type="submit" 
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span className="sr-only">Search</span>
        </button>
      </form>

<div className="bg-white ">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className=" App__book-list grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {data.map(
              (book: {
                id: number;
                isbn: string;
                title: string;
                author: string;
                price: number;
              }) => (
            // eslint-disable-next-line no-template-curly-in-string
            <div key={book.id}>
              
              <div className=" App__book-card aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <a href={`https://www.wook.pt/pesquisa/${book.title}`} target="_blank" className="group" rel="noreferrer"> <img
                loading="lazy"  
                src={bookExample}
                  alt=""
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
                </a>
              </div>
              <p className="mt-2 text-sm " style={{color: "grey", fontSize:"15px"}}>ISBN: {book.isbn}</p>

              <button
                      type="button"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                      onClick={() => editBook(book, "Edit")}
                    >
                      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>Edit
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => editBook(book, "Delete")}
                    >
                      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="-10 0 42 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                      Delete
                    </button>
                    
              <h1 className="mt-3 text-sm" style={{color: "black", fontSize:"20px"}}>{book.title}</h1>
              <h3 className="mt-2 text-sm ">{book.author}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{book.price}€</p>
            </div>
          ))}
          <div>
  </div>
        </div>
      </div>
      <ReactPaginate 
        previousLabel={'<-previous'}
        nextLabel={'next ->'}
        breakLabel={'...'} 
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
              />
    </div>
    <div>
    <div>
  </div>
    </div>


      {/* Modal Para Inserir Alunos: POST */}
      <Modal isOpen={modalNewBook}>
        <ModalHeader> Add Book</ModalHeader>
        <ModalBody>
            <div className="form-group">
            <label> ISBN </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="isbn"
              onChange={handleChange}
            />
            <label> Title: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
            />
            <label> Author: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="author"
              onChange={handleChange}
            />
            <label> Price: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="price"
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => requestPost()}
          >
            {" "}
            Add
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleModal("new")}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal Para Editar Alunos: PUT */}
      <Modal isOpen={modalEdit}>
        <ModalHeader> Edit Book</ModalHeader>
        <ModalBody>
        <div className="form-group">
            <label> Id: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="id"
              onChange={handleChange}
              disabled
              value={selectedBook && selectedBook.id}
            />
            <label> ISBN </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="isbn"
              onChange={handleChange}
              value={selectedBook && selectedBook.isbn}
            />

            <label> Title: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
              value={selectedBook && selectedBook.title}
            />

            <label> Author: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="author"
              onChange={handleChange}
              value={selectedBook && selectedBook.author}
            />

            <label> Price: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="price"
              onChange={handleChange}
              value={selectedBook && selectedBook.price}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => requestPut()}
          >
            {" "}
            Edit{" "}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleModal("edit")}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal Para Eliminar Alunos: DELETE */}
      <Modal isOpen={modalDelete}>
        <ModalHeader> Delete Book</ModalHeader>

        <ModalBody>
          <span>
            Confirm Book deletion - <strong>"{selectedBook && selectedBook.title}"</strong>  ? 
          </span>
        </ModalBody>
        <ModalFooter>

        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => requestDelete()}>Delete</button>
        <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => handleModal("delete")}>Cancel</button>

        </ModalFooter>
      </Modal>

    </div>
  );
}
export default App;
