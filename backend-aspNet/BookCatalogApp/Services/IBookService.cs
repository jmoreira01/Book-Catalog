using BookCatalogApp.Models;

namespace BookCatalogApp.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBook(int id);
        Task<IEnumerable<Book>> GetBooksByISBN(string isbn);
        Task<IEnumerable<Book>> GetBooksByAuthor(string author);
        Task CreateBook(Book book);
        Task UpdateBook(Book book);
        Task DeleteBook(Book book);
    }
}
