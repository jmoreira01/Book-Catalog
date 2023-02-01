using BookCatalogApp.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookCatalogApp.Infrastructure.Models.Authors
{
    public class AuthorDTO
    {
        public string Name { get; set; }
        public string Country { get; set; }

        public AuthorDTO(Entities.Author author)
        {
            Name = author.Name;
            Country = author.Country;
        }
    }
}
