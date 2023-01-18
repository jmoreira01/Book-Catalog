using BookCatalogApp.Models;

namespace BookCatalogApp.Infrastructure.Models
{
    internal class ListDTO
    {
        public long ISBN { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public bool IsDeleted { get; set; }

        public ListDTO(Book book)
        {
            ISBN = book.Isbn;
            Title = book.Title;
            Price = book.Price;
            IsDeleted = book.IsDeleted;
        }
    }
}