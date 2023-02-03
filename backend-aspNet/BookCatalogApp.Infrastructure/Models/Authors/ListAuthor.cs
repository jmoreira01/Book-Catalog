using BookCatalogApp.Infrastructure.Entities;

namespace BookCatalogApp.Infrastructure.Models.Authors
{
    public class ListAuthor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string[] AuthorTitle { get; set; }
        public ListAuthor(Author author)
        {
            Id = author.Id;
            Name = author.Name;
            Country = author.Country;
            AuthorTitle = author.Books.Select(x => x.Title).ToArray();
        }
    }
}
