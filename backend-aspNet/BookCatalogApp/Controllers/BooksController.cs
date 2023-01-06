using BookCatalogApp.Models;
using BookCatalogApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Book>>> GetBooks()
        {
            try
            {
                var books = await _bookService.GetBooks();
                return Ok(books);
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpGet("{id:int}", Name = "GetBook")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            try
            {
                var books = await _bookService.GetBook(id);
                if (books == null)
                    return NotFound($"{id} not found!");

                return Ok(books);
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpGet("ISBN")]
        public async Task<ActionResult<IAsyncEnumerable<Book>>> GetBooksByISBN([FromQuery] string isbn)
        {
            try
            {
                var books = await _bookService.GetBooksByISBN(isbn);
                if (books == null)
                    return NotFound($"{isbn} not found!");

                return Ok(books);
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpGet("Author")]
        public async Task<ActionResult<IAsyncEnumerable<Book>>> GetBooksByAuthor([FromQuery] string author)
        {
            try
            {
                var books = await _bookService.GetBooksByAuthor(author);
                if (books == null)
                    return NotFound($"{author} not found!");

                return Ok(books);
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Book book)
        {
            List<Book> bookList = (List<Book>)await _bookService.GetBooks();
            bool isbnIsTaken = false;

            // Aufere valores negativos
            if (book.Price < 0)
            {
                return BadRequest("Price cannot be negative.");
            }

            foreach (Book b in bookList)
            {
                if (b.ISBN == book.ISBN)
                {
                    isbnIsTaken = true;
                    break;
                }
            }

            if (isbnIsTaken)
            {
                return BadRequest("Error: A book with this ISBN already exists!");
            }

            try
            {
                // Define IsDeleted como falso automaticamente
                book.IsDeleted = false;

                await _bookService.CreateBook(book);
                return CreatedAtRoute(nameof(GetBook), new { id = book.Id }, book);
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Book book)
        {
           
            // Aufere valores negativos
            if (book.Price < 0)
            {
                return BadRequest("Price cannot be negative.");
            }

            try
            {
                if (book.Id == id)
                {
                    await _bookService.UpdateBook(book);
                    return Ok($"Book ID:{id} sucessfully updated!");
                }
                else
                {
                    return BadRequest("Data Error!");
                }
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var book = await _bookService.GetBook(id);

                if (book != null)
                {
                    book.IsDeleted = true;
                    await _bookService.UpdateBook(book);
                    return Ok($"Book ID:{id} sucessfully deleted!");
                }
                else
                {
                    return BadRequest("not Found!");
                }
            }
            catch
            {
                return BadRequest("Invalid Request");
            }
        }
    }
}
