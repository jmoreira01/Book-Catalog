using BookCatalogApp.Models;
using Nest;

namespace BookCatalogApp.Infrastructure.Models
{
    public class ListDTO
    {
        public int Id { get; set; }
        public long Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }

        public bool IsDeleted { get; set; }

        public ListDTO(Book book)
        {
            Id = book.Id;
            Isbn = book.Isbn;
            Title = book.Title;
            Author = book.Author;
            Price = book.Price;
            IsDeleted = book.IsDeleted;
        }
    }
}