import "../../styles/home.css";

export default function Home(){
    return(
        <body>
  <header>
    <h1>Book Catalog</h1>
  </header>
  <main>
    <section>
      <h2>Featured Books</h2>
      <ul>
        <li>
          <img src="book1.jpg" alt="Book 1"/>
          <h3>Book 1 Title</h3>
          <p>Book 1 Description</p>
          <button>Add to Cart</button>
        </li>
        <li>
          <img src="book2.jpg" alt="Book 2"/>
          <h3>Book 2 Title</h3>
          <p>Book 2 Description</p>
          <button>Add to Cart</button>
        </li>
        <li>
          <img src="book3.jpg" alt="Book 3"/>
          <h3>Book 3 Title</h3>
          <p>Book 3 Description</p>
          <button>Add to Cart</button>
        </li>
      </ul>
    </section>
    <section>
      <h2>More Books</h2>
      <ul>
        <li>
          <img src="book4.jpg" alt="Book 4"/>
          <h3>Book 4 Title</h3>
          <p>Book 4 Description</p>
          <button>Add to Cart</button>
        </li>
        <li>
          <img src="book5.jpg" alt="Book 5"/>
          <h3>Book 5 Title</h3>
          <p>Book 5 Description</p>
          <button>Add to Cart</button>
        </li>
        <li>
          <img src="book6.jpg" alt="Book 6"/>
          <h3>Book 6 Title</h3>
          <p>Book 6 Description</p>
          <button>Add to Cart</button>
        </li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Copyright © 2023 Book Catalog</p>
  </footer>
</body>
    );
}