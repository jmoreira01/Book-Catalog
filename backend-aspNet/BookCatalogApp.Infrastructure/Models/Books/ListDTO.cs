using BookCatalogApp.Infrastructure.Entities;
using BookCatalogApp.Models;

namespace BookCatalogApp.Infrastructure.Models.Books
{
    public class ListDTO
    {
        public int Id { get; set; }
        public long Isbn { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public decimal Price { get; set; }

        public bool IsDeleted { get; set; }

        public ListDTO(Book book)
        {
            Id = book.Id;
            Isbn = book.Isbn;
            Title = book.Title;
            AuthorId = book.Author.Id;
            AuthorName = book.Author.Name;
            Price = book.Price;
            IsDeleted = book.IsDeleted;
        }
    }
}