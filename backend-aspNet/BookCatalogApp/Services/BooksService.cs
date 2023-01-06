using BookCatalogApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogApp.Services
{
    public class BooksService : IBookService
    {
        private readonly MyDbContext _context;

        public BooksService(MyDbContext context)
        {
            _context = context;
        }

        public async Task CreateBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBook(Book book)
        {
            _context.Entry(book).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(Book book)
        {
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            try
            {
                return await _context.Books.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Book>> GetBooksByAuthor(string author)
        {
            IEnumerable<Book> books;
            if (!string.IsNullOrWhiteSpace(author))
            {
                books = await _context.Books
                    .Where(a => a.Author.Contains(author))
                    .ToListAsync();
            }
            else
            {
                books = await GetBooks();
            }
            return books;
        }

        public async Task<IEnumerable<Book>> GetBooksByISBN(string isbn)
        {
            IEnumerable<Book> books;
            if (!string.IsNullOrWhiteSpace(isbn))
            {
                books = await _context.Books
                    .Where(b => b.ISBN.Contains(isbn))
                    .ToListAsync();
            }
            else
            {
                books = await GetBooks();
            }
            return books;
        }

        public async Task<Book> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            return book;
        }
    }
}
