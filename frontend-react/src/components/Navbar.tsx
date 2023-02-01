import { Link } from "react-router-dom";
import "../styles/navbar.css";


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1>
        Book Catalog
      </h1>
      <div>
        <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/Home">
              Home
            </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/Books">
              Books
            </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/Authors">
              Authors
            </Link>
          </li>
        </ul>
      </div>


      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/Home">Home</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/authors">
              Authors
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}