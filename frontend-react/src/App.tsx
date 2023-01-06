import React, { useState, useEffect } from "react";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";



function App() {
  const baseUrl = "http://localhost:55655/api/Books"; //Endpoint access
  const [data, setData] = useState([]);
  const[updateData, setUpdateData] = useState(true);
  const [selectedBook, setSelectedBook] = useState({
    Id: "",
    ISBN: "",
    Title: "",
    Author: "",
    Price: ""
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //
  const requestPost = async () => {
    delete selectedBook.Id;

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
        .put(baseUrl + "/" + selectedBook.Id, selectedBook) //Envia o request PUT por axios
        .then((response) => {
          var res = response.data;
          var tempData = data;
          tempData.map((book: any): void => {
            //variavel temporária para guardar os dados das alterações para depois mapear e aferir os registos alterados.
            if (book.Id === selectedBook.Id) {
              book.ISBN = res.ISBN;
              book.Title= res.Title;
              book.Author= res.Author;
              book.Price= res.Price;
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
      .delete(baseUrl + "/" + selectedBook.Id) //Envia o request DELETE por axios
      .then((response) => {
        setData(data.filter(book => book.Id !== response.data)); //Aplica filtro nos dados para exluir o registo que coincide com o id devolvido pela API. (!==) verifica o valor e tipo, eliminando
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
      <br />
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
            </tr>
          </thead>
          <tbody>
            {data.map(
              (book: {
                Id: number;
                ISBN: string;
                Title: string;
                Author: string;
                Price: number;
              }) => (
                <tr
                  key={book.Id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="p-4 w-4">{book.Id}</td>
                  <th
                    scope="row"
                    className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap  dark:text-white"
                  >
                    <img className="w-10 h-10" src={""} alt="" />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {book.ISBN}
                      </div>
                      <div className="font-normal text-gray-500">
                        {book.Title}
                      </div>
                      <div className="font-normal text-gray-500">
                        {book.Author}
                      </div>
                    </div>
                  </th>
                  <td className="py-4 px-6">{book.Price}</td>
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
              name="ISBN"
              onChange={handleChange}
            />
            <label> Title: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="Title"
              onChange={handleChange}
            />
            <label> Author: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="Author"
              onChange={handleChange}
            />
            <label> Price: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="Price"
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
              name="Id"
              onChange={handleChange}
              disabled
              value={selectedBook&& selectedBook.Id}
            />
            <label> ISBN </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="ISBN"
              onChange={handleChange}
              value={selectedBook && selectedBook.ISBN}
            />

            <label> Title: </label>
            <br />
            <input
              type="Title"
              className="form-control"
              name="ISBN"
              onChange={handleChange}
              value={selectedBook && selectedBook.Title}
            />

            <label> Author: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="Author"
              onChange={handleChange}
              value={selectedBook && selectedBook.Author}
            />

            <label> Price: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="age"
              onChange={handleChange}
              value={selectedBook && selectedBook.Price}
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
            Confirm Book deletion? {selectedBook && selectedBook.Title}
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
