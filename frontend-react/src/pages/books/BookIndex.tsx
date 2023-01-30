import "../../styles/indexBook.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../helpers/Toast";
import { useNavigate } from "react-router-dom";
import CardBook from "../../components/CardBook";

export default function BookIndex() {
  const baseUrl = "https://localhost:7180/api/Books/";
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [sort, setSort] = useState("");
  const sortOptions = ["ISBN,", "Title", "Author", "Price"];
  const [forcePage, setForcePage] = useState(0);
  const navigate = useNavigate();

  const [bookSelected, setbookSelected] = useState({
    id: "",
    isbn: 0,
    title: "",
    author: "",
    price: 0,
  });
  

  const [getBooks, setGetBooks] = useState({
    currentPage: 1,
    pageSize: 4,
    searching: "",
    sorting: "",
  });


  const searchReset = async () => {
    setSearch("");
    setGetBooks({
      ...getBooks,
    });
  };

  const searchBooks = async (e: any) => {
    e.preventDefault();
    setGetBooks({
      ...getBooks,
      searching: search,
      currentPage: 1,
    });
    setForcePage(0);
    setUpdateData(true);
  };

  const sortBooks = async (e: any) => {
    let value = e.target.value;
    setSort(value);
    setGetBooks({
      ...getBooks,
      sorting: value,
    });
    setUpdateData(true);
  };
  
  //end

  //All paginated data
  const requestGet = async () => {
    const res = await (await axios.post(`${baseUrl}/getAll`, getBooks)).data;
    const total: number = res.totalRecords;
    setPageCount(res.totalPages);
    console.log("total " + total);

    await axios
      .post(`${baseUrl}/getAll`, getBooks)
      .then((response) => {
        setData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //end

  //data updated
  useEffect(() => {
    if (updateData) {
      requestGet();
      setUpdateData(false);
    }
  }, [updateData]);

  const handlePageClick = async (data: any) => {
    let current = data.selected + 1;
    setGetBooks({
      ...getBooks,
      currentPage: current,
    });
    setForcePage(data.selected);
    setUpdateData(true);
  };

  return (
<div className="Book-container">
<div className="header">
  <button className="create-book-btn" onClick={() => navigate("/createBook")}>Incluir novo Livro</button>
  <div className="sort-section">
    <span className="sort-label">Ordenar por:</span>
    <select className="sort-select" value={sort} onChange={sortBooks}>
      <option value="Id">Id</option>
      {sortOptions.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  </div>
  <div className="search-section">
    <form onSubmit={searchBooks}>
      <input 
        className="search-input" 
        type="text" 
        placeholder="Buscar" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" type="submit">Ok</button>
      <button className="reset-search-btn" onClick={() => searchReset()}>Resetar</button>
    </form>
  </div>
</div>

{data.length === 0 && search.length > 2 ? (
  <div className="no-results">
    <h4>No found!</h4>
  </div>
) : (
  <div className="book-cards-container">
    {data.map(
      (book) => (
        <div>
        <CardBook />
          <button 
            className="details-btn"
            onClick={() => navigate(`/BookEdit/${book.id}`)}
          >
            Detalhes
          </button>
        </div>
      )
    )}
  </div>
)}

<div className="pagination-container">
  <ReactPaginate
    previousLabel={"previous"}
    nextLabel={"next"}
    breakLabel={"..."}
    forcePage={forcePage}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName={"pagination"}
    pageClassName={"page"}
    pageLinkClassName={"page-link"}
    previousClassName={"previous"}
    previousLinkClassName={"previous-link"}
    nextClassName={"next"}
    nextLinkClassName={"page-link"}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    activeClassName={"active"}
  />
</div>
</div>
  );
}