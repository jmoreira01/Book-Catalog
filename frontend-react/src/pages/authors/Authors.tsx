import "../../styles/authors/authors.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card,} from "reactstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import CardAuthor from "../../components/CardAuthor";
import { useNavigate } from "react-router-dom";
import { AuthorService } from "../../services/AuthorService";
import Toast from "../../helpers/Toast";

export default function Authors() {
    const [updateData, setUpdateData] = useState(true);
    const [search, setSearch] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [sort, setSort] = useState("");
    const sortOptions = ["Name", "Country"];
    const [forcePage, setForcePage] = useState(0);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6);
    const [authors, setAuthors] = useState([]);
    const authorService = new AuthorService();

    const handlePageClick = async (data: any) => {
        let current = data.selected + 1;
            setCurrentPage(current);
            setForcePage(data.selected);
        };

    const getAuthors = async () => {
        var response = await authorService.GetAll(
            currentPage, 
            pageSize, 
            search, 
            sort
            );
        if (response.success !== true) {
            Toast.Show("error", "Author not loaded!");
            return;
        }

        if (response.items == null) {
            Toast.Show("error", "Not found!");
            return;
        }
        setAuthors(response.items);
        setPageCount(response.totalPages);
        setUpdateData(true);
    };

    useEffect(() => {
        if (updateData) {
            getAuthors();
            setUpdateData(false);
        }
    }, [updateData]);


    return (
        <div className="Author-container">
            <h1> Authors</h1>
      <header></header>
      <button
        type="button"
        className="App__add-book text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => navigate(`/newAuthor`)}
      >
        NEW AUTHOR
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
            {authors.map(
              (author: {
                id: number;
                name: string;
                country: string;
                authorTitle: [];
              }) => (
                <div key={author.id}>
                        <CardAuthor
                        isBook={false}
                        name={author.name}
                        country={author.country}
                        onClick={() => ( navigate(`/editAuthor/${author.id}`))}
                            />
                            <Row>
                                    <Col/>
                                        <Button
                                            style={{ width: "100px", height: "35px", backgroundColor: "blue" }}
                                            onClick={() => ( navigate(`/editAuthor/${author.id}`))}>
                                            Details
                                        </Button>
                                        <br /><br />
                                    <Col/>
                                </Row>
                </div>
             ))}
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