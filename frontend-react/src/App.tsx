import React, { useState, useEffect } from "react";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import bookExample from "./assets/bookExample.jpg";






function App() {
  const baseUrl = "https://localhost:7180/api/Books"; //Endpoint access
  const [data, setData] = useState([]);
  const[updateData, setUpdateData] = useState(true);
  const [selectedBook, setSelectedBook] = useState({
    id: "",
    isbn: "",
    title: "",
    author: "",
    price: ""
  }); 

  const [modalNewBook, setModalNewBook] = useState(false); //useState para os novos alunos inseridos
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

   // Funções dos Modais abertura/fecho
   const onOffModalNew = () => {
    setModalNewBook(!modalNewBook);
  };

  const onOffModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const onOffModalDelete = () => {
    setModalDelete(!modalDelete);
  };

   //método para guardar os valores inseridos no formulário
  // handleChange is Calling whenever you are entering any text to input
  // (...) the spread syntax expands an iterable object, usually an array, though it can be used on any interable, including a string.
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSelectedBook({
      ...selectedBook,
      [name]: value,
    });
  };

  const editBook = (book: any, option: any) => {
    setSelectedBook(book);
    (option === "Edit") ? onOffModalEdit() : onOffModalDelete(); // se True escolhe Edit, se FALSO escolhe Eliminar
  };


  //API Requests
  const requestGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //
  const requestPost = async () => {
    delete selectedBook.id;
    await axios
      .post(baseUrl, selectedBook) //Envia o request POST por axios
      .then((response) => {
        setData(data.concat(response.data));
        setUpdateData(true);
        onOffModalNew();
      })
      .catch((error) => {
        console.log(error);
      });
  };

    //
    const requestPut = async () => {
      await axios
        .put(baseUrl + "/" + selectedBook.id, selectedBook) //Envia o request PUT por axios
        .then((response) => {
          var res = response.data;
          var tempData = data;
          // eslint-disable-next-line
          tempData.map((book): void => {
            //variavel temporária para guardar os dados das alterações para depois mapear e aferir os registos alterados.
            if (book.id === selectedBook.id) {
              book.isbn = res.isbn;
              book.title= res.title;
              book.author= res.author;
              book.price= res.price;
            }
          });
          setUpdateData(true);
          onOffModalEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    };


  const requestDelete = async () => {
    await axios
      .delete(baseUrl + "/" + selectedBook.id) //Envia o request DELETE por axios
      .then((response) => {
        setData(data.filter(book => book.id !== response.data)); //Aplica filtro nos dados para exluir o registo que coincide com o id devolvido pela API. (!==) verifica o valor e tipo, eliminando
        setUpdateData(true);
        onOffModalDelete();
      }).catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    if(updateData) {
      requestGet();
      setUpdateData(false); // coloca-se a função setData no scope do Use effect porque gere os dados recebidos que vão modificar o estado da app
    }                       
  }, [updateData]);
  
  return (
    <div className="App">
      <br />{/*
      <h1> Book Catalog</h1>

      <header>
        <img src={""} alt="" style={{ width: "70px" }} />
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => onOffModalNew()}
        >
          Add Book
        </button>
      </header>

      <div className="overflow-x-auto table shadow-md m:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                ISBN
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Author
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (book: {
                id: number;
                isbn: string;
                title: string;
                author: string;
                price: number;
              }) => (
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-4 w-4">{book.id}</td>
                  <td className="p-4 w-4">{book.isbn}</td>
                  <td className="p-4 w-4">{book.title}</td>
                  <td className="py-4 px-6">{book.author}</td>
                  <td className="py-4 px-6">{book.price} €</td>
                  <td className="py-4 px-6">
                    <button
                      type="button"
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                      onClick={() => editBook(book, "Edit")}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => editBook(book, "Delete")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div> */}

<header>
        <img src={""} alt="" style={{ width: "70px" }} />
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => onOffModalNew()}
        >
          Add Book
        </button>
      </header>
           
<div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <a href={"www.google.pt/"} className="group"> <img
                  src={bookExample}
                  alt=""
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                /></a>
              </div>
              <h2 className="mt-4 text-sm text-gray-700">{book.title}</h2>
              <h3 className="mt-4 text-sm text-gray-700">{book.author}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{book.price}€</p>
            </div>
          ))}
        </div>
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
            onClick={() => onOffModalNew()}
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
            onClick={() => onOffModalEdit()}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal Para Eliminar Alunos: DELETE */}
      <Modal isOpen={modalDelete}>
        <ModalHeader> Delete Student</ModalHeader>

        <ModalBody>
          <span>
            Confirm Book deletion? {selectedBook && selectedBook.title}
          </span>
        </ModalBody>
        <ModalFooter>

        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => requestDelete()}>Delete</button>
        <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => onOffModalDelete()}>Cancel</button>

        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;
