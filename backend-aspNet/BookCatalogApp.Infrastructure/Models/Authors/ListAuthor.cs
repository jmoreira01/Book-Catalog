using BookCatalogApp.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Models.Authors
{
    public class ListAuthor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string[] AuthorTitle { get; set; }
        public ListAuthor(Entities.Author author)
        {
            Id = author.Id;
            Name = author.Name;
            Country = author.Country;
            AuthorTitle = author.Books.Select(x => x.Title).ToArray();
        }
    }
}
