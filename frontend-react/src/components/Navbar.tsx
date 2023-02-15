import { Link } from "react-router-dom";
import "../styles/components/navbar.css";


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
    </nav>
  );
}