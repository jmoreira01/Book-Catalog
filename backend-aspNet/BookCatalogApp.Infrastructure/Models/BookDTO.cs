using BookCatalogApp.Models;

namespace BookCatalogApp.Infrastructure.Models
{
    public class BookDTO
    {
        public long Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }

        public BookDTO(Book book)
        {
            Isbn = book.Isbn;
            Title = book.Title;
            Author = book.Author;
            Price = book.Price;
        }
    }
}
