using BookCatalogApp.Models;

namespace BookCatalogApp.Infrastructure.Models.Books
{
    public class BookDTO
    {
        public long Isbn { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public decimal Price { get; set; }

        public BookDTO(Book book)
        {
            Isbn = book.Isbn;
            Title = book.Title;
            AuthorName = book.Author.Name;
            Price = book.Price;
        }
    }
}
