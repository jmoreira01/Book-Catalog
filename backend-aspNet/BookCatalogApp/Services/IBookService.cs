using BookCatalogApp.Models;

namespace BookCatalogApp.Services
{
    public interface IBookService
    {

        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBook(int id);
        IEnumerable<Book> BooksParameters(BooksParameters booksParameters);
        Task<IEnumerable<Book>> GetBooksByISBN(string isbn);
        Task<IEnumerable<Book>> GetBooksByAuthor(string author);
        Task<IEnumerable<Book>> GetBooksBySearch(string search);
        Task CreateBook(Book book);
        Task UpdateBook(Book book);
        Task DeleteBook(Book book);
    }
}
